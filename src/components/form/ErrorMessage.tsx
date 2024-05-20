import { CSSProperties, ReactNode } from "react";

export const ErrorMessage = ({
  children,
  style
}: {
  children?: string | ReactNode;
  style?:CSSProperties
}) => {
  return (
    <p style={style} className="text-danger bg-danger border-danger border-[1px] rounded-lg p-3 transition-all">
      {children}
    </p>
  );
};
