/** Boilerplate Code */

import { createSelector, createSlice } from "@reduxjs/toolkit";
import { REDUCER_NAMES } from "@store/constants";
// import { WithNull } from "@customTypes";
import { getLocalStorageItem, LOCAL_STORAGE_KEYS } from "@helpers";

export type GlobalState = {
  isLogin: boolean;
};

const initGlobalState: GlobalState = {
  isLogin: !!getLocalStorageItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN),
};

export const globalSlice = createSlice({
  name: REDUCER_NAMES.GLOBAL,
  initialState: initGlobalState,
  reducers: {
    updateLogin: (state) => {
      state.isLogin = true;
    },
    updateLogout: (state) => {
      state.isLogin = false;
    },
  },
});

export const { updateLogin, updateLogout } = globalSlice.actions;

export const isLoginSelector = createSelector(
  (state) => state[REDUCER_NAMES.GLOBAL],
  (global: GlobalState) => global.isLogin,
);

export default globalSlice.reducer;
