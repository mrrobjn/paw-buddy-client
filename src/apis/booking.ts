import api from "@/config/axios";

export const apiGetBooking = async (params: {
  start_date: string;
  end_date: string;
  vet_id?: number;
}) => {
  try {
    const res = await api.get("/booking/detail", { params });
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const apiGetBookingDetail = async (id: string | number) => {
  try {
    const res = await api.get(`/booking/detail/${id}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const apiApproveBooking = async (data: {
  status: "pending" | "confirmed" | "completed" | "cancelled";
  booking_id: number;
}) => {
  try {
    const res = await api.put("/booking/vet/approve-booking", data);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const apiCancelBooking = async (id: number) => {
  try {
    const res = await api.delete(`/booking/cancel-booking/${id}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};
