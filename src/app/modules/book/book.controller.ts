import { RequestHandler } from "express";
import catchAsync from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";
import { bookService } from "./book.service";

const createBook: RequestHandler = catchAsync(async (req, res) => {
  const result = await bookService.createBook(req.body);

  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: "Book created successfully",
    data: result,
  });
});

const getAllBooks: RequestHandler = catchAsync(async (req, res) => {
  const result = await bookService.getAllBooks();

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Books retrieved successfully",
    data: result,
  });
});

const getBookById: RequestHandler = catchAsync(async (req, res) => {
  const result = await bookService.getBookById(req.params.bookId);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Book retrieved successfully",
    data: result,
  });
});

const updateBook: RequestHandler = catchAsync(async (req, res) => {
  const result = await bookService.updateBook(req.params.bookId, req.body);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Book updated successfully",
    data: result,
  });
});

const deleteBook: RequestHandler = catchAsync(async (req, res) => {
  await bookService.deleteBook(req.params.bookId);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Book successfully deleted",
  });
});

export const BookController = {
  createBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook,
};
