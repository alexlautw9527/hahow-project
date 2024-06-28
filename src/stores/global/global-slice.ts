/** Boilerplate Code */

import { createSlice } from '@reduxjs/toolkit';
import { REDUCER_NAMES } from '@/stores/constants';

export type GlobalState = {};

const initGlobalState: GlobalState = {};

export const globalSlice = createSlice({
  name: REDUCER_NAMES.GLOBAL,
  initialState: initGlobalState,
  reducers: {},
});

export default globalSlice.reducer;

// export const {} = globalSlice.actions;
