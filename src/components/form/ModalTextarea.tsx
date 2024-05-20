import { UseFormRegisterReturn } from "react-hook-form";

type Props = {
  defaultValue?: string | number | readonly string[] | undefined;
  register?: UseFormRegisterReturn;
  placeholder?: string;
  value?: any;
};

export const ModalTextarea: React.FC<Props> = ({
  value,
  defaultValue,
  register,
  placeholder,
}) => {
  return (
    <textarea
      value={value}
      className="p-2 resize-none w-full border-b-2 outline-none focus:border-b-primary transition-all bg-lg-blue"
      defaultValue={defaultValue}
      placeholder={placeholder}
      {...register}
    />
  );
};
