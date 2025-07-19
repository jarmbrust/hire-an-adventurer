export type Adventurer = {
  id: number;
  name: string;
  profession: string;
  strength: string;
  agility: string;
  arcane: string;
  description: string;
  image: string;
  fee: number;
  successes: number;
  defeats: number;
  victoryPhrase: string;
  condition: AdventurerCondition;
  status: AdventurerStatuses;
};

export const AdventurerStatuses = {
  Selected: 'Selected',
  Available: 'Available',
  Deceased: 'Deceased',
  Hired: 'Hired',
} as const;

export type AdventurerStatuses = typeof AdventurerStatuses[keyof typeof AdventurerStatuses];
export type AdventurerCondition = 'Healthy' | 'Fatigued' | 'Injured' | 'Dead' | 'Unknown';

export type Monster = {
  id: number;
  name: string;
  flies: boolean;
  description: string;
  image: string;
  victoryPhrase: string;
  attackPower: number;
};

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
