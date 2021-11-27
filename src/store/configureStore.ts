import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import modalSlice from "./modalSlice";
import stepSlice from "./stepSlice";
import taskSlice from "./taskSlice";
import uiPreferenceSlice from "./uiPreferenceSlice";

const reducer = combineReducers({
  tasks: taskSlice,
  steps: stepSlice,
  modal: modalSlice,
  uiPreference: uiPreferenceSlice,
});

const store = configureStore({
  reducer,
  devTools: process.env.REACT_APP_ENV !== "production",
});

export type AppState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export default store;
