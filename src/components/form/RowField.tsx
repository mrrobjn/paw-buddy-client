import { ReactNode } from "react";

export const RowField: React.FC<{
  label: string | ReactNode;
  value: string | number | ReactNode;
  required?: boolean;
}> = ({ label, value, required }) => {
  return (
    <div className="flex flex-1">
      <div className="font-semibold w-[150px] pb-3 pr-2 border-r-2 capitalize">
        {label}
        {required && <span className="text-danger">*</span>}
      </div>
      <div className="text-90 ml-2 flex-1 mb-2">{value}</div>
    </div>
  );
};
