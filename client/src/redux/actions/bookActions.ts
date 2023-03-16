import axios from "axios";
import { Dispatch } from "@reduxjs/toolkit";
import { setBooks, setError, setLoading } from "../slices/books";

export const getBooks = () => async (dispatch: Dispatch) => {
  dispatch(setLoading(true));
};
