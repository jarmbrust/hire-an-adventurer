import { createSlice } from '@reduxjs/toolkit';
import type { Adventurer } from '@/app/lib/definitions';

interface AdventurerState {
  adventurers: Adventurer[];
  inCombat: boolean;
}

const initialState: AdventurerState = {
  adventurers: [],
  inCombat: false,
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
    combatEngaged: (state, action) => {
      state.inCombat = action.payload;
    }
  },
});

export const getAdventurerStatus = (id: number | undefined): string => {
  if (!id) return 'Unknown';
  const adventurer = initialState.adventurers.find(adventurer => adventurer.id === id);
  if (!adventurer) return 'Unknown';
  return adventurer.status;
};

// TODO: might not need this function
export const getAdventurerByStatus = (status: string): Adventurer[] =>
  initialState.adventurers.filter(adventurer => adventurer.status === status);
export const getCombatEngaged = (): boolean => initialState.inCombat;

// export const getAdventurerById = (state: { adventurers: AdventurerState }, id: number): Adventurer | undefined =>
//   state.adventurers.adventurers.find(adventurer => adventurer.id === id);
export const getAdventurers = (state: { adventurers: AdventurerState }): Adventurer[] => state.adventurers.adventurers;
export const { updateAdventurerStatus, initializeAdventurers, combatEngaged } = adventurerSlice.actions;

export default adventurerSlice.reducer;
