import express, { Request, Response, Router } from "express";
import Book, { BookDocument } from "../models/Book";

const bookRoutes: Router = express.Router();

const getBooks = async (
  req: Request,
  res: Response<BookDocument[]>
): Promise<void> => {
  const books: BookDocument[] = await Book.find({});
  res.json(books);
};

bookRoutes.route("/").get(getBooks);

export default bookRoutes;
