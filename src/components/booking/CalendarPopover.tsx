import moment from "moment";
import { FaCalendar, FaClock, FaXmark } from "react-icons/fa6";
import { Button } from "../common/Button";
import { MouseEventHandler } from "react";

interface Props {
  position: {
    x: number;
    y: number;
  };
  booking: Booking;
  openModal: MouseEventHandler;
  closePopover: MouseEventHandler;
}

const CalendarPopover: React.FC<Props> = ({
  position,
  openModal,
  booking,
  closePopover,
}) => {
  return (
    <div
      className="absolute z-50 bg-secondary shadow-2xl w-[350px] rounded-lg"
      style={{
        top: position.y,
        left: position.x,
      }}
    >
      <div className="text-right flex justify-between items-center py-1 pl-2 rounded-t-lg bg-blue-50">
        <p className="flex items-center font-semibold flex-1 text-left">
          <FaCalendar size={12} style={{ marginRight: 8 }} />
          {booking.date}
        </p>
        <button style={{ padding: 8 }} onClick={closePopover}>
          <FaXmark size={18} />
        </button>
      </div>
      <div onClick={openModal} className="cursor-pointer">
        <div className="flex items-center p-2 font-semibold">
          <FaClock size={12} style={{ marginRight: 8 }} />
          {moment(
            "1970-01-01 " + booking.start_time,
            "YYYY-MM-DD HH:mm:ss"
          ).format("HH:mm")}{" "}
          -{" "}
          {moment(
            "1970-01-01 " + booking.end_time,
            "YYYY-MM-DD HH:mm:ss"
          ).format("HH:mm")}
        </div>
        <div className="flex items-center px-2 pb-2">
          <span className="font-semibold mr-2">Owner:</span>
          {booking.dataUser.fullName}
        </div>
        <div className="flex items-center px-2 pb-2">
          <span className="font-semibold mr-2">Pet&apos;s name:</span>
          {booking.dataPet.name_pet}
        </div>
        <div className="flex items-center px-2 pb-2">
          <span className="font-semibold mr-2">Status:</span>
          <p
            className={`border-2 px-2 rounded-full font-semibold ${
              booking.status === "completed"
                ? "text-success bg-green-50 border-success"
                : booking.status === "cancelled"
                ? "text-danger bg-red-50 border-danger"
                : booking.status === "pending"
                ? "text-warning bg-yellow-50 border-warning"
                : "text-blue bg-blue-50 border-primary"
            }`}
          >
            {booking.status}
          </p>
        </div>
      </div>
      <div className="flex items-center p-2 border-t-2">
        <Button btnType="primary" onClick={openModal}>
          Edit
        </Button>
      </div>
    </div>
  );
};

export default CalendarPopover;
