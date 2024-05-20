"use client";
import { useEffect, useState } from "react";
import ModalForm from "../form/ModalForm";
import { ModalInput } from "../form/ModalInput";
import { ModalSelect } from "../form/ModalSelect";
import { ModalTextarea } from "../form/ModalTextarea";
import { RowField } from "../form/RowField";
import { SubmitHandler, useForm } from "react-hook-form";
import { apiUpdateService } from "@/apis/service";
import { Loading } from "../loading/Loading";

interface Props {
  service: PetService;
  categories: ServiceCategory[];
  visible: boolean;
  onClose: Function;
  handleSuccess?: Function;
}

interface State {
  isLoading: boolean;
  error: string;
}

const EditServiceForm: React.FC<Props> = ({
  visible,
  onClose,
  service,
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

  useEffect(() => {
    reset({ ...service, file: null });
  }, [service]);

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

  const onSubmit: SubmitHandler<EditServiceField> = async (data) => {
    try {
      handleChange("isLoading", true);
      handleChange("error", "");

      const formData = new FormData();
      if (data.file !== null && data.file !== undefined) {
        formData.append("photo", data.file[0]);
      }
      formData.append("name_service", data.name_service);
      formData.append("estimated_duration", data.estimated_duration.toString());
      formData.append("category_id", data.category_id.toString());
      formData.append("price", data.price.toString());
      formData.append("description", data.description);
      formData.append("note", data.note);

      const resData = await apiUpdateService(service.id, formData);
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
      title="service detail"
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
                  <>
                    <div className="w-[100px] h-[100px] mb-2 relative">
                      <img
                        className="object-cover h-full w-full rounded-full border-2 border-primary"
                        src={service.photo !== "undefined" ? service.photo : ""}
                        alt=""
                      />
                      <label
                        htmlFor="service_img"
                        className="cursor-pointer hover:bg-secondary hover:opacity-40 absolute top-0 bottom-0 right-0 left-0"
                      ></label>
                    </div>
                    <ModalInput
                      id="service_img"
                      type="file"
                      accept=".jpg, .png"
                      register={register("file")}
                    />
                  </>
                }
              />
              <RowField
                label="Name"
                required
                value={
                  <ModalInput
                    type="text"
                    defaultValue={service.name_service}
                    placeholder="Service name"
                    register={register("name_service", {
                      required: true,
                    })}
                  />
                }
              />
            </div>
            <div className="flex flex-col w-[500px] ml-3">
              <RowField
                label="Duration (minutes)"
                required
                value={
                  <ModalInput
                    type="number"
                    defaultValue={service.estimated_duration}
                    register={register("estimated_duration", {
                      required: true,
                    })}
                  />
                }
              />
              <RowField
                required
                label={<span>Price</span>}
                value={
                  <ModalInput
                    type="number"
                    defaultValue={service.price}
                    register={register("price", { required: true })}
                  />
                }
              />
              <RowField
                required
                label="Category"
                value={
                  <ModalSelect
                    defaultValue={service.category_id}
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
                    defaultValue={service.note}
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
                  defaultValue={service.description}
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

export default EditServiceForm;
