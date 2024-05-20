import React, { CSSProperties, ReactNode } from "react";

type ButtonProp = {
  children: string | ReactNode;
  onClick?: Function;
  btnType: "primary" | "secondary" | "warning" | "danger" | "disable";
  type?: "submit" | "reset" | "button";
  style?: CSSProperties | undefined;
  disable?: boolean;
  round?: boolean;
};

export const Button: React.FC<ButtonProp> = ({
  children,
  onClick,
  btnType,
  type,
  style,
  disable,
  round,
}) => {
  const buttonStyle =
    btnType == "primary"
      ? "bg-primary text-white hover:opacity-80 border-primary"
      : btnType == "danger"
      ? "bg-subtle-danger text-white hover:opacity-80 border-danger"
      : btnType == "disable"
      ? "bg-disable text-white hover:opacity-80 border-disable"
      : "text-blue border-primary";

  const handleClick = () => {
    onClick && onClick();
  };

  return (
    <button
      style={style}
      type={type}
      className={`w-fit p-2 font-bold border-[2px] disabled:cursor-not-allowed transition-all ${buttonStyle} ${
        round ? "rounded-full" : "rounded-md"
      }`}
      onClick={handleClick}
      disabled={disable}
    >
      {children}
    </button>
  );
};
