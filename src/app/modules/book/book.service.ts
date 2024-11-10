import { Book, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createBook = async (data: Book) => {
  const newBook = await prisma.book.create({
    data: {
      title: data.title,
      genre: data.genre,
      publishedYear: data.publishedYear,
      totalCopies: data.totalCopies,
      availableCopies: data.availableCopies,
    },
  });

  return newBook;
};

const getAllBooks = async () => {
  const books = await prisma.book.findMany();
  return books;
};

const getBookById = async (bookId: string) => {
  const book = await prisma.book.findUnique({
    where: { bookId },
  });
  return book;
};

const updateBook = async (bookId: string, data: Partial<Book>) => {
  const updatedBook = await prisma.book.update({
    where: { bookId },
    data: {
      title: data.title,
      genre: data.genre,
      publishedYear: data.publishedYear,
      totalCopies: data.totalCopies,
      availableCopies: data.availableCopies,
    },
  });

  return updatedBook;
};

const deleteBook = async (bookId: string) => {
  const deletedBook = await prisma.book.delete({
    where: { bookId },
  });

  return deletedBook;
};

export const bookService = {
  createBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook,
};
