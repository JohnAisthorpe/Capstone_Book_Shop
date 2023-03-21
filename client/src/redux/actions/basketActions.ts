import axios from "axios";
import { Dispatch, AnyAction } from "@reduxjs/toolkit";
import {
  setLoading,
  setError,
  basketItemAdd,
  basketItemRemoval,
  clearBasket,
} from "../slices/basket";

export const addBasketItem =
  (id: number, qty: number | string) => async (dispatch: Dispatch) => {
    dispatch(setLoading(true));
    try {
      const { data } = await axios.get(`/api/books/${id}`);

      const bookToAdd = {
        _id: data._id,
        title: data.title,
        author: data.author,
        description: data.description,
        image: data.image,
        category: data.category,
        price: data.price,
        stock: data.stock,
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

export const removeBasketItem = (id: number) => async (dispatch: Dispatch) => {
  dispatch(setLoading(true));
  dispatch(basketItemRemoval(id));
};

export const removeAllBasketItems = () => (dispatch: Dispatch<AnyAction>) => {
  dispatch(clearBasket());
};
