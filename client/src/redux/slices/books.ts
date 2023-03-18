import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Book } from "../../../../types";

export interface BooksState {
  loading: boolean;
  error: null | Error;
  books: Book[];
  book: Book | null;
}

const initialState: BooksState = {
  loading: false,
  error: null,
  books: [],
  book: null,
};

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setBooks: (state, action: PayloadAction<Book[]>) => {
      state.loading = false;
      state.error = null;
      state.books = action.payload;
    },
    setBook: (state, action: PayloadAction<Book>) => {
      state.loading = false;
      state.error = null;
      state.book = action.payload;
    },
    setError: (state, action: PayloadAction<Error>) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { setLoading, setBooks, setError, setBook } = booksSlice.actions;
export default booksSlice.reducer;
export const booksSelector = (state: RootState): BooksState => state.books;
