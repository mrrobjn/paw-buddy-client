import api, { getRefreshToken } from "@/config/axios";

export const apiLogin = async (data: LoginProp) => {
  try {
    const res = await api.post("/auth/login", data);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const apiRegister = async (data: RegisterProp) => {
  try {
    const res = await api.post("/auth/register", data);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const apiLogout = async () => {
  try {
    const res = await api.post("/auth/logout", {
      refresh_token: getRefreshToken(),
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};
