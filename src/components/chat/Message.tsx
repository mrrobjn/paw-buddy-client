"use client";
import { ASSET_PATH } from "@/constants";
import { useAppSelector } from "@/redux/hook";
import { userSelector } from "@/redux/selector";
import moment from "moment";
import { useState } from "react";
import { NoAvatar } from "../common/NoAvatar";

interface Props {
  message: Message;
  currentChat: Conversation;
  nextMessage: Message | undefined;
}

export const Message: React.FC<Props> = ({
  message,
  currentChat,
  nextMessage,
}) => {
  const user: User = useAppSelector(userSelector);
  const [hover, setHover] = useState(false);

  const pos = message.senderId === user._id ? "end" : "start";

  const person = currentChat.participants.find(
    (d) => message.senderId === d._id
  );

  const currentDate = moment(message.createdAt).format("DD MMMM YYYY");
  const nextDate =
    nextMessage && moment(nextMessage.createdAt).format("DD MMMM YYYY");

  return (
    <>
      <div className={`flex justify-${pos} mb-2 transition-all`}>
        {pos === "start" && (
          <div className="w-[50px] h-[50px] mr-2">
            {person?.profilePic ? (
              <img
                className="w-full h-full rounded-full"
                src={person?.profilePic}
              />
            ) : (
              <NoAvatar name={person?.fullName} />
            )}
          </div>
        )}
        <div
          className={`flex ${
            pos === "start" ? "items-start" : "items-end"
          } flex-col`}
        >
          <div className={`text-sm mb-[2px] w-full flex justify-${pos}`}>
            {pos === "start" && person?.fullName + ","}{" "}
            {moment(message.createdAt).format("HH:mm A")}
          </div>
          <div
            onMouseEnter={() => setHover(true)}
            className={`${
              pos === "start" ? "bg-lg-blue" : "text-white bg-primary"
            } h-fit w-fit rounded-xl p-3 relative max-w-[500px] break-words`}
          >
            {message.message}
          </div>
        </div>
      </div>
      {nextDate !== currentDate && (
        <div className="flex items-center mb-2">
          <div className="ml-[56px] flex-1 h-[1px] bg-disable"></div>
          <p className="text-center mx-2 text-body text-sm">{currentDate}</p>
          <div className="flex-1 h-[1px] bg-disable"></div>
        </div>
      )}
    </>
  );
};
