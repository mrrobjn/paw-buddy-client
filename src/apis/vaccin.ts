import api from "@/config/axios";

export const apiGetAllVaccins = async (params: {
  limit: number;
  page: number;
}) => {
  try {
    const res = await api.get("/vaccine/get-all-vaccine", { params });
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const apiCreateVaccin = async (data: Vaccine) => {
  try {
    const res = await api.post("/vaccine/admin/create-vaccine", data);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const apiUpdateVaccin = async (id: number, data: Vaccine) => {
  try {
    const res = await api.put(`/vaccine/admin/update-vaccine/${id}`, data);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const apiDeleteVaccin = async (id: number) => {
  try {
    const res = await api.delete(`/vaccine/admin/delete-vaccine/${id}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};
