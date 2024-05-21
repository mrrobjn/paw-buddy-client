"use client";
import moment from "moment";
import ModalForm from "../form/ModalForm";
import { ModalSelect } from "../form/ModalSelect";
import { RowField } from "../form/RowField";
import { FaMars, FaMinus, FaPlus, FaVenus } from "react-icons/fa6";
import { Button } from "../common/Button";
import { useEffect, useState } from "react";
import MedicineChooseModal from "./MedicineChooseModal";
import { apiApproveBooking, apiCancelBooking } from "@/apis";
import ModalAction from "../form/ModalAction";
import PetRecordModal from "./PetRecordModal";

interface Props {
  visible: boolean;
  booking: Booking;
  onClose: Function;
  changeStatus: Function;
  fetchBooking: Function;
}

interface State {
  medVisible: boolean;
  confirmVisible: boolean;
  warningVisible: boolean;
  recVisible: boolean;
  curMeds: Medicine[];
  totalPrice: number;
  error: string;
}

const initState: State = {
  medVisible: false,
  curMeds: [],
  totalPrice: 0,
  error: "",
  confirmVisible: false,
  warningVisible: false,
  recVisible: false,
};

const BookingDetailModal: React.FC<Props> = ({
  visible,
  booking,
  onClose,
  changeStatus,
  fetchBooking,
}) => {
  const [state, setState] = useState<State>(initState);

  useEffect(() => {
    let totalPrice = state.totalPrice;
    totalPrice = booking.services.reduce(
      (sum, item) => sum + parseInt(item.price),
      0
    );
    totalPrice +=
      state.curMeds &&
      state.curMeds.reduce(
        (sum, item) => sum + parseInt(item.price) * item.amount,
        0
      );
    handleChange("totalPrice", totalPrice);
  }, [state.curMeds, visible]);

  const handleChange = (name: string, value: any) => {
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleClose = () => {
    onClose();
    setState(initState);
  };

  const increaseAmount = (i: number) => {
    const updatedMeds = [...state.curMeds];
    const clonedMed = { ...updatedMeds[i] };
    if (clonedMed.stock !== clonedMed.amount) {
      clonedMed.amount += 1;
      updatedMeds[i] = clonedMed;
      handleChange("curMeds", updatedMeds);
    }
  };

  const descreaseAmount = (i: number) => {
    const updatedMeds = [...state.curMeds];
    const clonedMed = { ...updatedMeds[i] };
    if (clonedMed.amount === 1) {
      updatedMeds.splice(i);
      handleChange("curMeds", updatedMeds);
    } else {
      clonedMed.amount -= 1;
      updatedMeds[i] = clonedMed;
      handleChange("curMeds", updatedMeds);
    }
  };

  const appendMedicine = (medicine: Medicine) => {
    const existed = state.curMeds.findIndex((m) => m.id === medicine.id);
    if (existed !== -1) {
      increaseAmount(existed);
    } else {
      handleChange("curMeds", [...state.curMeds, medicine]);
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
          await fetchBooking();
          handleChange("error", initState.error);
        } else {
          handleChange("error", resData.mess);
        }
      } else if (value === "cancelled") {
        const resData = await apiCancelBooking(booking.id);
        if (resData.success) {
          changeStatus(value);
          await fetchBooking();
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
                        booking.status === "finished" ||
                        booking.status === "cancelled"
                      }
                      className="font-bold"
                    >
                      {booking.status === "pending" && (
                        <option value="pending">Pending</option>
                      )}
                      <option value="confirmed">Confirmed</option>
                      {booking.status === "finished" && (
                        <option value="finished">Finished</option>
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
                <RowField label={"Owner"} value={booking.dataUser.fullName} />
                <RowField
                  label={"Gender"}
                  value={
                    booking.dataPet.gender ? (
                      <div className="flex items-center">
                        <FaMars style={{ marginRight: 8 }} color="#247CFF" />
                        Male
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <FaVenus style={{ marginRight: 8 }} color="#FC5A5A" />
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
                  value={
                    booking.dataPet.size + " " + booking.dataPet.weight + "kg"
                  }
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
            <div>
              <h1 className="font-semibold">Services</h1>
              {booking.services.map((service, i) => {
                return (
                  <div
                    key={i}
                    className="flex justify-between bg-lg-blue p-2 mt-2 rounded-lg"
                  >
                    <p>
                      {service.name_service +
                        " (" +
                        service.estimated_duration +
                        " min)"}
                    </p>
                    <p>{service.price}</p>
                  </div>
                );
              })}
            </div>
            <div className={`mt-2`}>
              {(booking.status === "confirmed" ||
                booking.status === "finished") && (
                <h1 className="font-semibold">Prescribe medicine</h1>
              )}

              <div className="mt-2">
                {booking.status &&
                  state.curMeds.map((med, i) => {
                    return (
                      <div
                        key={i}
                        className="flex justify-between items-center bg-lg-blue p-2 mb-2 rounded-lg"
                      >
                        <div>
                          <p className="mb-2">{med.name_medicine}</p>
                          <div className="flex">
                            <button
                              className="px-2"
                              type="button"
                              onClick={() => descreaseAmount(i)}
                            >
                              <FaMinus size={12} />
                            </button>
                            <p className="mx-2 bg-secondary px-2 rounded transition-all">
                              {med.amount}
                            </p>
                            <button
                              className="px-2"
                              type="button"
                              onClick={() => increaseAmount(i)}
                            >
                              <FaPlus size={12} />
                            </button>
                          </div>
                        </div>
                        <p>{parseInt(med.price) * med.amount}</p>
                      </div>
                    );
                  })}
                {booking.status === "confirmed" && (
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
                )}
              </div>
            </div>
            <div className="flex justify-between pr-2 py-2 mt-2 font-bold">
              <p>TOTAL BILL</p>
              <p>{state.totalPrice.toLocaleString()}</p>
            </div>
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
        onSubmit={() => console.log(1)}
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
