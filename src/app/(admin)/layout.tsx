"use client";
import { useAppSelector } from "@/redux/hook";
import { userSelector } from "@/redux/selector";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Layout: React.FC<LayoutProp> = ({ children }) => {
  const user: User = useAppSelector(userSelector);
  const router = useRouter();

  useEffect(() => {
    if (user.roleId !== 1) {
      router.push("/");
    }
  }, []);

  if (user.roleId === 1) {
    return children;
  }
};

export default Layout;
