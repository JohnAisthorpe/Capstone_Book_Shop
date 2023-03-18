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
const getBook = async (req: Request, res: Response) => {
  const book = await Book.findById(req.params.id);
  if (book) {
    res.json(book);
  } else {
    res.status(404);
    throw new Error("Book not found");
  }
};

bookRoutes.route("/").get(getBooks);
bookRoutes.route("/:id").get(getBook);

export default bookRoutes;
