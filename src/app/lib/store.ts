import { configureStore } from '@reduxjs/toolkit';
import { scoreSlice } from '@/app/lib/features/score/score-slice';
import { adventurerSlice } from '@/app/lib/features/adventurer/adventurer-slice';
import { api } from '@/app/api/api-slice';
import themeReducer from '@/app/lib/features/theme/theme-slice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      score: scoreSlice.reducer,
      theme: themeReducer,
      adventurers: adventurerSlice.reducer,
      api: api.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(api.middleware),
  })
};
export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore['dispatch'];
