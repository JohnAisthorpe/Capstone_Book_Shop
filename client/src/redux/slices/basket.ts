import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface BooksState {
  loading: boolean;
  error: null | Error;
  basket: any[];
  subTotal: number;
}

const initialState: BooksState = {
  loading: false,
  error: null,
  basket: [],
  subTotal: 0,
};

const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    basketItemAdd: (state, action: PayloadAction<any>) => {
      const existingItem = state.basket.find(
        (book) => book.id === action.payload.id
      );

      if (existingItem) {
        state.basket = state.basket.map((book) =>
          book.id === existingItem.id ? action.payload : book
        );
      } else {
        state.basket = [...state.basket, action.payload];
      }
      state.loading = false;
      state.error = null;
    },
    setError: (state, action: PayloadAction<Error>) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { setLoading, basketItemAdd, setError } = basketSlice.actions;
export default basketSlice.reducer;
export const booksSelector = (state: RootState): BooksState => state.basket;
