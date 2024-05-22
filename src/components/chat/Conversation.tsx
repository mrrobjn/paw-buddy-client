import { useAppSelector } from "@/redux/hook";
import { socketSelector, userSelector } from "@/redux/selector";
import moment from "moment";
import { NoAvatar } from "../common/NoAvatar";

interface Props {
  conversation: Conversation;
  currentId: string;
  onSelectChat: Function;
}

export const Conversation: React.FC<Props> = ({
  conversation,
  onSelectChat,
  currentId,
}) => {
  const user: User = useAppSelector(userSelector);
  const socket: SocketState = useAppSelector(socketSelector);

  const receiver = conversation.participants.find((p) => p._id !== user._id);
  const isOnline = receiver && socket.onlineUsers.includes(receiver._id);

  return (
    <div
      className={`flex p-2 cursor-pointer h-[75px] hover:bg-lg-blue transition-all rounded-lg ${
        currentId === conversation._id ? "bg-blue-50" : ""
      }`}
      onClick={() => onSelectChat(conversation)}
    >
      <div className="mr-2 flex items-center relative h-[56px] w-[56px]">
        {isOnline && (
          <div className="w-3 h-3 absolute bg-subtle-success bottom-1 right-0 rounded-full"></div>
        )}
        {receiver?.profilePic ? (
          <img
            src={receiver?.profilePic}
            className="rounded-full w-full h-full"
          />
        ) : (
         <NoAvatar name={receiver?.fullName||""}/>
        )}
      </div>
      <div className="w-[190px] flex flex-col justify-center">
        <p className="font-semibold">{receiver?.fullName}</p>
        <p className="text-sm text-body">
          {moment(conversation.updatedAt).fromNow()}
        </p>
      </div>
    </div>
  );
};
