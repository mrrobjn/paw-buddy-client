import api from "@/config/axios";

export const apiGetAllService = async (params: {}) => {
  try {
    const res = await api.get("/service/get-all-service", { params });
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const apiUpdateService = async (id: number, data: any) => {
  try {
    const res = await api.put(`service/admin/update-service/${id}`, data);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const apiCreateService = async (data: any) => {
  try {
    const res = await api.post("service/admin/create-service", data);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const apiDeleteService = async (id: number) => {
  try {
    const res = await api.delete(`service/admin/delete-service/${id}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};
