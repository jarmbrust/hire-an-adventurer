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

export type Theme = 'light' | 'dark';

export type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
};

export type SelectedAdventurersContextType = {
  selectedAdventurers: Adventurer[];
  addAdventurer: (adventurer: Adventurer) => void;
  removeAdventurer: (id: number) => void;
  findAdventurer: (id: number | undefined) => Adventurer | undefined;
};

export type CoinsContextType = {
  coinAmount: number;
  changeCoinAmount: (amount: number) => void;
};