import { createSlice } from "@reduxjs/toolkit";
import { Socket } from "socket.io-client";

interface State extends SocketState {}

const initialState: State = {
  onlineUsers: [],
  messages: [],
  unread: 0,
};

export const socketReducer = createSlice({
  name: "socket",
  initialState,
  reducers: {
    setOnlineUsers: (state, action) => {
      return { ...state, onlineUsers: action.payload };
    },
    setMessages: (state, action) => {
      state.messages = [...state.messages, action.payload];
    },
    removeSyncedMessage: (state, action) => {
      state.messages = state.messages.filter(
        (m) => m.receiverId !== action.payload.id
      );
    },
  },
});

export const { setOnlineUsers, setMessages, removeSyncedMessage } =
  socketReducer.actions;
