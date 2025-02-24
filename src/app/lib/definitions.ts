export type Adventurer = {
  id: number,
  name: string,
  profession: string,
  level: string,
  health: string,
  strength: string,
  cunning: string,
  intellect: string,
  description: string,
  image: string,
  fee: string,
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
  selectAdventurer: (adventurer: Adventurer) => void;
  removeSelectedAdventurer: (id: number) => void;
  findAdventurerStatus: (id: number | undefined) => string;
  clearAdventurers: (adventurerGroup: string) => void;
  hireAdventurers: (adventurers: Adventurer[]) => void;
  slayAdventurers: (adventurers: Adventurer[]) => void;
};

export type CoinsContextType = {
  coinAmount: number;
  changeCoinAmount: (amount: number) => void;
};