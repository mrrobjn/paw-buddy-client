"use client";
import ProtectRoute from "@/hocs/ProtectRoute";
import { AppStore, makeStore } from "@/redux/store";
import { useRef } from "react";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-toastify/dist/ReactToastify.css";

const PageWrapper: React.FC<LayoutProp> = ({ children }) => {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore();
  }

  return (
    <Provider store={storeRef.current}>
      <ProtectRoute>{children}</ProtectRoute>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={true}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        draggable
        pauseOnHover={false}
        theme="light"
      />
    </Provider>
  );
};

export default PageWrapper;
