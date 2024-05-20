import api from "@/config/axios";

interface MedicineParams {
  limit: number;
  page: number;
  name?: string;
}

export const apiGetAllMedicine = async (params?: MedicineParams) => {
  try {
    const res = await api.get("/medicine/get-all-medicine", { params });
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const apiCreateMedicine = async (data: Medicine) => {
  try {
    const res = await api.post("/medicine/admin/create-medicine/", data);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const apiUpdateMedicine = async (id: number, data: Medicine) => {
  try {
    const res = await api.put(`/medicine/admin/update-medicine/${id}`, data);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const apiDeleteMedicine = async (id: number) => {
  try {
    const res = await api.delete(`/medicine/admin/delete-medicine/${id}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};
