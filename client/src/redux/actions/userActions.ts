import axios from "axios";
import {
  userLogin,
  setError,
  setLoading,
  userLogout,
  updateUserProfile,
  resetUpdate,
} from "../slices/user";
import { Dispatch, AnyAction } from "redux";
import { removeAllBasketItems } from "./basketActions";
import { ThunkAction } from "@reduxjs/toolkit";

export const login =
  (email: string, password: string) =>
  async (dispatch: Dispatch<AnyAction>) => {
    dispatch(setLoading(true));
    try {
      const config = {
        headers: {
          "Content-Type": "Application/json",
        },
      };
      const { data } = await axios.post(
        "/api/users/login",
        { email, password },
        config
      );
      dispatch(userLogin(data));
      localStorage.setItem("userInfo", JSON.stringify(data));
      dispatch(removeAllBasketItems() as any);
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
export const logout = () => (dispatch: Dispatch<AnyAction>) => {
  localStorage.removeItem("userInfo");
  dispatch(removeAllBasketItems() as any);
  dispatch(userLogout());
};

export const register =
  (name: string, email: string, password: string) =>
  async (dispatch: Dispatch<AnyAction>) => {
    dispatch(setLoading(true));
    try {
      const config = {
        headers: {
          "Content-Type": "Application/json",
        },
      };
      const { data } = await axios.post(
        "/api/users/register",
        { name, email, password },
        config
      );
      dispatch(userLogin(data));
      localStorage.setItem("userInfo", JSON.stringify(data));
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

export const updateProfile =
  //getState is similar to useSelector but we don't need to use it since we in our store


    (id: string, name: string, email: string, password: string) =>
    async (dispatch: Dispatch<AnyAction>, getState: any) => {
      const {
        user: { userInfo },
      } = getState();
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
            "Content-Type": "Application/json",
          },
        };
        const { data } = await axios.put(
          `/api/users/profile/${id}`,
          {
            _id: id,
            name,
            email,
            password,
          },
          config
        );
        localStorage.setItem("userInfo", JSON.stringify(data));
        dispatch(updateUserProfile(data));
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

export const resetUpdateSuccess =
  () => async (dispatch: Dispatch<AnyAction>) => {
    dispatch(resetUpdate());
  };
