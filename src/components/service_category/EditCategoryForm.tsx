import { SubmitHandler, useForm } from "react-hook-form";
import ModalForm from "../form/ModalForm";
import { ModalInput } from "../form/ModalInput";
import { RowField } from "../form/RowField";
import { useEffect, useState } from "react";
import { apiUpdateCategory } from "@/apis";
import { Loading } from "../loading/Loading";

interface Props {
  visible: boolean;
  onClose: Function;
  handleSuccess?: Function;
  category: ServiceCategory;
}

interface State {
  isLoading: boolean;
  error: string;
}

const EditCategoryForm: React.FC<Props> = ({
  visible,
  onClose,
  handleSuccess,
  category,
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

  useEffect(() => {
    reset({ ...category, image: null });
  }, [category]);

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

  const onSubmit: SubmitHandler<CategoryField> = async (data) => {
    try {
      handleChange("isLoading", true);
      handleChange("error", "");

      const formData = new FormData();
      if (data.image !== null && data.image !== undefined) {
        formData.append("image", data.image[0]);
      }
      formData.append("type_service", data.type_service);

      const resData = await apiUpdateCategory(category.id, formData);
      if (resData.success) {
        handleSuccess && (await handleSuccess());
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
      title={`category / ${category.type_service}`}
      onSubmit={handleSubmit(onSubmit)}
      error={state.error}
    >
      {state.isLoading ? (
        <div className="w-[538px] h-[238px]">
          <Loading />
        </div>
      ) : (
        <div className="p-3">
          <RowField
            required
            label="photo"
            value={
              <>
                <div className="w-[100px] h-[100px] mb-2 relative">
                  <img
                    className="object-cover h-full w-full rounded-full border-2 border-primary"
                    src={category.image !== "undefined" ? category.image : ""}
                    alt=""
                  />
                  <label
                    htmlFor="cate_img"
                    className="cursor-pointer hover:bg-secondary hover:opacity-40 absolute top-0 bottom-0 right-0 left-0"
                  ></label>
                </div>
                <ModalInput
                  type="file"
                  id="cate_img"
                  register={register("image")}
                />
              </>
            }
          />
          <RowField
            required
            label="Name"
            value={
              <ModalInput
                type="text"
                placeholder="name of service category"
                defaultValue={category.type_service}
                register={register("type_service", { required: true })}
              />
            }
          />
        </div>
      )}
    </ModalForm>
  );
};

export default EditCategoryForm;
