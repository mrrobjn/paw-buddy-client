import Rodal from "rodal";
import { Button } from "../common/Button";
import { ErrorMessage } from "./ErrorMessage";

const ModalForm: React.FC<ModalFormProps> = ({
  children,
  title,
  visible,
  onClose,
  footer = false,
  submit,
  onSubmit,
  error,
}) => {
  return (
    <Rodal visible={visible} onClose={onClose}>
      <div className="font-bold p-3 border-b-2 rounded-t-lg uppercase">
        {title}
      </div>
      <form onSubmit={onSubmit}>
        <div className="max-h-[70vh] overflow-y-auto">{children}</div>
        {error && (
          <div className="border-t-2">
            <ErrorMessage style={{ margin: 12 }}>{error}</ErrorMessage>
          </div>
        )}
        {footer && (
          <div className="px-3 py-2 text-right border-t-2 rounded-b-lg">
            <Button
              btnType="primary"
              onClick={submit}
              style={{ marginRight: 10 }}
              type="submit"
            >
              Save
            </Button>
            <Button onClick={onClose} btnType="disable" type="button">
              Discard
            </Button>
          </div>
        )}
      </form>
    </Rodal>
  );
};

export default ModalForm;
