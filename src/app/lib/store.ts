'use client';

import { configureStore } from '@reduxjs/toolkit';
import { scoreSlice } from '@/app/lib/features/score/score-slice';
import { api, monsterApi } from '@/app/api/api-slice';
import themeReducer from '@/app/lib/features/theme/theme-slice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      score: scoreSlice.reducer,
      theme: themeReducer,
      api: api.reducer,
      monsterApi: monsterApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .concat(api.middleware)
        .concat(monsterApi.middleware),
  })
};
export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore['dispatch'];
