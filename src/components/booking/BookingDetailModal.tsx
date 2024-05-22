"use client";
import moment from "moment";
import ModalForm from "../form/ModalForm";
import { ModalSelect } from "../form/ModalSelect";
import { RowField } from "../form/RowField";
import { FaMars, FaMinus, FaPlus, FaVenus, FaXmark } from "react-icons/fa6";
import { Button } from "../common/Button";
import { useEffect, useState } from "react";
import MedicineChooseModal from "./MedicineChooseModal";
import {
  apiApproveBooking,
  apiCancelBooking,
  apiGetAllVaccines,
  apiUpdateRecord,
} from "@/apis";
import ModalAction from "../form/ModalAction";
import PetRecordModal from "./PetRecordModal";
import { ModalTextarea } from "../form/ModalTextarea";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useAppSelector } from "@/redux/hook";
import { userSelector } from "@/redux/selector";
import { NoAvatar } from "../common/NoAvatar";

interface Props {
  visible: boolean;
  booking: Booking;
  onClose: Function;
  changeStatus: Function;
  fetchBooking: Function;
}

interface State {
  vaccine_id: number;
  medVisible: boolean;
  confirmVisible: boolean;
  warningVisible: boolean;
  recVisible: boolean;
  curMeds: Medicine[];
  totalPrice: number;
  error: string;
  isLoading: boolean;
  vaccines: Vaccine[];
  record_id: number;
}

const initState: State = {
  medVisible: false,
  curMeds: [],
  totalPrice: 0,
  error: "",
  confirmVisible: false,
  warningVisible: false,
  recVisible: false,
  isLoading: false,
  vaccines: [],
  vaccine_id: 0,
  record_id: 0,
};

const BookingDetailModal: React.FC<Props> = ({
  visible,
  booking,
  onClose,
  changeStatus,
  fetchBooking,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RecordField>();
  const [state, setState] = useState<State>(initState);
  const user: User = useAppSelector(userSelector);

  useEffect(() => {
    if (visible) {
      let totalPrice = state.totalPrice;
      totalPrice = booking.services.reduce(
        (sum, item) => sum + parseInt(item.price),
        0
      );
      totalPrice +=
        state.curMeds &&
        state.curMeds.reduce((sum, item) => sum + parseInt(item.price), 0);
      totalPrice +=
        state.vaccine_id &&
        parseFloat(
          state.vaccines.find((v) => v.id == state.vaccine_id)?.price || ""
        );

      handleChange("totalPrice", totalPrice);
    }
  }, [state.curMeds, visible, state.vaccine_id]);

  useEffect(() => {
    if (visible) fetchVaccine();
  }, [visible]);

  const handleChange = (name: string, value: any) => {
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const fetchVaccine = async () => {
    try {
      let hasVaccine = booking.services.find(
        (s) => s.name_service.split(" ")[0] === "Vaccine"
      );
      if (hasVaccine) {
        const resData = await apiGetAllVaccines({
          service_id: hasVaccine.id,
        });
        if (resData.success) {
          handleChange("vaccines", resData.data);
          handleChange("vaccine_id", resData.data[0].id);
        }
      }
    } catch (error) {}
  };

  const handleClose = () => {
    onClose();
    setState(initState);
    reset();
  };

  const appendMedicine = (medicine: Medicine) => {
    const existed = state.curMeds.find((m) => m.id === medicine.id);
    if (!existed) {
      handleChange("curMeds", [...state.curMeds, medicine]);
    } else {
      toast.warning(`Already add ${medicine.name_medicine}`);
    }
  };

  const handleStatusChange = async (value: any) => {
    try {
      if (value === "confirmed") {
        const resData = await apiApproveBooking({
          status: value,
          booking_id: booking.id,
        });
        if (resData.success) {
          changeStatus(value);
          const data: Booking[] = await fetchBooking();
          handleChange(
            "record_id",
            data.find((b) => b.id === booking.id)?.dataRecord?.id
          );
          handleChange("error", initState.error);
        } else {
          handleChange("error", resData.mess);
        }
      } else if (value === "cancelled") {
        const resData = await apiCancelBooking(booking.id);
        if (resData.success) {
          changeStatus(value);
          await fetchBooking();
          handleChange("curMeds", initState.curMeds);
          handleChange("error", initState.error);
        } else {
          handleChange("error", resData.mess);
        }
      }
    } catch (error) {
      handleChange("error", "Something wrong");
    }
  };

  const handleOpenConfirm = (e: any) => {
    e.preventDefault();
    handleChange("confirmVisible", true);
  };

  const onSubmit: SubmitHandler<RecordField> = async (data) => {
    try {
      handleChange("isLoading", true);
      let result = "";
      state.curMeds.forEach((res, i) => {
        if (i + 1 < state.curMeds.length) {
          result += res.id + ",";
        } else {
          result += res.id;
        }
      });
      data.medicine_ids = result;
      const resData = await apiUpdateRecord(
        booking.dataRecord?.id || state.record_id,
        data
      );
      if (resData.success) {
        changeStatus("completed");
        await fetchBooking();
        toast.success("Booking completed");
        handleChange("error", initState.error);
        handleChange("confirmVisible", initState.confirmVisible);
      } else {
        handleChange("error", resData.message);
      }
    } catch (error: any) {
      handleChange("error", "Error: Something wrong");
    }
    handleChange("isLoading", false);
  };

  return (
    <>
      <ModalForm
        title="booking detail"
        visible={visible}
        onClose={handleClose}
        footer={booking.status === "confirmed"}
        error={state.error}
        onSubmit={handleOpenConfirm}
      >
        {booking && (
          <div className="p-3 w-[1100px] overflow-y-auto">
            <div className="flex mb-4 justify-between">
              <div className="flex flex-col w-[495px]">
                <RowField
                  label={"Status"}
                  value={
                    <ModalSelect
                      value={booking.status}
                      onChange={(e) => handleStatusChange(e.target.value)}
                      disabled={
                        booking.status === "cancelled" ||
                        booking.status === "completed"
                      }
                      className="font-bold"
                    >
                      {booking.status === "pending" && (
                        <option value="pending">Pending</option>
                      )}
                      {user.roleId === 2 && (
                        <option value="confirmed">Confirmed</option>
                      )}
                      {booking.status === "completed" && (
                        <option value="completed">Completed</option>
                      )}
                      <option value="cancelled">Cancelled</option>
                    </ModalSelect>
                  }
                />
              </div>
              <div className="flex flex-col w-[495px]">
                <RowField label={"Date"} value={booking.date} />
                <RowField
                  label={"Time"}
                  value={
                    moment(
                      "1970-01-01 " + booking.start_time,
                      "YYYY-MM-DD HH:mm:ss"
                    ).format("HH:mm") +
                    " - " +
                    moment(
                      "1970-01-01 " + booking.end_time,
                      "YYYY-MM-DD HH:mm:ss"
                    ).format("HH:mm") +
                    ` (${booking.services.reduce(
                      (sum, i) => (sum += i.estimated_duration),
                      0
                    )} minutes)`
                  }
                />
              </div>
            </div>
            <div className="flex mb-4 justify-between">
              <div className="flex flex-col w-[495px]">
                <RowField
                  label={"Pet's name"}
                  value={
                    <div className="flex">
                      {booking.dataPet.photo && (
                        <div className="h-6 w-6 mr-2">
                          <img
                            className="h-full w-full object-cover rounded-full"
                            src={booking.dataPet.photo}
                            alt="pet_avt"
                          />
                        </div>
                      )}
                      <span
                        onClick={() => handleChange("recVisible", true)}
                        className="text-purple-600 cursor-pointer hover:underline hover:underline-offset-3 font-semibold"
                      >
                        {booking.dataPet.name_pet}
                      </span>
                    </div>
                  }
                />
                <RowField
                  label={"Owner"}
                  value={
                    <div className="flex">
                      <div className="h-6 w-6 mr-2">
                        {booking.dataUser.avatar ? (
                          <img
                            className="h-full w-full object-cover rounded-full"
                            src={booking.dataUser.avatar}
                            alt="pet_avt"
                          />
                        ) : (
                          <NoAvatar
                            style={{ fontSize: 8 }}
                            name={booking.dataUser.fullName}
                          />
                        )}
                      </div>
                      <span>{booking.dataUser.fullName}</span>
                    </div>
                  }
                />
                <RowField
                  label={"Gender"}
                  value={
                    booking.dataPet.gender ? (
                      <div className="flex items-center">
                        <div className="h-6 w-6 mr-2 flex justify-center items-center">
                          <FaMars color="#247CFF" />
                        </div>
                        Male
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <div className="h-6 w-6 mr-2 flex justify-center items-center">
                          <FaVenus color="#FC5A5A" />
                        </div>
                        Female
                      </div>
                    )
                  }
                />
              </div>
              <div className="flex flex-col w-[495px]">
                <RowField
                  label={"Date of birth"}
                  value={moment(booking.dataPet.date_of_birth).format(
                    "MMMM DD, YYYY"
                  )}
                />
                <RowField
                  label={"Weight & size"}
                  value={`${booking.dataPet.size} / ${booking.dataPet.weight} kg`}
                />
                <RowField
                  label={"Neutered"}
                  value={
                    <input
                      type="checkbox"
                      className="cursor-not-allowed"
                      checked={booking.dataPet.is_neutered}
                      disabled
                    />
                  }
                />
              </div>
            </div>
            {booking.status === "confirmed" && (
              <>
                <RowField
                  label={"diagnosis"}
                  value={
                    <ModalTextarea
                      disabled={booking.status !== "confirmed"}
                      placeholder="diagnosis"
                      register={register("diagnosis")}
                    />
                  }
                />
                <RowField
                  label={"symptoms"}
                  value={
                    <ModalTextarea
                      disabled={booking.status !== "confirmed"}
                      placeholder="symptoms"
                      register={register("symptoms")}
                    />
                  }
                />
                <RowField
                  label={"treatment plan"}
                  value={
                    <ModalTextarea
                      disabled={booking.status !== "confirmed"}
                      placeholder="treatment plan"
                      register={register("treatment_plan")}
                    />
                  }
                />
              </>
            )}
            <RowField
              label={"Services"}
              value={booking.services.map((service, i) => {
                return (
                  <div
                    key={i}
                    className="flex justify-between bg-lg-blue p-2 mb-2"
                  >
                    <p>
                      {`${service.name_service} (${service.estimated_duration} min)`}
                    </p>
                    <p>{service.price}</p>
                  </div>
                );
              })}
            />
            {state.vaccines.length > 0 && booking.status === "confirmed" && (
              <RowField
                label={"Vaccine"}
                value={
                  <div className="flex">
                    <ModalSelect
                      disabled={booking.status !== "confirmed"}
                      value={state.vaccine_id.toString()}
                      register={register("vaccine_id", {
                        required: true,
                        onChange(event) {
                          handleChange("vaccine_id", event.target.value);
                        },
                      })}
                    >
                      {state.vaccines.map((vac, i) => {
                        return (
                          <option key={i} value={vac.id}>
                            {`${vac.type_disease} - ${vac.name_vaccine}`}
                          </option>
                        );
                      })}
                    </ModalSelect>
                    <div className="p-2 h-full bg-lg-blue w-[100px] text-right">
                      {state.vaccines.find((v) => v.id == state.vaccine_id)
                        ?.price || state.vaccines[0]?.price}
                    </div>
                  </div>
                }
              />
            )}
            {booking.status === "confirmed" && (
              <RowField
                label={"Medicines"}
                value={
                  <div>
                    {state.curMeds.map((med, i) => {
                      return (
                        <div
                          key={i}
                          className="flex justify-between items-center bg-lg-blue p-2 mb-2"
                        >
                          <div className="flex items-center">
                            <Button
                              type="button"
                              btnType="danger"
                              style={{ marginRight: 8, padding: 2 }}
                              onClick={() =>
                                handleChange(
                                  "curMeds",
                                  state.curMeds.filter((m) => m.id !== med.id)
                                )
                              }
                            >
                              <FaXmark />
                            </Button>
                            <p>{med.name_medicine}</p>
                          </div>
                          <p>{med.price}</p>
                        </div>
                      );
                    })}
                    <Button
                      type="button"
                      style={{ width: "100%" }}
                      btnType="primary"
                      onClick={() => handleChange("medVisible", true)}
                    >
                      <div className="flex justify-center">
                        <FaPlus />
                      </div>
                    </Button>
                  </div>
                }
              />
            )}
            {booking.status === "confirmed" && (
              <RowField
                label={"TOTAL BILL"}
                value={
                  <p className="text-right font-bold p-2">
                    {state.totalPrice.toLocaleString()}
                  </p>
                }
              />
            )}
          </div>
        )}
      </ModalForm>
      <MedicineChooseModal
        visible={state.medVisible}
        onClose={() => handleChange("medVisible", false)}
        appendMedicine={(medicine: Medicine) => appendMedicine(medicine)}
      />
      <ModalAction
        onClose={() => handleChange("confirmVisible", false)}
        visible={state.confirmVisible}
        onSubmit={handleSubmit(onSubmit)}
        message="Do you want to finish this booking?"
        type="confirm"
      />
      <PetRecordModal
        visible={state.recVisible}
        onClose={() => handleChange("recVisible", false)}
        id={booking.pet_id}
        petName={booking.dataPet.name_pet}
      />
    </>
  );
};

export default BookingDetailModal;
