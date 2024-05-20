import { CSSProperties } from "react";

type Props = {
  children: any;
  style?: CSSProperties;
  textCenter?:boolean
};

const TableData: React.FC<Props> = ({ children, style }) => {
  return (
    <td className="p-3" style={style}>
      {children}
    </td>
  );
};

export default TableData
