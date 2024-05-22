"use client";
import { useEffect, useState } from "react";
import { apiGetBooking } from "@/apis";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "../styles/calendar_custom_style.css";
import HeadTitle from "@/components/common/HeadTitle";
import BookingDetailModal from "@/components/booking/BookingDetailModal";
import { useAppSelector } from "@/redux/hook";
import { userSelector } from "@/redux/selector";
import CalendarPopover from "@/components/booking/CalendarPopover";
import BookingCalendar from "@/components/booking/BookingCalendar";

type InitState = {
  date: Date;
  view: "month" | "week" | "day";
  data: Booking[];
  event?: Booking;
  position?: {
    x: number;
    y: number;
  };
  visible: boolean;
  medicines: Medicine[];
};

export default function Home() {
  const user: User = useAppSelector(userSelector);
  const [state, setState] = useState<InitState>({
    date: new Date(),
    view: "month",
    data: [],
    visible: false,
    medicines: [],
  });

  useEffect(() => {
    if (user._id) onView(state.view);
  }, [user._id]);

  const handleChange = (name: string, value: any) => {
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleOpenModal = () => {
    handleChange("position", null);
    handleChange("visible", true);
  };

  const handleCloseModal = () => {
    handleChange("visible", false);
  };

  const fetchBooking = async (querys: {
    start_date: string;
    end_date: string;
    vet_id?: number;
  }) => {
    try {
      if (user.roleId !== 1) {
        querys.vet_id = user.id;
      }
      const resData = await apiGetBooking(querys);
      if (resData.success) {
        const appoinments: Booking[] = resData.data;
        handleChange("data", appoinments);
        return resData.data
      }
    } catch (error) {}
  };

  const convertDate = (view: any, date: Date) => {
    const start_date = moment(date).startOf(view).format("YYYY-MM-DD");
    const end_date = moment(date).endOf(view).format("YYYY-MM-DD");
    return { start_date, end_date };
  };

  const onView = async (view: any) => {
    handleChange("position", null);
    handleChange("view", view);
    await fetchBooking(convertDate(view, state.date));
  };

  const onNavigate = async (date: any) => {
    handleChange("position", null);
    handleChange("date", date);
    await fetchBooking(convertDate(state.view, date));
  };

  const handleSelected = (event: any, e: any) => {
    handleChange("event", event);
    handleChange("position", { x: e.pageX - 260, y: e.pageY - 150 });
  };

  return (
    <div className="h-full flex overflow-hidden">
      {state.event && (
        <BookingDetailModal
          visible={state.visible}
          booking={state.event}
          onClose={handleCloseModal}
          fetchBooking={() => fetchBooking(convertDate(state.view, state.date))}
          changeStatus={(status: string) =>
            handleChange("event", { ...state.event, status })
          }
        />
      )}
      <div className="flex-1 flex flex-col">
        <HeadTitle>Calendar</HeadTitle>
        <BookingCalendar
          bookings={state.data}
          date={state.date}
          onNavigate={onNavigate}
          onSelectEvent={handleSelected}
          onView={onView}
          view={state.view}
        />
        {state.position && state.event && (
          <CalendarPopover
            closePopover={() => handleChange("position", null)}
            booking={state.event}
            openModal={handleOpenModal}
            position={state.position}
          />
        )}
      </div>
    </div>
  );
}
