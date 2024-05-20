import React, { CSSProperties } from "react";

export const TableHeader = ({
  children,
  style,
}: {
  children: any;
  style?: CSSProperties;
}) => {
  return (
    <th className={"p-3 text-start uppercase"} style={style}>{children}</th>
  );
};
