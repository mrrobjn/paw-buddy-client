"use client";
import { useAppSelector } from "@/redux/hook";
import { userSelector } from "@/redux/selector";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Layout: React.FC<LayoutProp> = ({ children }) => {
  const router = useRouter();
  const user: User = useAppSelector(userSelector);

  useEffect(() => {
    if (user.isAuthenticated) {
      router.push("/");
    }
  }, []);

  if (!user.isAuthenticated) {
    return (
      <div className="flex h-screen max-h-screen overflow-hidden bg-gradient-to-r from-gray-50 to-gray-50 via-gray-50 shadow-md">
        <div>
          <img className="p-[40px]" src="assets/imgs/logo.png" />
        </div>
        <div
          className="flex-1 bg-no-repeat bg-contain flex items-center justify-end mr-[200px]"
          style={{ backgroundImage: "url(assets/imgs/image.png)" ,backgroundSize:800}}
        >
          {children}
        </div>
      </div>
    );
  }
};

export default Layout;
