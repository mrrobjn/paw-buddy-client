import { createSlice } from "@reduxjs/toolkit";

const initialState: SocketState = {
  onlineUsers: [],
  messages: [],
  notifications: [],
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
    setNotifies: (state, action) => {
      state.notifications = [...state.notifications, action.payload];
    },
    removeReadNotify: (state, action) => {
      state.notifications = state.notifications.filter(
        (m) => m.receiverId !== action.payload.id
      );
    },
  },
});

export const { setNotifies, setOnlineUsers, setMessages, removeSyncedMessage } =
  socketReducer.actions;
