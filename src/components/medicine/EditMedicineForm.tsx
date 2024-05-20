import { useEffect, useState } from "react";
import ModalForm from "../form/ModalForm";
import { RowField } from "../form/RowField";
import { ModalInput } from "../form/ModalInput";
import { ModalTextarea } from "../form/ModalTextarea";
import { SubmitHandler, useForm } from "react-hook-form";
import { apiUpdateMedicine } from "@/apis";
import { Loading } from "../loading/Loading";

interface Props {
  visible: boolean;
  onClose: Function;
  handleSuccess?: Function;
  medicine: Medicine;
}

interface State {
  isLoading: boolean;
  error: string;
}

const EditMedicineForm: React.FC<Props> = ({
  visible,
  onClose,
  medicine,
  handleSuccess,
}) => {
  const [state, setState] = useState<State>({
    isLoading: false,
    error: "",
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Medicine>();

  useEffect(() => {
    reset({ ...medicine, expiry_date: medicine.expiry_date.split("T")[0] });
  }, [medicine]);

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

  const onSubmit: SubmitHandler<Medicine> = async (data) => {
    try {
      handleChange("isLoading", true);
      const resData = await apiUpdateMedicine(medicine.id, data);
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
      title={`medicine / ${medicine.name_medicine}`}
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
                    defaultValue={medicine.name_medicine}
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
                    defaultValue={medicine.unit}
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
                    defaultValue={medicine.expiry_date.split("T")[0]}
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
                    defaultValue={medicine.price}
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
                    defaultValue={medicine.stock}
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
                defaultValue={medicine.contraindication}
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
                defaultValue={medicine.ingredient}
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
                defaultValue={medicine.intended_use}
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
                defaultValue={medicine.indication}
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
                defaultValue={medicine.guide}
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
                defaultValue={medicine.side_effect}
                register={register("side_effect", { required: true })}
              />
            }
          />
        </div>
      )}
    </ModalForm>
  );
};

export default EditMedicineForm;
