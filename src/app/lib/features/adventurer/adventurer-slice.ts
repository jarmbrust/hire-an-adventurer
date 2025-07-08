import { createSlice } from '@reduxjs/toolkit';
import type { Adventurer } from '@/app/lib/definitions';

interface AdventurerState {
  adventurers: Adventurer[];
}

const initialState: AdventurerState = {
  adventurers: [],
};

export const adventurerSlice = createSlice({
  name: 'adventurer',
  initialState,
  reducers: {
    addAdventurer: (state, action) => {
      state.adventurers.push(action.payload);
    },
    updateAdventurerStatus: (state, action) => {
      const index = state.adventurers.findIndex(adventurer => adventurer.id === action.payload.id);
      if (index !== -1) {
        // state.adventurers[index] = { ...state.adventurers[index], ...action.payload };
        state.adventurers[index].status = action.payload.status;
      }
    },
    initializeAdventurers: (state, action) => {
      state.adventurers = action.payload;
    },
  },
});

export const getAdventurerStatus = (state: { adventurer: AdventurerState }) => 
  state.adventurer.adventurers.map(adventurer => ({
    id: adventurer.id,
    name: adventurer.name,
    status: adventurer.status,
  })
);
export const getAdventurerById = (state: { adventurer: AdventurerState }, id: number) => 
  state.adventurer.adventurers.find(adventurer => adventurer.id === id);
export const getAdventurers = (state: { adventurer: AdventurerState }) => state.adventurer.adventurers;
export const adventurerActions = adventurerSlice.actions;

export default adventurerSlice.reducer;
