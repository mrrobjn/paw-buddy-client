import api from "@/config/axios";

export const apiGetCurrent = async () => {
  try {
    const res = await api.get("/users/get-me");
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const apiUpdateCurrent = async (data: any) => {
  try {
    const res = await api.put("/users/update-me", data);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const apiGetAllUser = async (params: {
  limit: number;
  page: number;
  roleId?: number | string;
}) => {
  try {
    const res = await api.get("/users/all", { params });
    return res.data;
  } catch (error) {
    throw error;
  }
};
