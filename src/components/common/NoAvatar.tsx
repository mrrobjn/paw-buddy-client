import { getFirstCharacters } from "@/utils";
import { CSSProperties } from "react";

interface Props {
  name: string | undefined | null;
  style?: CSSProperties;
}

export const NoAvatar: React.FC<Props> = ({ name, style }) => {
  return (
    <div
      style={style}
      className="rounded-full w-full uppercase h-full bg-green-100 text-success border-[1px] font-bold flex justify-center items-center"
    >
      {name ? getFirstCharacters(name) : "N"}
    </div>
  );
};
