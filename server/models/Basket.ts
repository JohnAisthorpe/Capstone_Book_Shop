// models/Basket.ts

import mongoose, { Document } from "mongoose";
import { BookDocument } from "./Book";
import { IUser } from "./User";

export interface BasketItem {
  book: BookDocument;
  quantity: number;
}

export type BasketDocument = Document & {
  user: IUser["_id"];
  items: BasketItem[];
};

const basketSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  items: [
    {
      book: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Book",
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
});

const Basket = mongoose.model<BasketDocument>("Basket", basketSchema);

export default Basket;
