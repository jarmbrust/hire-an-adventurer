export type Adventurer = {
  id: number,
  name: string,
  profession: string,
  strength: string,
  agility: string,
  arcane: string,
  description: string,
  image: string,
  fee: number,
  successes: number,
  defeats: number
  status: AdventurerStatuses;
  victoryPhrase: string;
};

export type AdventurerStatuses = 'Available' | 'Selected' | 'Hired' | 'Combat' | 'Injured' | 'Deceased' | 'Unknown';

export type Monster = {
  id: number,
  name: string,
  flies: boolean,
  description: string,
  image: string,
  victoryPhrase: string,
  attackPower: number,
};

// export type ThemeContextType = {
//   theme: Theme;
//   toggleTheme: () => void;
// };

// export type SelectedAdventurersContextType = {
//   selectedAdventurers: Adventurer[];
//   hiredAdventurers: Adventurer[];
//   deceasedAdventurers: Adventurer[];
//   adventurersInCombat: boolean;
//   selectAdventurer: (adventurer: Adventurer) => void;
//   removeSelectedAdventurer: (id: number) => void;
//   getAdventurerStatus: (id: number | undefined) => string;
//   clearAdventurers: (adventurerGroup: string) => void;
//   hireAdventurers: (adventurers: Adventurer[]) => void;
//   slayAdventurers: () => void;
//   adventurerVictory: () => void;
//   combatEngaged: (inCombat: boolean) => void;
// };

export type ScoreContextType = {
  coinAmount: number;
  score: number;
  changeCoinAmount: (amount: number) => void;
  increaseScore: (amount: number) => void;
};

export type Theme = 'light' | 'dark';

export type RootState = {
  theme: { theme: Theme };
  score: { score: { value: number; coins: number } };
};
