import { createSlice } from '@reduxjs/toolkit';
import { REDUCER_NAMES } from '@/stores/constants';

export type GlobalState = {
  selectedHeroId: string | null;
};

const initGlobalState: GlobalState = {
  selectedHeroId: null,
};

export const globalSlice = createSlice({
  name: REDUCER_NAMES.GLOBAL,
  initialState: initGlobalState,
  reducers: {
    updateSelectedHeroId: (state, action: { payload: string }) => {
      state.selectedHeroId = action.payload;
    },
  },
});

export default globalSlice.reducer;

export const { updateSelectedHeroId } = globalSlice.actions;

export const selectedHeroIdSelector = (state: { global: GlobalState }) =>
  state.global.selectedHeroId;
