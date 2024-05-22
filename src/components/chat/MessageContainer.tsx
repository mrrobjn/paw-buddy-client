"use client";
import { ChatInput } from "./ChatInput";
import { Message } from "./Message";
import { useEffect, useState } from "react";
import { apiGetMessages } from "@/apis";
import { FaHand, FaPhone, FaVideo } from "react-icons/fa6";
import { useAppSelector } from "@/redux/hook";
import { socketSelector, userSelector } from "@/redux/selector";
import { NoAvatar } from "../common/NoAvatar";
import { FaInfoCircle } from "react-icons/fa";

interface Props {
  currentChat: Conversation;
}

interface State {
  messages: Message[];
}

export const MessageContainer: React.FC<Props> = ({ currentChat }) => {
  const [state, setState] = useState<State>({ messages: [] });
  const user: User = useAppSelector(userSelector);
  const socket: SocketState = useAppSelector(socketSelector);
  const receiver = currentChat.participants.find((d) => user._id !== d._id);
  const isOnline = receiver && socket.onlineUsers.includes(receiver._id);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        if (currentChat._id) {
          const resData: [] = await apiGetMessages(receiver?._id || "");
          handleChange("messages", resData.reverse());
        }
      } catch (error) {}
    };
    fetchMessages();
  }, [currentChat._id]);

  useEffect(() => {
    const ownMessages = socket.messages.filter(
      (m) =>
        m.receiverId === user._id &&
        !state.messages.some((msg) => msg._id === m._id)
    );
    handleChange("messages", [...ownMessages, ...state.messages]);
  }, [socket.messages]);

  const handleChange = (name: string, value: any) => {
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  if (currentChat._id) {
    return (
      <div className="flex-1 flex flex-col">
        <div className="flex px-4 py-2 justify-between border-b-2">
          <div className="flex items-center w-full">
            <div className="w-[40px] h-[40px] mr-2 relative">
              {isOnline && (
                <div className="w-3 h-3 absolute bg-subtle-success bottom-0 right-0 rounded-full"></div>
              )}
              {receiver?.profilePic ? (
                <img
                  className="rounded-full w-full h-full"
                  src={receiver?.profilePic}
                />
              ) : (
                <NoAvatar name={receiver?.fullName} />
              )}
            </div>
            <div>
              <p className="font-semibold text-xl">{receiver?.fullName}</p>
              <p>{isOnline ? "Active" : "Inactive"}</p>
            </div>
          </div>
          <div className="flex justify-between items-center w-[150px]">
            <FaPhone color="#247CFF" size={20} />
            <FaVideo color="#247CFF" size={20} />
            <FaInfoCircle color="#247CFF" size={20} />
          </div>
        </div>
        <div className="flex-1 flex flex-col-reverse p-5 overflow-y-auto bg-secondary transition-all">
          {state.messages.map((message, i) => {
            return (
              <Message
                currentChat={currentChat}
                nextMessage={state.messages[i + 1]}
                message={message}
                key={i}
              />
            );
          })}
        </div>
        <ChatInput
          _id={receiver?._id || ""}
          setMessage={(message: Message) =>
            handleChange("messages", [message, ...state.messages])
          }
        />
      </div>
    );
  } else {
    return (
      <div className="flex justify-center items-center flex-1">
        <div className="flex flex-col items-center">
          <div className="flex items-center">
            <FaHand size={40} color="orange" className="hand-shake" />
            <p className="text-xl ml-2">
              Hi there, <span className="font-bold">{user.fullName}</span>
            </p>
          </div>
          <p className="text-xl mt-3">
            Select a conversation to start messaging
          </p>
        </div>
      </div>
    );
  }
};
