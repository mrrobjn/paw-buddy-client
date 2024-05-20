import { UseFormRegisterReturn } from "react-hook-form";

type Props = {
  children: React.ReactNode;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  defaultValue?: string | number | readonly string[] | undefined;
  register?: UseFormRegisterReturn;
  value?: string;
  disabled?: boolean;
  className?: string;
};

export const ModalSelect: React.FC<Props> = ({
  defaultValue,
  children,
  onChange,
  register,
  value,
  disabled,
  className,
}) => {
  return (
    <select
      disabled={disabled}
      onChange={onChange}
      value={value}
      defaultValue={defaultValue}
      className={`w-full p-2 focus:border-b-primary transition-all border-b-2 outline-none bg-lg-blue disabled:cursor-not-allowed disabled:border-white ${className}`}
      {...register}
    >
      {children}
    </select>
  );
};
