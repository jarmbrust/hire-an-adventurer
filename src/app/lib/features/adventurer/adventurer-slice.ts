import { createSlice } from '@reduxjs/toolkit';
import type { Adventurer } from '@/app/lib/definitions';

interface AdventurerState {
  adventurers: Adventurer[];
}

const initialState: AdventurerState = {
  adventurers: [],
};

export const adventurerSlice = createSlice({
  name: 'adventurers',
  initialState,
  reducers: {
    addAdventurer: (state, action) => {
      state.adventurers.push(action.payload);
    },
    updateAdventurerStatus: (state, action) => {
      const index = state.adventurers.findIndex(adventurer => adventurer.id === action.payload.id);
      if (index !== -1) {
        state.adventurers[index].status = action.payload.status;
      }
    },
    initializeAdventurers: (state, action) => {
      state.adventurers = action.payload;
    },
  },
});

export const getAdventurerStatus = (id: number | undefined): string => {
  if (!id) return 'Unknown';
  const adventurer = initialState.adventurers.find(adventurer => adventurer.id === id);
  if (!adventurer) return 'Unknown';
  return adventurer.status;
};
export const getAdventurerById = (state: { adventurer: AdventurerState }, id: number): Adventurer | undefined =>
  state.adventurer.adventurers.find(adventurer => adventurer.id === id);
export const getAdventurers = (state: { adventurers: AdventurerState }): Adventurer[] => state.adventurers.adventurers;
export const { updateAdventurerStatus } = adventurerSlice.actions;

export default adventurerSlice.reducer;
