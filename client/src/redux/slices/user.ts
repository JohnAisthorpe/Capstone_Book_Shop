import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
}

export interface UserState {
  loading: boolean;
  error: Error | null; // Change the type to Error | null
  userInfo: IUser | null;
  updateSuccess: boolean;
}
const userInfoFromLocalStorage = localStorage.getItem("userInfo");
const userInfo =
  userInfoFromLocalStorage !== null
    ? JSON.parse(userInfoFromLocalStorage)
    : null;

const initialState: UserState = {
  loading: false,
  error: null,
  userInfo: userInfo,
  updateSuccess: false,
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    userLogin: (state, { payload }) => {
      state.userInfo = payload;
      state.error = null;
      state.loading = false;
    },
    userLogout: (state) => {
      state.loading = false;
      state.error = null;
      state.userInfo = null;
    },
    setError: (state, action: PayloadAction<Error>) => {
      state.error = action.payload;
      state.loading = false;
    },
    updateUserProfile: (state, { payload }) => {
      state.userInfo = payload;
      state.updateSuccess = true;
      state.loading = false;
      state.error = null;
    },
    resetUpdate: (state) => {
      state.updateSuccess = false;
    },
  },
});

export const {
  setLoading,
  setError,
  userLogin,
  userLogout,
  updateUserProfile,
  resetUpdate,
} = userSlice.actions;
export default userSlice.reducer;
export const userSelector = (state: RootState): UserState => state.user;
