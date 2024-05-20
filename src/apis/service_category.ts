import api from "@/config/axios";

export const apiGetAllCategory = async (params?: {}) => {
  try {
    const res = await api.get("/serviceCategory/all", { params });
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const apiCreateCategory = async (data: any) => {
  try {
    const res = await api.post(
      "/serviceCategory/admin/create-service-category",
      data
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const apiUpdateCategory = async (id: number, data: any) => {
  try {
    const res = await api.put(
      `/serviceCategory/admin/update-service-category/${id}`,
      data
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const apiDeleteCategory = async (id: number) => {
  try {
    const res = await api.delete(
      `/serviceCategory/admin/delete-service-category/${id}`
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};
