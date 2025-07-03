import { configureStore } from '@reduxjs/toolkit';
import { scoreSlice } from '@/app/lib/features/score/score-slice';
import themeReducer from '@/app/lib/features/theme/theme-slice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      score: scoreSlice.reducer,
      theme: themeReducer,
    },
  })
};
export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore['dispatch'];
