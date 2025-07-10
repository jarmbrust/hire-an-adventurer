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
    modifyCoinAmount: (state: { score: { value: number, coins: number } }, action: { payload: { coins: number, type: string } }) => {
      if (action.payload.type === 'deductCoins') {
        const newCoinAmount = state.score.coins - action.payload.coins;
        // Prevent negative coin amounts
        // Handing the error message in the calling component
        if (newCoinAmount < 0) {
          console.warn('Attempted to modify coins below zero. Operation ignored.');
          return;
        }
        state.score.coins = newCoinAmount;
      } else if (action.payload.type === 'addCoins') {
        state.score.coins = state.score.coins + action.payload.coins;
      }
    }
  }
});

export const selectScore = (state: { score: { value: number } }) => state.score;
export const selectCoins = (state: { coins: { value: number } }) => state.coins;
export const getCoinAmount = (state: { score: { coins: number } }) => state.score.coins;
export const { initializeStore, increaseScore, modifyCoinAmount } = scoreSlice.actions;

export default scoreSlice.reducer;
