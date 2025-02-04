import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import chatsReducer from "./slices/chatsSlice";
import { useDispatch, useSelector } from "react-redux";

const store = configureStore({
  reducer: {
    authData: authReducer,
    chatsData: chatsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

export default store;
