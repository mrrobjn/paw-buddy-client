import { FaBell } from "react-icons/fa6";
import { Button } from "../common/Button";
import { useAppSelector } from "@/redux/hook";
import { socketSelector } from "@/redux/selector";
import { useEffect, useState } from "react";
import { apiGetNotification, apiUpdateNotification } from "@/apis/notification";
import moment from "moment";
import { FaCalendar } from "react-icons/fa";

interface State {
  isExpand: boolean;
  notifications: Notify[];
  tab: 0 | 1;
  isNew: boolean;
}

const initState: State = {
  isExpand: false,
  notifications: [],
  tab: 0,
  isNew: false,
};

const Notifications = () => {
  const socket: SocketState = useAppSelector(socketSelector);
  const [state, setState] = useState<State>(initState);

  useEffect(() => {
    const fetchNotify = async () => {
      try {
        const resData = await apiGetNotification();
        if (resData.success) {
          const data: Notify[] = resData.data;
          handleChange("notifications", data.reverse());

          if (state.isExpand) {
            const res = await apiUpdateNotification();
            if (res.success) {
              handleChange("isNew", false);
            }
          } else {
            const isNews = data.filter((d) => d.is_read === false);
            if (isNews.length > 0) {
              handleChange("isNew", true);
            }
          }
        }
      } catch (error) {}
    };
    fetchNotify();
  }, [state.isExpand, socket.notifications]);

  useEffect(() => {
    if (socket.notifications.length > 0) {
      handleChange("isNew", true);
    }
  }, [socket.notifications]);

  const handleChange = (name: string, value: any) => {
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="flex flex-col mb-4 w-full items-center">
      <div className="relative">
        <div className={`${state.isNew && "hand-shake"}`}>
          <Button
            btnType="primary"
            round
            onClick={() => handleChange("isExpand", !state.isExpand)}
          >
            <FaBell color="#FFF" size={18} />
          </Button>
        </div>
        {state.isNew && (
          <div className="w-3 h-3 absolute bg-subtle-danger right-0 top-0 rounded-full"></div>
        )}
      </div>
      {state.isExpand && (
        <div className="bg-secondary absolute top-[150px] left-10 z-30 shadow-lg rounded-md">
          <div className="flex justify-between p-3 font-semibold">
            <p>Notifications</p>
            <p className="text-body cursor-pointer hover:text-100">
              Mark all as read
            </p>
          </div>
          <div className="flex px-3 border-b-[1px]">
            <div
              className={`border-b-2 ${
                state.tab === 0 && "border-dark"
              } mr-4 pb-2 cursor-pointer`}
              onClick={() => handleChange("tab", 0)}
            >
              General
            </div>
            <div
              className={`border-b-2 ${
                state.tab === 1 && "border-dark"
              } mr-2 pb-2 cursor-pointer`}
              onClick={() => handleChange("tab", 1)}
            >
              Inbox
            </div>
          </div>
          <div className="max-h-[300px] w-[400px] min-h-[69px] overflow-y-auto">
            {state.tab === 0
              ? state.notifications.map((not, i) => {
                  return (
                    <div
                      className="p-3 flex items-center border-t-[1px]"
                      key={i}
                    >
                      <div className="p-3 mr-2 rounded bg-lg-blue">
                        <FaCalendar color="#247CFF" />
                      </div>
                      <div>
                        <p>{not.content}</p>
                        <p className="text-sm text-body">
                          {moment(not.createdAt).fromNow()}
                        </p>
                      </div>
                    </div>
                  );
                })
              : ""}
          </div>
        </div>
      )}
    </div>
  );
};

export default Notifications;
