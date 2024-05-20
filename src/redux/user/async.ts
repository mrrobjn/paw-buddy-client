import { apiLogin, apiLogout } from "@/apis";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const logoutUser = createAsyncThunk(
  "user/logout",
  async (_, { rejectWithValue }) => {
    try {
      const res = await apiLogout();
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      return res;
    } catch (error) {
      throw error;
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/login",
  async (data: LoginProp, { rejectWithValue }) => {
    try {
      const res = await apiLogin(data);
      if (!res.success) {
        return {
          success: false,
          message: res.message,
        };
      }
      if (res.user.roleId === 3) {
        return {
          success: false,
          message: "Unauthorized, please contact the administrator",
        };
      }

      localStorage.setItem("accessToken", JSON.stringify(res.accessToken));
      localStorage.setItem(
        "refreshToken",
        JSON.stringify(res.user.refreshToken)
      );
      return {
        success: true,
      };
    } catch (error: any) {
      throw error;
    }
  }
);
