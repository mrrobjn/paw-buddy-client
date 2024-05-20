"use client";
import { useEffect, useState } from "react";
import HeadTitle from "../common/HeadTitle";
import { Conversation } from "./Conversation";
import { apiGetConversation } from "@/apis";
import { FaSearch } from "react-icons/fa";
import { useAppSelector } from "@/redux/hook";
import { socketSelector } from "@/redux/selector";

interface State {
  conversations: Conversation[];
}

interface Props {
  currentChat: Conversation;
  onSelectChat: Function;
}

export const ChatSidebar: React.FC<Props> = ({ currentChat, onSelectChat }) => {
  const [state, setState] = useState<State>({ conversations: [] });
  const socket: SocketState = useAppSelector(socketSelector);

  useEffect(() => {
    const fetchConversation = async () => {
      try {
        const resData = await apiGetConversation();
        if (resData.success) {
          handleChange("conversations", resData.data);
        }
      } catch (error) {}
    };
    fetchConversation();
  }, [socket.messages]);

  const handleChange = (name: string, value: any) => {
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="w-[360px] h-full border-r-2 overflow-y-auto flex flex-col">
      <HeadTitle>Chat</HeadTitle>
      <div className="mx-3 flex items-center bg-lg-blue rounded-lg">
        <div className="pl-2">
          <FaSearch color="#CCC"/>
        </div>
        <input
          type="text"
          className="p-2 w-full outline-none rounded-tr-lg rounded-br-lg bg-lg-blue"
          placeholder="Search people"
        />
      </div>
      <div className="px-3 py-5 bg-secondary flex-1">
        {state.conversations.map((conversation, i) => {
          return (
            <Conversation
              conversation={conversation}
              onSelectChat={onSelectChat}
              currentId={currentChat._id}
              key={i}
            />
          );
        })}
      </div>
    </div>
  );
};
