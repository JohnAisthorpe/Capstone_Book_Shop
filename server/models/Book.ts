import mongoose from "mongoose";

export type BookDocument = Document & {
  title: string;
  author: string;
  description: string;
  image: string;
  category: string;
  price: number;
  stock: number;
};

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
});

const Book = mongoose.model("Book", bookSchema);

export default Book;
