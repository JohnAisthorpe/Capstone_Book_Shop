import axios from "axios";
import { Dispatch } from "@reduxjs/toolkit";
import { setLoading, setError, basketItemAdd } from "../slices/basket";

export const addBasketItem =
  (id: number, qty: number | string) => async (dispatch: Dispatch) => {
    dispatch(setLoading(true));
    try {
      const { data } = await axios.get(`/api/books/${id}`);

      const bookToAdd = {
        id: data._id,
        title: data.title,
        image: data.image,
        price: data.price,
        stock: data.stock,
        author: data.author,
        qty,
      };

      dispatch(basketItemAdd(bookToAdd));
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
