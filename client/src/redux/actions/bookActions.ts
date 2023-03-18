import axios from "axios";
import { Dispatch } from "@reduxjs/toolkit";
import { setBooks, setError, setLoading, setBook } from "../slices/books";

export const getBooks = () => async (dispatch: Dispatch) => {
  dispatch(setLoading(true));
  try {
    const { data } = await axios.get("/api/books");
    dispatch(setBooks(data));
  } catch (error: any) {
    dispatch(
      setError(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
          ? error.message
          : "An unexpected error occured. Please try again later"
      )
    );
  }
};

export const getBook = (id: any) => async (dispatch: Dispatch) => {
  dispatch(setLoading(true));
  try {
    const { data } = await axios.get(`/api/books/${id}`);
    dispatch(setBook(data));
  } catch (error: any) {
    dispatch(
      setError(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
          ? error.message
          : "An unexpected error occured. Please try again later"
      )
    );
  }
};
