import { Request, RequestHandler, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { BookService } from "./book.service";
import sendResponse from "../../../shared/sendResponse";

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
  const result = await BookService.getAllBook();

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Books retrieved successfully",
    data: result,
  });
});

const createBookToDB: RequestHandler = catchAsync(async (req, res) => {
  const result = await BookService.creteBook(req.body);

  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: "Book created successfully",
    data: result,
  });
});

const getSingleBookFromDB: RequestHandler = catchAsync(async (req, res) => {
  const result = await BookService.getSingleBook(req.params.bookId);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Book retrieved successfully",
    data: result,
  });
});

const updateBookFromDB: RequestHandler = catchAsync(async (req, res) => {
  const result = await BookService.updateBook(req.params.bookId, req.body);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Book updated successfully",
    data: result,
  });
});

const deleteBookFromDB: RequestHandler = catchAsync(async(req, res)=>{
    const result = await BookService.deleteBook(req.params.bookId);

    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Book successfully deleted",
        data: null,
      });
})

export const BookController = {
  getAllFromDB,
  createBookToDB,
  getSingleBookFromDB,
  updateBookFromDB,
  deleteBookFromDB
};
