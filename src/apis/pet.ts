import api from "@/config/axios";

export const apiGetAllPets = async (params: { id?: number }) => {
  try {
    const res = await api.get("/pets/get-all-pet", { params });
    return res.data;
  } catch (error) {
    throw error;
  }
};
