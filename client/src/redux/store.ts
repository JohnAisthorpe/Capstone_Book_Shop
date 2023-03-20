import { combineReducers, configureStore } from "@reduxjs/toolkit";
import booksReducer from "./slices/books";
import basket from "./slices/basket";
import user from "./slices/user";

const reducer = combineReducers({
  books: booksReducer,
  basket,
  user,
});

export type RootState = ReturnType<typeof reducer>;

export default configureStore({
  reducer,
});
