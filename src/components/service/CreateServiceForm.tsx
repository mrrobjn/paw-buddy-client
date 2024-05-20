"use client";
import { useState } from "react";
import ModalForm from "../form/ModalForm";
import { ModalInput } from "../form/ModalInput";
import { ModalSelect } from "../form/ModalSelect";
import { ModalTextarea } from "../form/ModalTextarea";
import { RowField } from "../form/RowField";
import { SubmitHandler, useForm } from "react-hook-form";
import { apiCreateService } from "@/apis/service";
import { Loading } from "../loading/Loading";

interface Props {
  categories: ServiceCategory[];
  visible: boolean;
  onClose: Function;
  handleSuccess?: Function;
}

interface State {
  isLoading: boolean;
  error: string;
}

const CreateServiceForm: React.FC<Props> = ({
  visible,
  onClose,
  categories,
  handleSuccess,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EditServiceField>();
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
    handleChange("photo", undefined);
    reset()
  };

  const onSubmit: SubmitHandler<EditServiceField> = async (data) => {
    try {
      handleChange("isLoading", true);
      handleChange("error", "");

      const formData = new FormData();
      formData.append("photo", data.file[0]);
      formData.append("name_service", data.name_service);
      formData.append("estimated_duration", data.estimated_duration.toString());
      formData.append("category_id", data.category_id.toString());
      formData.append("price", data.price.toString());
      formData.append("description", data.description);
      formData.append("note", data.note);
      const resData = await apiCreateService(formData);
      if (resData.success) {
        handleSuccess && (await handleSuccess());
        handleClose();
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
      title="New Service"
      footer={!state.isLoading}
      onSubmit={handleSubmit(onSubmit)}
      error={state.error}
    >
      {state.isLoading ? (
        <div className="w-[1036px] h-[462px]">
          <Loading />
        </div>
      ) : (
        <>
          <div className="p-3 flex">
            <div className="flex flex-col w-[500px]">
              <RowField
                label="Photo"
                required
                value={
                  <ModalInput
                    id="service_img"
                    type="file"
                    accept=".jpg, .png"
                    register={register("file", { required: true })}
                  />
                }
              />
              <RowField
                label="Name"
                required
                value={
                  <ModalInput
                    type="text"
                    placeholder="Service name"
                    register={register("name_service", {
                      required: true,
                    })}
                  />
                }
              />
              <RowField
                label="Duration (minutes)"
                required
                value={
                  <ModalInput
                    type="number"
                    register={register("estimated_duration", {
                      required: true,
                    })}
                  />
                }
              />
            </div>
            <div className="flex flex-col w-[500px] ml-3">
              <RowField
                required
                label={<span>Price</span>}
                value={
                  <ModalInput
                    type="number"
                    register={register("price", { required: true })}
                  />
                }
              />
              <RowField
                required
                label="Category"
                value={
                  <ModalSelect
                    register={register("category_id", { required: true })}
                  >
                    {categories.map((category, i) => (
                      <option key={i} value={category.id}>
                        {category.type_service}
                      </option>
                    ))}
                  </ModalSelect>
                }
              />
              <RowField
                label="Note"
                value={
                  <ModalTextarea
                    register={register("note", { required: true })}
                  />
                }
              />
            </div>
          </div>
          <div className="p-3">
            <RowField
              label="Description"
              value={
                <ModalTextarea
                  register={register("description", { required: true })}
                />
              }
            />
          </div>
        </>
      )}
    </ModalForm>
  );
};

export default CreateServiceForm;
