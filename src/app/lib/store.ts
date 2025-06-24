import { configureStore } from '@reduxjs/toolkit';
import { scoreSlice } from '@/app/lib/features/score/score-slice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      score: scoreSlice.reducer,
    },
  })
};
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];