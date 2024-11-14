import { BorrowRecord, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createBorrow = async (data: BorrowRecord) => {
  const avelableBook = await prisma.book.findUniqueOrThrow({
    where: {
      bookId: data.bookId,
    },
  });

  if (avelableBook.availableCopies <= 0) {
    throw new Error("This book isn't available");
  }

  await prisma.member.findUniqueOrThrow({
    where: {
      memberId: data.memberId,
    },
  });

  const result = await prisma.$transaction(async (transactionClient) => {
    const createBorrowRecord = await transactionClient.borrowRecord.create({
      data,
    });

    await transactionClient.book.update({
      where: {
        bookId: data.bookId,
      },
      data: {
        availableCopies: avelableBook.availableCopies - 1,
      },
    });

    return createBorrowRecord;
  });

  return result;
};

const returnBook = async (borrowId: string) => {
  const borroRecord = await prisma.borrowRecord.findUniqueOrThrow({
    where: {
      borrowId,
      returnDate: null
    },
  });

  const findBorrowBook = await prisma.book.findUnique({
    where: {
      bookId: borroRecord.bookId,
    },
  });

  const result = await prisma.$transaction(async (transactionClient) => {
    const result = await prisma.borrowRecord.update({
      where: {
        borrowId,
      },
      data: {
        returnDate: new Date(),
      },
    });

    await prisma.book.update({
      where: {
        bookId: borroRecord.bookId,
      },
      data: {
        availableCopies: findBorrowBook!.availableCopies + 1,
      },
    });
    return result
  });

  return result;
};

const overDueBook = async () => {
  const result = await prisma.borrowRecord.findMany({
    where: {
      returnDate: null,
    },
    include: {
      book: true,
      member: true,
    },
  });
  const today = new Date();
  const finalResult = result
    .map((record) => {
      const { borrowId, borrowDate, book, member } = record;

      const borrowDateTime = new Date(borrowDate);
      const timeDiference = today.getTime() - borrowDateTime.getTime();
      const dayDiference = Math.floor(timeDiference / (1000 * 60 * 60 * 24));
      const overdueDays = dayDiference - 14;

      if (overdueDays > 0) {
        return {
          borrowId,
          bookTitle: book.title,
          borrowerName: member.name,
          overdueDays,
        };
      } else {
        return null;
      }
    })
    .filter((data) => data != null);

  return finalResult;
};

export const BorrowReturnService = {
  createBorrow,
  returnBook,
  overDueBook,
};
