import React, { useEffect, useState } from "react";
import ModalForm from "../form/ModalForm";
import { ModalInput } from "../form/ModalInput";
import { apiGetBooking, apiRecreateBooking } from "@/apis";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useAppSelector } from "@/redux/hook";
import { userSelector } from "@/redux/selector";
import { Loading } from "../loading/Loading";

interface Props {
  visible: boolean;
  onClose: Function;
  pet_id: number;
  booking_id: number;
  date: string;
}

const hours = [
  ["07:00:00", "07:30:00", "08:00:00"],
  ["08:30:00", "09:00:00", "09:30:00"],
  ["10:00:00", "10:30:00", "11:00:00"],
  ["11:30:00", "12:00:00", "12:30:00"],
  ["13:00:00", "13:30:00", "14:00:00"],
  ["14:30:00", "15:00:00", "15:30:00"],
  ["16:00:00", "16:30:00", "17:00:00"],
  ["17:30:00", "18:00:00", "18:30:00"],
  ["19:00:00", "19:30:00", "20:00:00"],
];

interface State {
  bookings: Booking[];
  selTime?: string;
  date: string;
  error: string;
  isLoading: boolean;
}

const initState: State = {
  bookings: [],
  date: "",
  error: "",
  isLoading: false,
};

const ReCreateBooking: React.FC<Props> = ({
  visible,
  onClose,
  booking_id,
  pet_id,
  date,
}) => {
  const [state, setState] = useState<State>(initState);
  const user: User = useAppSelector(userSelector);
  const { handleSubmit } = useForm();

  useEffect(() => {
    if (visible) handleChange("date", date);
  }, [visible]);

  useEffect(() => {
    if (visible && state.date) {
      handleChange("selTime", undefined);
      fetchBookings();
    }
  }, [state.date, visible]);

  const fetchBookings = async () => {
    try {
      handleChange("error", initState.error);
      const resData = await apiGetBooking({
        start_date: state.date,
        end_date: state.date,
      });
      if (resData.success) {
        handleChange("bookings", resData.data);
      }
    } catch (error) {}
  };

  const handleClose = () => {
    onClose();
    setState(initState);
  };

  const handleChange = (name: string, value: any) => {
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onSubmit: SubmitHandler<any> = async () => {
    try {
      handleChange("isLoading", true);
      if (state.selTime) {
        handleChange("error", initState.error);
        const resData = await apiRecreateBooking({
          booking_id: booking_id,
          date: state.date,
          pet_id,
          start_time: state.selTime,
          user_id: user.id,
        });
        if (resData.success) {
          toast.success("Create booking successfullly");
          handleClose();
        } else {
          handleChange("error", resData.message);
        }
      } else handleChange("error", "Please select a time");
    } catch (error: any) {
      handleChange("error", "Error: Something wrong");
    }
    handleChange("isLoading", false);
  };

  return (
    <ModalForm
      visible={visible}
      onClose={handleClose}
      title="Re-examination"
      footer={!state.isLoading}
      error={state.error}
      onSubmit={handleSubmit(onSubmit)}
    >
      {state.isLoading ? (
        <div className="w-[672px] h-[218px]">
          <Loading />
        </div>
      ) : (
        <>
          <div className="p-2">
            <ModalInput
              min={date}
              type="date"
              value={state.date}
              onchange={(e: any) => handleChange("date", e.target.value)}
            />
          </div>
          <div className="flex px-1">
            {hours.map((hs, i) => {
              return (
                <div key={i}>
                  <div className="p-1">
                    {hs.map((h, i) => {
                      const isBooked = state.bookings.find(
                        (b) => b.start_time <= h && b.end_time >= h
                      );
                      return (
                        <div
                          key={i}
                          className={`p-2 mb-2 border-[1px] rounded cursor-pointer ${
                            isBooked && "bg-disable text-body border-disable"
                          } ${
                            state.selTime === h &&
                            "bg-primary text-10 border-primary transition-all"
                          }`}
                          onClick={() => {
                            !isBooked && handleChange("selTime", h);
                          }}
                        >
                          {`${h.split(":")[0]}h${h.split(":")[1]}`}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </ModalForm>
  );
};

export default ReCreateBooking;
