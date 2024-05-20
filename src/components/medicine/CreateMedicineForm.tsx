import { SubmitHandler, useForm } from "react-hook-form";
import ModalForm from "../form/ModalForm";
import { ModalInput } from "../form/ModalInput";
import { RowField } from "../form/RowField";
import { Loading } from "../loading/Loading";
import { useState } from "react";
import { ModalTextarea } from "../form/ModalTextarea";
import { apiCreateMedicine } from "@/apis";

interface Props {
  visible: boolean;
  onClose: Function;
  handleSuccess?: Function;
}

interface State {
  isLoading: boolean;
  error: string;
}

const CreateMedicineForm: React.FC<Props> = ({
  visible,
  onClose,
  handleSuccess,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Medicine>();
  const [state, setState] = useState<State>({
    isLoading: false,
    error: "",
  });

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

  const onSubmit: SubmitHandler<Medicine> = async (data) => {
    try {
      handleChange("isLoading", true);
      const resData = await apiCreateMedicine(data);
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
      title="Create medicine"
      error={state.error}
      onSubmit={handleSubmit(onSubmit)}
    >
      {state.isLoading ? (
        <div className="w-[895px] h-[600px]">
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
                    placeholder="medicine name"
                    register={register("name_medicine", { required: true })}
                  />
                }
              />
              <RowField
                required
                label="unit"
                value={
                  <ModalInput
                    placeholder="unit"
                    register={register("unit", { required: true })}
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
            </div>
          </div>
          <RowField
            required
            label="contraindication"
            value={
              <ModalTextarea
                placeholder="contraindication"
                register={register("contraindication", { required: true })}
              />
            }
          />
          <RowField
            required
            label="ingredient"
            value={
              <ModalTextarea
                placeholder="ingredient"
                register={register("ingredient", { required: true })}
              />
            }
          />
          <RowField
            required
            label="intended use"
            value={
              <ModalTextarea
                placeholder="intended use"
                register={register("intended_use", { required: true })}
              />
            }
          />
          <RowField
            required
            label="indication"
            value={
              <ModalTextarea
                placeholder="indication"
                register={register("indication", { required: true })}
              />
            }
          />
          <RowField
            required
            label="guide"
            value={
              <ModalTextarea
                placeholder="guide"
                register={register("guide", { required: true })}
              />
            }
          />
          <RowField
            required
            label="side effect"
            value={
              <ModalTextarea
                placeholder="side effect"
                register={register("side_effect", { required: true })}
              />
            }
          />
        </div>
      )}
    </ModalForm>
  );
};

export default CreateMedicineForm;
