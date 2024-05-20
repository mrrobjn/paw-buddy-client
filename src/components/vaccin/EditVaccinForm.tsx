import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import ModalForm from "../form/ModalForm";
import { Loading } from "../loading/Loading";
import { RowField } from "../form/RowField";
import { ModalInput } from "../form/ModalInput";
import { ModalTextarea } from "../form/ModalTextarea";
import { apiGetAllService } from "@/apis";
import { ModalSelect } from "../form/ModalSelect";
import { apiUpdateVaccin } from "@/apis/vaccin";

interface Props {
  visible: boolean;
  onClose: Function;
  handleSuccess?: Function;
  vaccin: Vaccine;
}

interface State {
  services: PetService[];
  isLoading: boolean;
  error: string;
}

const EditVaccinForm: React.FC<Props> = ({
  visible,
  onClose,
  vaccin,
  handleSuccess,
}) => {
  const [state, setState] = useState<State>({
    isLoading: false,
    error: "",
    services: [],
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Vaccine>();

  useEffect(() => {
    reset({ ...vaccin, expiry_date: vaccin.expiry_date.split("T")[0] });
    getServices();
  }, [vaccin]);

  const getServices = async () => {
    try {
      const resData = await apiGetAllService({});
      if (resData.success) {
        handleChange("services", resData.data);
      }
    } catch (error) {}
  };

  const handleChange = (name: string, value: any) => {
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleClose = () => {
    onClose();
    handleChange("error", "");
  };

  const onSubmit: SubmitHandler<Vaccine> = async (data) => {
    try {
      handleChange("isLoading", true);
      const resData = await apiUpdateVaccin(vaccin.id, data);
      if (resData.success) {
        handleSuccess && (await handleSuccess());
        handleChange("error", "");
        handleClose();
      } else {
        handleChange("error", "Error: Something wrong");
      }
    } catch (error: any) {
      handleChange("error", "Error: Something wrong");
      console.error(error);
    }
    handleChange("isLoading", false);
  };

  return (
    <ModalForm
      visible={visible}
      onClose={onClose}
      footer={!state.isLoading}
      title={`vaccin / ${vaccin.name_vaccine}`}
      error={state.error}
      onSubmit={handleSubmit(onSubmit)}
    >
      {state.isLoading ? (
        <div className="w-[880px] h-[444px]">
          <Loading />
        </div>
      ) : (
        <div className="p-3">
          <div className="flex mb-2">
            <div className="mr-3">
              <RowField
                required
                label="name"
                value={
                  <ModalInput
                    placeholder="vaccin name"
                    defaultValue={vaccin.name_vaccine}
                    register={register("name_vaccine", { required: true })}
                  />
                }
              />
              <RowField
                required
                label="expire date"
                value={
                  <ModalInput
                    type="date"
                    placeholder="expire date"
                    defaultValue={vaccin.expiry_date.split("T")[0]}
                    register={register("expiry_date", { required: true })}
                  />
                }
              />
              <RowField
                required
                label="doses"
                value={
                  <ModalInput
                    type="number"
                    placeholder="doses"
                    defaultValue={vaccin.number_of_doses}
                    register={register("number_of_doses", { required: true })}
                  />
                }
              />
            </div>
            <div>
              <RowField
                required
                label="price"
                value={
                  <ModalInput
                    type="number"
                    placeholder="price"
                    defaultValue={vaccin.price}
                    register={register("price", { required: true })}
                  />
                }
              />
              <RowField
                required
                label="stock"
                value={
                  <ModalInput
                    type="number"
                    placeholder="stock"
                    defaultValue={vaccin.stock}
                    register={register("stock", { required: true })}
                  />
                }
              />
              <RowField
                required
                label="service"
                value={
                  <ModalSelect
                    defaultValue={vaccin.service_id}
                    register={register("service_id", { required: true })}
                  >
                    {state.services.map((s, i) => (
                      <option key={i} value={s.id}>{s.name_service}</option>
                    ))}
                  </ModalSelect>
                }
              />
            </div>
          </div>
          <div>
            <RowField
              required
              label="type disease"
              value={
                <ModalInput
                  placeholder="type disease"
                  defaultValue={vaccin.type_disease}
                  register={register("type_disease", { required: true })}
                />
              }
            />
            <RowField
              required
              label="side effect"
              value={
                <ModalInput
                  placeholder="side effect"
                  defaultValue={vaccin.side_effect}
                  register={register("side_effect", { required: true })}
                />
              }
            />
            <RowField
              required
              label="schedule"
              value={
                <ModalTextarea
                  placeholder="schedule"
                  defaultValue={vaccin.vaccination_schedule}
                  register={register("vaccination_schedule", {
                    required: true,
                  })}
                />
              }
            />
            <RowField
              label="note"
              value={
                <ModalTextarea
                  placeholder="note"
                  defaultValue={vaccin.note || ""}
                  register={register("note")}
                />
              }
            />
          </div>
        </div>
      )}
    </ModalForm>
  );
};

export default EditVaccinForm;
