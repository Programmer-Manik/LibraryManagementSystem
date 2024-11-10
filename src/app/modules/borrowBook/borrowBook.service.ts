import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const borrowBook = async (bookId: string, memberId: string) => {
  return await prisma.$transaction(async (prisma) => {
    const book = await prisma.book.findUnique({
      where: { bookId },
    });

    if (!book) {
      throw new Error("Book not found");
    }

    if (book.availableCopies <= 0) {
      throw new Error("No available copies for borrowing");
    }

    await prisma.book.update({
      where: { bookId },
      data: { availableCopies: { decrement: 1 } },
    });

    const borrowRecord = await prisma.borrowRecord.create({
      data: {
        bookId,
        memberId,
        borrowDate: new Date(),
      },
      select: {
        borrowId: true,
        bookId: true,
        memberId: true,
        borrowDate: true,
      },
    });

    return borrowRecord;
  });
};

const returnBook = async (borrowId: string) => {
  return await prisma.$transaction(async (prisma) => {
    const borrowRecord = await prisma.borrowRecord.findUnique({
      where: { borrowId },
      include: { book: true },
    });

    if (!borrowRecord) {
      throw new Error("Borrow record not found");
    }

    if (borrowRecord.returnDate) {
      throw new Error("Book has already been returned");
    }

    await prisma.borrowRecord.update({
      where: { borrowId },
      data: { returnDate: new Date() },
    });

    const result = await prisma.book.update({
      where: { bookId: borrowRecord.bookId },
      data: { availableCopies: { increment: 1 } },
    });

    return result;
  });
};

const getOverdueBooks = async () => {
  const overdueLimitDays = 14;

  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - overdueLimitDays);

  const overdueBooks = await prisma.borrowRecord.findMany({
    where: {
      returnDate: null,
      borrowDate: {
        lt: cutoffDate,
      },
    },

    select: {
      borrowId: true,
      borrowDate: true,
      book: {
        select: {
          title: true,
        },
      },

      member: {
        select: {
          name: true,
        },
      },
    },
  });

  const overdueList = overdueBooks.map((record) => {
    const overdueDays =
      Math.floor(
        (new Date().getTime() - new Date(record.borrowDate).getTime()) /
          (1000 * 60 * 60 * 24)
      ) - overdueLimitDays;

    return {
      borrowId: record.borrowId,
      bookTitle: record.book.title,
      borrowerName: record.member.name,
      overdueDays,
    };
  });

  return overdueList.length > 0
    ? {
        success: true,
        status: 200,
        message: "Overdue borrow list fetched",
        data: overdueList,
      }
    : {
        success: true,
        status: 200,
        message: "No overdue books",
        data: [],
      };
};

export const BorrowBookService = {
  borrowBook,
  returnBook,
  getOverdueBooks,
};
