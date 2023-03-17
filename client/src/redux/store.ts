import { combineReducers, configureStore } from "@reduxjs/toolkit";
import booksReducer from "./slices/books";
import basket from "./slices/basket";

const reducer = combineReducers({
  books: booksReducer,
  basket,
});

export type RootState = ReturnType<typeof reducer>;

export default configureStore({
  reducer,
});
