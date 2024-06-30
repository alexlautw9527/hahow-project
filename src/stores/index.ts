import { useDispatch, useSelector } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import globalReducer from '@/stores/global/global-slice';
import { REDUCER_NAMES } from '@/stores/constants';

export const store = configureStore({
  reducer: {
    [REDUCER_NAMES.GLOBAL]: globalReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
