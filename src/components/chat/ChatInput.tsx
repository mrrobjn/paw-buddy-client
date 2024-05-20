"use client";
import { FaPaperPlane } from "react-icons/fa6";
import { Button } from "../common/Button";
import { SubmitHandler, useForm } from "react-hook-form";
import { apiSendMessage } from "@/apis";

interface Props {
  _id: string;
  setMessage: Function;
}

export const ChatInput: React.FC<Props> = ({ _id, setMessage }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<{ message: string }>();

  const onSubmit: SubmitHandler<{ message: string }> = async (data) => {
    try {
      const resData = await apiSendMessage(_id, data);
      setMessage(resData);
      reset();
    } catch (error) {}
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="px-4 py-3 flex items-center border-t-2">
        <input
          type="text"
          autoComplete="off"
          placeholder="Type a message"
          className="resize-none bg-lg-blue flex-1 mr-3 outline-none py-3 px-5 h-[48px] rounded-full"
          {...register("message", { required: true })}
        />
        <div className="w-fit">
          <Button btnType="primary" type="submit" style={{ height: "100%" }}>
            <FaPaperPlane />
          </Button>
        </div>
      </div>
    </form>
  );
};
