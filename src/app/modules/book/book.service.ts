import { Book, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getAllBook = async () => {
  const result = await prisma.book.findMany();
  return result;
};

const creteBook = async (data: Book) => {
  const result = await prisma.book.create({ data });
  return result;
};

const getSingleBook = async (bookId: string) => {
  const result = await prisma.book.findUniqueOrThrow({
    where: {
      bookId,
    },
  });

  return result;
};

const updateBook = async (
  bookId: string,
  data: Partial<Book>
): Promise<Book> => {
 await prisma.book.findUniqueOrThrow({
    where: {
      bookId,
    },
  });

  const result = await prisma.book.update({
    where: {
      bookId,
    },
    data,
  });
  return result;
};


const deleteBook = async(bookId: string)=>{
    const isExist = await prisma.book.findUniqueOrThrow({
        where: {
            bookId
        }
    })

    const result = await prisma.book.delete({
        where: {
            bookId
        }
    })

    return result
}
export const BookService = {
  getAllBook,
  creteBook,
  getSingleBook,
  updateBook,
  deleteBook
};
