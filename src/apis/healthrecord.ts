import api from "@/config/axios";

export const apiGetRecord = async (
  id: number,
  params?: { limit: number; page: number; id?: number }
) => {
  try {
    const res = await api.get(`/medicalRecord/get-record-of-pet/${id}`, {
      params,
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const apiGetVetRecord = async () => {
  try {
    const res = await api.get("/medicalRecord/vet/get-records-of-vet");
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const apiUpdateRecord = async (id: number, data: RecordField) => {
  try {
    const res = await api.put(`/medicalRecord/vet/update-record/${id}`, data);
    return res.data;
  } catch (error) {
    throw error;
  }
};
