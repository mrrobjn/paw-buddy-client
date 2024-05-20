'use client'
import ProtectRoute from "@/hocs/ProtectRoute";
import { AppStore, makeStore } from "@/redux/store";
import { useRef } from "react";
import { Provider } from "react-redux";

const PageWrapper: React.FC<LayoutProp> = ({ children }) => {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore();
  }

  return (
    <Provider store={storeRef.current}>
      <ProtectRoute>{children}</ProtectRoute>
    </Provider>
  );
};

export default PageWrapper;
