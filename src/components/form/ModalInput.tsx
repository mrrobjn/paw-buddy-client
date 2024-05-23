"use client";
import {
  CSSProperties,
  ChangeEventHandler,
  HTMLInputTypeAttribute,
} from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface ModalInputProp {
  type?: HTMLInputTypeAttribute;
  defaultValue?: string | number | readonly string[] | undefined;
  placeholder?: string;
  accept?: string;
  style?: CSSProperties;
  id?: string;
  register?: UseFormRegisterReturn;
  value?: any;
  onchange?: ChangeEventHandler | any;
  min?: string|number;
}

export const ModalInput: React.FC<ModalInputProp> = ({
  type,
  placeholder,
  accept,
  style,
  id,
  register,
  defaultValue,
  value,
  onchange,
  min,
}) => {
  return (
    <input
      id={id}
      type={type || "text"}
      placeholder={placeholder}
      className={`w-full p-2 focus:border-b-primary transition-all border-b-2 outline-none bg-lg-blue ${
        type === "file" && "p-0"
      }`}
      accept={accept || ".jpg,.png"}
      style={style}
      defaultValue={defaultValue}
      value={value}
      onChange={onchange}
      step="any"
      min={min}
      {...register}
    />
  );
};
