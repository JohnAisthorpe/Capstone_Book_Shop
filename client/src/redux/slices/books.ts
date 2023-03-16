import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface BooksState {
  loading: boolean;
  error: null | Error;
  books: any[];
}

const initialState: BooksState = {
  loading: false,
  error: null,
  books: [],
};

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setBooks: (state, action: PayloadAction<any[]>) => {
      state.loading = false;
      state.error = null;
      state.books = action.payload;
    },
    setError: (state, action: PayloadAction<Error>) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { setLoading, setBooks, setError } = booksSlice.actions;
export default booksSlice.reducer;
export const booksSelector = (state: RootState): BooksState => state.books;
