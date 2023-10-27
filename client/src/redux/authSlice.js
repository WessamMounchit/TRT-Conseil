import { createSlice } from "@reduxjs/toolkit";
import secureLocalStorage from "react-secure-storage";

const userAuthFromLocalStorage = () => {
  const isAuth = secureLocalStorage.getItem("isAuth");

  if (isAuth && JSON.parse(isAuth) === true) {
    return true;
  }

  return false;
};

const initialState = {
  isAuth: userAuthFromLocalStorage(),
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authenticateUser: (state) => {
      state.isAuth = true;
    },
    unauthenticateUser: (state) => {
      state.isAuth = false;
    },
  },
});

export const { authenticateUser, unauthenticateUser } = authSlice.actions;

export default authSlice.reducer;
