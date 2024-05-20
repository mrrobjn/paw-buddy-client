"use client";
import { Sidebar } from "@/components";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { userSelector } from "@/redux/selector";
import { setOnlineUsers } from "@/redux/socket/socketSlice";
import { useEffect, useState } from "react";
import { FaBell } from "react-icons/fa6";
import { Socket, io } from "socket.io-client";

export const Main: React.FC<LayoutProp> = ({ children }) => {
  const user: User = useAppSelector(userSelector);
  const dispatch = useAppDispatch();
  const [socket, setSocket] = useState<Socket>();

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        if (user.isAuthenticated && user._id) {
          const socket = io("http://localhost:1708", {
            query: {
              userId: user._id,
            },
          });
          setSocket(socket);
          socket.on("getOnlineUsers", (users) => {
            dispatch(setOnlineUsers(users));
          });
          return () => socket.close();
        } else {
          if (socket !== undefined) {
            socket.close();
            setSocket(undefined);
          }
        }
      } catch (error) {}
    };
    fetchMessages();
  }, [user.isAuthenticated]);

  return (
    <div className="flex h-screen max-h-screen relative">
      <Sidebar />
      <div style={{ padding: 10 }} className="bg-third flex-1">
        <div className="bg-secondary h-full rounded-xl overflow-y-auto">{children}</div>
      </div>
    </div>
  );
};
