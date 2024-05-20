"use client";
import { ChatSidebar, MessageContainer } from "@/components";
import { useState } from "react";

interface State {
  currentChat: Conversation;
}

const Chat = () => {
  const [state, setState] = useState<State>({
    currentChat: {
      _id: "",
      participants:[],
      updatedAt: "",
    },
  });

  const handleChange = (name: string, value: any) => {
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="flex h-full rounded-xl bg-secondary">
      <ChatSidebar
        currentChat={state.currentChat}
        onSelectChat={(chat: Conversation) => handleChange("currentChat", chat)}
      />
      <MessageContainer currentChat={state.currentChat} />
    </div>
  );
};

export default Chat;
