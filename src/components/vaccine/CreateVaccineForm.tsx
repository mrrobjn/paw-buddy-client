import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { ModalTextarea } from "../form/ModalTextarea";
import { RowField } from "../form/RowField";
import ModalForm from "../form/ModalForm";
import { Loading } from "../loading/Loading";
import { ModalInput } from "../form/ModalInput";
import { ModalSelect } from "../form/ModalSelect";
import { apiCreateVaccine, apiGetAllService } from "@/apis";

interface Props {
  visible: boolean;
  onClose: Function;
  handleSuccess?: Function;
}

interface State {
  isLoading: boolean;
  error: string;
  services: PetService[];
}

const CreateVaccineForm: React.FC<Props> = ({
  visible,
  onClose,
  handleSuccess,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Vaccine>();
  const [state, setState] = useState<State>({
    isLoading: false,
    error: "",
    services: [],
  });

  useEffect(() => {
    if (visible) {
      getServices();
    }
  }, [visible]);

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
    reset();
  };

  const onSubmit: SubmitHandler<Vaccine> = async (data) => {
    try {
      handleChange("isLoading", true);
      const resData = await apiCreateVaccine(data);
      if (resData.success) {
        handleSuccess && (await handleSuccess());
        handleClose();
        handleChange("error", "");
      } else {
        handleChange("error", "Error: Something wrong");
      }
    } catch (error: any) {
      handleChange("error", "Error: Something wrong");
    }
    handleChange("isLoading", false);
  };

  return (
    <ModalForm
      visible={visible}
      onClose={onClose}
      footer={!state.isLoading}
      title="create vaccine"
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
                    placeholder="vaccine name"
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
                    register={register("stock", { required: true })}
                  />
                }
              />
              <RowField
                required
                label="service"
                value={
                  <ModalSelect
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
                  register={register("vaccination_schedule", {
                    required: true,
                  })}
                />
              }
            />
            <RowField
              label="note"
              value={
                <ModalTextarea placeholder="note" register={register("note")} />
              }
            />
          </div>
        </div>
      )}
    </ModalForm>
  );
};

export default CreateVaccineForm;
