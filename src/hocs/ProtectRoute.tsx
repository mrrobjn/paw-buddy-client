"use client";
import { Loading } from "@/components";
import { apiGetCurrent } from "@/apis/user";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { getCurrent, login } from "@/redux/user/userSlice";
import { Main } from "@/layouts";
import { getAccessToken, getRefreshToken } from "@/config/axios";
import { userSelector } from "@/redux/selector";
import { logoutUser } from "@/redux/user/async";
import { Socket, io } from "socket.io-client";
import { setMessages, setOnlineUsers } from "@/redux/socket/socketSlice";
// @ts-ignore
import notificationSound from "../assets/sounds/frontend_src_assets_sounds_notification.mp3";

const ProtectRoute: React.FC<LayoutProp> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [socket, setSocket] = useState<Socket | null>(null);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user: User = useAppSelector(userSelector);
  const pathName = usePathname();
  const unprotectedPaths = ["/login", "/signup", "/resetpassword"];

  useEffect(() => {
    const getUser = async () => {
      try {
        setIsLoading(true);
        if (getAccessToken() || getRefreshToken()) {
          const data = await apiGetCurrent();
          if (!data.success || data.data.roleId === 3) {
            dispatch(logoutUser());
            if (!unprotectedPaths.includes(pathName)) {
              router.push("/login");
            }
          } else {
            const currentUser = data.data;
            dispatch(getCurrent(currentUser));
            dispatch(login());
          }
        } else if (!unprotectedPaths.includes(pathName)) {
          router.push("/login");
        }
      } catch (error) {
        dispatch(logoutUser());
        if (!unprotectedPaths.includes(pathName)) {
          router.push("/login");
        }
      } finally {
        setIsLoading(false);
      }
    };

    getUser();
  }, []);

  useEffect(() => {
    const conectSocket = async () => {
      try {
        if (user._id && !socket) {
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
          if (socket !== null) {
            socket.close();
            setSocket(null);
          }
        }
      } catch (error) {}
    };
    conectSocket();
  }, [user._id]);

  useEffect(() => {
    const handleNewMessage = (newMessage: any) => {
      newMessage.shouldShake = true;
      const sound = new Audio(notificationSound);
      sound.play();
      dispatch(setMessages(newMessage));
    };
    socket?.on("newMessage", handleNewMessage);
    return () => {
      socket?.off("newMessage", handleNewMessage);
    };
  }, [socket]);

  if (isLoading) {
    return (
      <div className="w-screen h-screen">
        <Loading />
      </div>
    );
  }

  if (user.isAuthenticated) {
    return <Main>{children}</Main>;
  }

  if (unprotectedPaths.includes(pathName)) {
    return children;
  }
};

export default ProtectRoute;
