import axios from "axios";
import { setLoading } from "../slices/books";
import { userLogin, setError } from "../slices/user";
import { Dispatch, AnyAction } from "redux";
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
        "/api/users.login",
        { email, password },
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
