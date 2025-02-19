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
  cost: string,
};

export type SelectedAdventurersContextType = {
  selectedAdventurers: Adventurer[];
  addAdventurer: (adventurer: Adventurer) => void;
  removeAdventurer: (id: number) => void;
  findAdventurer: (id: number | undefined) => Adventurer | undefined;
};
