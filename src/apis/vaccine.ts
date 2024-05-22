import api from "@/config/axios";

export const apiGetAllVaccines = async (params: {
  limit?: number;
  page?: number;
  service_id?:number
}) => {
  try {
    const res = await api.get("/vaccine/get-all-vaccine", { params });
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const apiCreateVaccine = async (data: Vaccine) => {
  try {
    const res = await api.post("/vaccine/admin/create-vaccine", data);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const apiUpdateVaccine = async (id: number, data: Vaccine) => {
  try {
    const res = await api.put(`/vaccine/admin/update-vaccine/${id}`, data);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const apiDeleteVaccine = async (id: number) => {
  try {
    const res = await api.delete(`/vaccine/admin/delete-vaccine/${id}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};
