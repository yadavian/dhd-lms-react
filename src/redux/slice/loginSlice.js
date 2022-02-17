import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const loginlice = createSlice({
  name: "login",
  initialState: {
    userLogin: false,
    adminLogin: false,
    userData: [],
    adminData: [],
  },
  reducers: {
    setUserLogin: (state, action) => {
      state.userLogin = action.payload;
    },
    setAdminLogin: (state, action) => {
      state.adminLogin = action.payload;
    },
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    setAdminData: (state, action) => {
      state.adminData = action.payload;
    },
  },
});

//actions
export const { setUserLogin, setAdminLogin, setUserData, setAdminData } = loginlice.actions;

export default loginlice.reducer;
