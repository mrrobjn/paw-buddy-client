import moment from "moment";
import { CSSProperties } from "react";
import { Calendar, View, Event, momentLocalizer } from "react-big-calendar";

const localizer = momentLocalizer(moment);

interface Props {
  bookings: Booking[];
  onNavigate: (newDate: Date) => void;
  onView: (view: View) => void;
  onSelectEvent: (event: Event, e: React.SyntheticEvent<HTMLElement>) => void;
  view: View;
  date: Date;
}

const BookingCalendar: React.FC<Props> = ({
  bookings,
  onNavigate,
  onSelectEvent,
  onView,
  date,
  view,
}) => {
  const convertEvents = () => {
    return bookings.map((booking) => {
      const [year, month, day] = booking.date.split("-").map(Number);
      const [startHour, startMinute, startSecond] = booking.start_time
        .split(":")
        .map(Number);
      const [endHour, endMinute, endSecond] = booking.end_time
        .split(":")
        .map(Number);

      const startDateTime = new Date(
        year,
        month - 1,
        day,
        startHour,
        startMinute,
        startSecond
      );
      const endDateTime = new Date(
        year,
        month - 1,
        day,
        endHour,
        endMinute,
        endSecond
      );

      return {
        ...booking,
        title: booking.status,
        start: startDateTime,
        end: endDateTime,
        status: booking.status,
      };
    });
  };

  const eventStyleGetter = (
    event: any,
    start: any,
    end: any,
    isSelected: any
  ) => {
    const style: CSSProperties = {
      backgroundColor:
        event.status === "completed"
          ? "#82C43C"
          : event.status === "cancelled"
          ? "#FC5A5A"
          : event.status === "pending"
          ? "#FFC542"
          : "#247CFF",
    };
    return { style };
  };

  return (
    <div className="flex-1 overflow-y-auto px-5 pb-5">
      <Calendar
        localizer={localizer}
        events={convertEvents()}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "100%" }}
        onNavigate={onNavigate}
        onView={onView}
        view={view}
        views={["month", "week", "day"]}
        date={date}
        onSelectEvent={onSelectEvent}
        eventPropGetter={eventStyleGetter}
      />
    </div>
  );
};

export default BookingCalendar;
