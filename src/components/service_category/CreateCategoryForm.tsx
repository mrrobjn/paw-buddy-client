import { SubmitHandler, useForm } from "react-hook-form";
import ModalForm from "../form/ModalForm";
import { ModalInput } from "../form/ModalInput";
import { RowField } from "../form/RowField";
import { useState } from "react";
import { apiCreateCategory } from "@/apis";
import { Loading } from "../loading/Loading";

interface Props {
  visible: boolean;
  onClose: Function;
  handleSuccess?: Function;
}

interface State {
  isLoading: boolean;
  error: string;
}

const CreateCategoryForm: React.FC<Props> = ({
  visible,
  onClose,
  handleSuccess,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CategoryField>();
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
    handleChange("image", undefined);
    reset();
  };

  const onSubmit: SubmitHandler<CategoryField> = async (data) => {
    try {
      handleChange("isLoading", true);
      
      const formData = new FormData();
      formData.append("image", data.image[0]);
      formData.append("type_service", data.type_service);
      const resData = await apiCreateCategory(formData);
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
      onClose={handleClose}
      footer={!state.isLoading}
      error={state.error}
      title="Create new service category"
      onSubmit={handleSubmit(onSubmit)}
    >
      {state.isLoading ? (
        <div className="w-[538px] h-[130px]">
          <Loading />
        </div>
      ) : (
        <div className="p-3">
          <RowField
            required
            label="photo"
            value={
              <ModalInput
                type="file"
                register={register("image", { required: true })}
              />
            }
          />
          <RowField
            required
            label="Name"
            value={
              <ModalInput
                placeholder="name of service category"
                register={register("type_service", { required: true })}
              />
            }
          />
        </div>
      )}
    </ModalForm>
  );
};

export default CreateCategoryForm;
