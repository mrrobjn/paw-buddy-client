import api from "@/config/axios";

export const apiGetConversation = async () => {
  try {
    const res = await api.get("/message/conversations");
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const apiGetMessages = async (id: string) => {
  try {
    const res = await api.get(`/message/${id}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const apiSendMessage = async (id: string, data: { message: string }) => {
  try {
    const res = await api.post(`/message/send/${id}`, data);
    return res.data;
  } catch (error) {
    throw error;
  }
};
