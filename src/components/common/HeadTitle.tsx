import React, { CSSProperties } from "react";

type IProps = {
  children: string;
  style?: CSSProperties | undefined;
};

const HeadTitle: React.FC<IProps> = ({ children,style }) => {
  return <div className="font-semibold text-3xl p-5 text-90" style={style}>{children}</div>;
};

export default HeadTitle;
