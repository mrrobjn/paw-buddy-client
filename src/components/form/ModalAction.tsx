import { MouseEventHandler } from "react";
import Rodal from "rodal";
import { Button } from "../common/Button";
import { FaCheck, FaTriangleExclamation, FaXmark } from "react-icons/fa6";

interface Props {
  visible: boolean;
  onClose: MouseEventHandler;
  onSubmit: Function;
  message?: string;
  title?: string;
  type: "confirm" | "warning" | "delete";
}

const ModalAction: React.FC<Props> = ({
  onClose,
  visible,
  onSubmit,
  message,
  title,
  type,
}) => {
  return (
    <Rodal visible={visible} onClose={onClose}>
      <div className="flex flex-col items-center p-5 w-[400px]">
        <div
          className={`p-3 ${
            type === "confirm"
              ? "border-success"
              : type === "delete"
              ? "border-danger"
              : "border-warning"
          } border-2 w-fit rounded-full mb-5`}
        >
          {type === "confirm" ? (
            <FaCheck size={40} color="#82C43C" />
          ) : type === "delete" ? (
            <FaXmark size={40} color="#FC5A5A" />
          ) : (
            <FaTriangleExclamation size={40} color="#FFC542" />
          )}
        </div>
        <h1 className="text-90 text-2xl mb-5">{title || "Are you sure?"}</h1>
        <p className="text-center text-body mb-5">{message}</p>
        <div className="flex justify-evenly w-full">
          <Button
            style={{ padding: "8px 30px" }}
            onClick={onSubmit}
            btnType="primary"
          >
            Confirm
          </Button>
          <Button
            style={{ padding: "8px 30px" }}
            onClick={onClose}
            btnType="disable"
          >
            Cancel
          </Button>
        </div>
      </div>
    </Rodal>
  );
};

export default ModalAction;
