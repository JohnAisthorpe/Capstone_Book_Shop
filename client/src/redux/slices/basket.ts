import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Book } from "../../../../types";

export interface BooksState {
  loading: boolean;
  error: null | Error;
  basket: Book[];
  subtotal: number;
}

const calculateSubtotal = (basketState: Book[]) => {
  let result = 0;
  basketState.map((item: Book) => {
    result += Number(item.qty) * item.price;
  });
  return result.toFixed(2);
};

const initialState: BooksState = {
  loading: false,
  error: null,
  basket: JSON.parse(localStorage.getItem("basketItems") ?? "[]"),
  subtotal: localStorage.getItem("basketItems")
    ? Number(
        calculateSubtotal(JSON.parse(localStorage.getItem("basketItems") ?? ""))
      )
    : 0,
};

const updateLocalStorage = (basket: Book[]) => {
  localStorage.setItem("basketItems", JSON.stringify(basket));
  localStorage.setItem("subtotal", JSON.stringify(calculateSubtotal(basket)));
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    basketItemAdd: (state, action: PayloadAction<any>) => {
      const existingItem = state.basket.find(
        (book) => book._id === action.payload._id
      );

      if (existingItem) {
        state.basket = state.basket.map((book) =>
          book._id === existingItem._id ? action.payload : book
        );
      } else {
        state.basket = [...state.basket, action.payload];
      }
      state.loading = false;
      state.error = null;
      updateLocalStorage(state.basket);
      state.subtotal = Number(calculateSubtotal(state.basket));
    },
    setError: (state, action: PayloadAction<Error>) => {
      state.error = action.payload;
      state.loading = false;
    },
    basketItemRemoval: (state, action: PayloadAction<number>) => {
      state.basket = state.basket.filter((item) => item._id !== action.payload);
      updateLocalStorage(state.basket);
      state.subtotal = Number(calculateSubtotal(state.basket));
      state.loading = false;
      state.error = null;
    },
  },
});

export const { setLoading, basketItemAdd, setError, basketItemRemoval } =
  basketSlice.actions;
export default basketSlice.reducer;
export const booksSelector = (state: RootState): BooksState => state.basket;
