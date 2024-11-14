import { Response } from "express";

const sendResponse = <T>(
  res: Response,
  jsonData: {
    statusCode: number;
    message: string;
    success: boolean;
    data: T | null | undefined;
  }
) => {
  res.status(jsonData.statusCode).json({
    success: jsonData.success,
    message: jsonData.message,
    status: jsonData.statusCode,
    data: jsonData.data || null || undefined,
  });
};

export default sendResponse;
