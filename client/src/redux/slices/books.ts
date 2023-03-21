import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Book } from "../../../../types";

export interface BooksState {
  loading: boolean;
  error: null | Error;
  books: Book[];
  book: Book | null;
  originalBooks: Book[];
}

const initialState: BooksState = {
  loading: false,
  error: null,
  books: [],
  book: null,
  originalBooks: [],
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
      state.originalBooks = action.payload;
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
    searchBooks: (state, action: PayloadAction<string>) => {
      state.loading = true;
      state.error = null;
      const searchTerm = action.payload.toLowerCase();
      state.books = state.originalBooks.filter(
        (book) =>
          book.title.toLowerCase().includes(searchTerm) ||
          book.author.toLowerCase().includes(searchTerm)
      );
      state.loading = false;
    },
    resetSearch: (state) => {
      state.books = state.originalBooks;
    },
    filterBooks: (state, action: PayloadAction<string>) => {
      console.log(action);
      state.books = state.originalBooks.filter(
        (book) => book.category.toLowerCase() === action.payload.toLowerCase()
      );
    },
  },
});

export const {
  setLoading,
  setBooks,
  setError,
  setBook,
  searchBooks,
  resetSearch,
  filterBooks,
} = booksSlice.actions;
export default booksSlice.reducer;
export const booksSelector = (state: RootState): BooksState => state.books;
