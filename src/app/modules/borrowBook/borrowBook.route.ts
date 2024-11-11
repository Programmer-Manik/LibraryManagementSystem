import express from "express";
import { BookController } from "./borrowBook.controller";

const router = express.Router();

router.post("/borrow", BookController.borrowBook);

router.post("/return", BookController.returnBook);

router.get("/borrow/overdue", BookController.getOverdueBooks);

export const BorrowBookRoutes = router;
