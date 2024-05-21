"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { userSelector } from "@/redux/selector";
import { logoutUser } from "@/redux/user/async";
import {
  FaRightFromBracket,
  FaUser,
  FaMessage,
  FaCalendarCheck,
  FaGear,
  FaUsers,
  FaServicestack,
  FaBellConcierge,
  FaCapsules,
  FaSyringe,
} from "react-icons/fa6";
import { useState } from "react";
import { FaChevronLeft } from "react-icons/fa";
import { Button } from "../common/Button";
import { NoAvatar } from "../common/NoAvatar";
import Notifications from "./Notifications";

const paths = [
  {
    url: "/",
    label: "Calendar",
    icon: <FaCalendarCheck size={14} />,
  },
  {
    url: "/chat",
    label: "Chat",
    icon: <FaMessage size={14} />,
  },
  {
    url: "/account",
    label: "My Account",
    icon: <FaUser size={14} />,
  },
];

const adminPaths = [
  {
    url: "/user",
    label: "User",
    icon: <FaUsers size={14} />,
  },
  {
    url: "/service",
    label: "Service",
    icon: <FaBellConcierge size={14} />,
  },
  {
    url: "/service_category",
    label: "Service Category",
    icon: <FaServicestack size={14} />,
  },
  {
    url: "/medicine",
    label: "Medicine",
    icon: <FaCapsules size={14} />,
  },
  {
    url: "/vaccin",
    label: "Vaccin",
    icon: <FaSyringe size={14} />,
  },
];

export const Sidebar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const user: User = useAppSelector(userSelector);
  const [isExpand, setIsExpand] = useState(true);

  const handleLogout = async () => {
    await dispatch(logoutUser());
    router.push("/login");
  };

  return (
    <div
      className="bg-third flex flex-col justify-between pt-[10px] pb-[40px] pl-5 pr-[10px] h-full overflow-y-auto transition-all"
      style={{
        width: !isExpand ? 70 : 250,
        paddingLeft: !isExpand ? 10 : 20,
        paddingRight: !isExpand ? 0 : 10,
      }}
    >
      <div>
        <div className="px-2 py-4 flex justify-center h-[80px]">
          <img
            src={"assets/imgs/logo2.png"}
            className="w-full transition-all"
            style={{ opacity: !isExpand ? 0 : 1 }}
          />
        </div>
        <div className="flex flex-col mt-4 items-center">
          <Notifications />
          {paths.map((path, i) => (
            <Link
              style={{
                padding: "0 12px",
                justifyContent: !isExpand ? "center" : "left",
              }}
              href={path.url}
              key={i}
              className={`hover:bg-secondary hover:text-100 w-full transition-all flex items-center rounded-lg mb-3 font-semibold h-[48px] ${
                pathname.startsWith(path.url) &&
                (pathname === path.url || pathname.startsWith(`${path.url}/`))
                  ? "bg-secondary text-100"
                  : "text-10"
              }`}
            >
              {path.icon}
              <span
                className="ml-2"
                style={{ display: !isExpand ? "none" : "block" }}
              >
                {path.label}
              </span>
            </Link>
          ))}
          {user.roleId === 1 &&
            adminPaths.map((path, i) => (
              <Link
                style={{
                  padding: "0 12px",
                  justifyContent: !isExpand ? "center" : "left",
                }}
                href={path.url}
                key={i}
                className={`hover:bg-secondary hover:text-100 w-full transition-all flex items-center rounded-lg mb-3 font-semibold h-[48px] ${
                  pathname.startsWith(path.url) &&
                  (pathname === path.url || pathname.startsWith(`${path.url}/`))
                    ? "bg-secondary text-100"
                    : "text-10"
                }`}
              >
                {path.icon}
                <span
                  className="ml-2"
                  style={{ display: !isExpand ? "none" : "block" }}
                >
                  {path.label}
                </span>
              </Link>
            ))}
          <Button
            style={{
              borderRadius: 40,
              width: 40,
              height: 40,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              transform: `rotate(${isExpand ? 0 : 180}deg)`,
            }}
            btnType="primary"
            onClick={() => setIsExpand(!isExpand)}
          >
            <FaChevronLeft size={14} />
          </Button>
        </div>
      </div>
      <div
        className="flex justify-between items-center bg-card p-3 rounded-lg"
        style={{ flexDirection: !isExpand ? "column" : "row" }}
      >
        <div
          className="flex items-center"
          style={{ marginRight: !isExpand ? 0 : 8 }}
        >
          <Link href={"/account"}>
            <div
              className="w-[40px] h-[40px] "
              style={{
                marginRight: !isExpand ? 0 : 8,
                marginBottom: !isExpand ? 10 : 0,
              }}
            >
              {user.avatar ? (
                <img className="rounded-full" src={user.avatar} />
              ) : (
                <NoAvatar name={user.fullName} />
              )}
            </div>
          </Link>
          <div style={{ display: !isExpand ? "none" : "block" }}>
            <p className="text-sm text-10">Hello</p>
            <p className="font-semibold text-10">{user.fullName}</p>
          </div>
        </div>
        <div className="w-[30px] h-[30px] flex justify-center items-center">
          <button onClick={handleLogout}>
            <FaRightFromBracket size={20} color="#fff" />
          </button>
        </div>
      </div>
    </div>
  );
};
