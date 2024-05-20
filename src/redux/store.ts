import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./user/userSlice";
import { socketReducer } from "./socket/socketSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      user: userReducer.reducer,
      socket: socketReducer.reducer,
    },
  });
};
// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
