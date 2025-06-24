import { createSlice } from '@reduxjs/toolkit';

export const scoreSlice = createSlice({
  name: 'score',
  initialState: {
    score: { value: 0, coins: 200 }
  },
  reducers: {
    initializeStore: (state: { score: { value: number; coins: number } }) => {
      state.score.value = 0;
      state.score.coins = 200; // Reset coins to initial value
    },
    increaseScore: (state: { score: { value: number, coins: number } }, action: { payload: number }) => {
      console.log('increaseScore action payload (score):', action.payload);
      state.score.value  += action.payload;
    },
    coinAmount:  (state: { score: { value: number, coins: number } }, action: { payload: number }) => {
      state.score.coins = action.payload;
    },
    deductCoins: (state: { score: { value: number, coins: number } }, action: { payload: number }) => {
      state.score.coins -= action.payload;
    }
  }
});

export const selectScore = (state: { score: { value: number } }) => state.score;
export const selectCoins = (state: { coins: { value: number } }) => state.coins;
export const { initializeStore, increaseScore, coinAmount, deductCoins } = scoreSlice.actions;

export default scoreSlice.reducer;
