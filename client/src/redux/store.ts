import { combineReducers, configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import booksReducer from "./slices/books";

const reducer = combineReducers({
  books: booksReducer,
});

export type RootState = ReturnType<typeof reducer>;

export default configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});
