'use client'

import { createContext, useContext, useState, ReactNode } from 'react';
import { type Adventurer, type SelectedAdventurersContextType } from '@/app/lib/definitions';

const SelectedAdventurersContext = createContext<SelectedAdventurersContextType | undefined>(undefined);

export const SelectedAdventurersProvider = ({ children }: { children: ReactNode }) => {
  const [selectedAdventurers, setSelectedAdventurers] = useState<Adventurer[]>([]);

  const addAdventurer = (adventurer: Adventurer) => {
    setSelectedAdventurers((prevAdventurers) => [...prevAdventurers, adventurer]);
  };

  const removeAdventurer = (id: number) => {
    setSelectedAdventurers((prevAdventurers) => prevAdventurers.filter((adventurer) => adventurer.id !== id));
  };

  return (
    <SelectedAdventurersContext.Provider value={{ selectedAdventurers, addAdventurer, removeAdventurer }}>
      {children}
    </SelectedAdventurersContext.Provider>
  );
};

export const useSelectedAdventurers = () => {
  const context = useContext(SelectedAdventurersContext);
  if (context === undefined) {
    throw new Error('useSelectedAdventurers must be used within a SelectedAdventurersProvider');
  }
  return context;
};
