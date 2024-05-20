import { MouseEventHandler, ReactNode } from "react";

export const TableRow = ({
  children,
  onClick,
  onMouseEnter,
  onMouseLeave,
}: {
  children: ReactNode;
  onClick?: MouseEventHandler;
  onMouseEnter?: MouseEventHandler;
  onMouseLeave?: MouseEventHandler;
}) => {
  return (
    <tr
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="border-t-[1px] hover:shadow-md cursor-pointer"
    >
      {children}
    </tr>
  );
};
