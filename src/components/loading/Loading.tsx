import React from "react";
import { HashLoader } from "react-spinners";

type LoadingProp = {
  color?: string;
  size?: number;
};

export const Loading: React.FC<LoadingProp> = ({ color, size }) => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <HashLoader size={size || 70} color={color || "#247CFF"} />
    </div>
  );
};
