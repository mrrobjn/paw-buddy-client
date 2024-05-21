import api from "@/config/axios";

export const apiGetNotification = async () => {
  try {
    const res = await api.get("/notification");
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const apiUpdateNotification = async () => {
  try {
    const res = await api.put(`/notification/`);
    return res.data;
  } catch (error) {
    throw error;
  }
};
