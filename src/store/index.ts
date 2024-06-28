import { configureStore } from "@reduxjs/toolkit";
import globalReducer from "@store/global/globalSlice";
import { REDUCER_NAMES } from "@store/constants";

export const store = configureStore({
  reducer: {
    [REDUCER_NAMES.GLOBAL]: globalReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
