import { createSlice } from "@reduxjs/toolkit";
import { loginUser, logoutUser } from "./async";

const initialState: User = {
  id: 0,
  email: "",
  password: "",
  fullName: "Your Name",
  phone: "",
  roleId: 0,
  gender: true,
  address: null,
  avatar: null,
  refreshToken: "",
  createdAt: "",
  updatedAt: "",
  roleData: { id: 0, name_role: "" },
  petData: [],
  isAuthenticated: false,
  _id: "",
};

export const userReducer = createSlice({
  name: "user",
  initialState,
  reducers: {
    getCurrent: (state, action) => {
      return { ...state, ...action.payload };
    },
    login: (state) => {
      state.isAuthenticated = true;
    },
    logout: () => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.fulfilled, (state, action) => {
      const { payload }: any = action;
      if (payload.success) {
        state.isAuthenticated = true;
      }
    });
    builder.addCase(logoutUser.fulfilled, () => {
      return initialState;
    });
  },
});

export const { getCurrent, logout, login } = userReducer.actions;
