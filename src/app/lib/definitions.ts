export type Adventurer = {
  id: number,
  name: string,
  profession: string,
  health: string,
  strength: string,
  cunning: string,
  intellect: string,
  description: string,
  image: string,
  fee: string,
  rangedPower: number,
  meleePower: number
};

export type Monster = {
  id: number,
  name: string,
  flies: boolean,
  health: string,
  description: string,
  image: string,
  attackPower: number,
};

export type Theme = 'light' | 'dark';

export type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
};

export type SelectedAdventurersContextType = {
  selectedAdventurers: Adventurer[];
  hiredAdventurers: Adventurer[];
  deceasedAdventurers: Adventurer[];
  adventurersInCombat: boolean;
  selectAdventurer: (adventurer: Adventurer) => void;
  removeSelectedAdventurer: (id: number) => void;
  getAdventurerStatus: (id: number | undefined) => string;
  clearAdventurers: (adventurerGroup: string) => void;
  hireAdventurers: (adventurers: Adventurer[]) => void;
  slayAdventurers: () => void;
  combatEngaged: (inCombat: boolean) => void;
};

export type ScoreContextType = {
  coinAmount: number;
  score: number;
  changeCoinAmount: (amount: number) => void;
  increaseScore: (amount: number) => void;
};