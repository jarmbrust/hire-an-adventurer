'use client'

import { createContext, useContext, useState, ReactNode } from 'react';
import { type Adventurer, type SelectedAdventurersContextType } from '@/app/lib/definitions';

const SelectedAdventurersContext = createContext<SelectedAdventurersContextType | undefined>(undefined);

export const SelectedAdventurersProvider = ({ children }: { children: ReactNode }) => {
  const [selectedAdventurers, setSelectedAdventurers] = useState<Adventurer[]>([]);
  const [hiredAdventurers, setHiredAdventurers] = useState<Adventurer[]>([]);
  const [deceasedAdventurers, setDeceasedAdventurers] = useState<Adventurer[]>([]);

  const selectAdventurer = (adventurer: Adventurer) => {
    if (!selectedAdventurers.some((a) => a.id === adventurer.id)) {
      setSelectedAdventurers((prevAdventurers) => [...prevAdventurers, adventurer]);
    }
  };

  const removeSelectedAdventurer = (id: number) => {
    const adventurers = selectedAdventurers.filter((adventurer) => adventurer.id !== id);
    setSelectedAdventurers(adventurers);
  };

  const clearAdventurers = (adventurerGroup: string) => {
    if (adventurerGroup === 'selected') {
      setSelectedAdventurers([]);
    }
    if (adventurerGroup === 'hired') {
      setHiredAdventurers([]);
    }
    if (adventurerGroup === 'deceased') {
      setDeceasedAdventurers([]);
    }
  };

  const findAdventurerStatus = (id: number | undefined): string => {
    if (!id) return 'Unknown';
    if (deceasedAdventurers.find((adventurer) => adventurer.id === id)) {
      return 'Deceased';
    }
    if (hiredAdventurers.find((adventurer) => adventurer.id === id)) {
      return 'Hired';
    }
    if (selectedAdventurers.find((adventurer) => adventurer.id === id)) {
      return 'Selected';
    }
    return 'Available'
  };

  const hireAdventurers = (adventurers: Adventurer[]) => {
    setHiredAdventurers((prevAdventurers) => [...prevAdventurers, ...adventurers]);
  };

  const slayAdventurers = (adventurers: Adventurer[]) => {
    setDeceasedAdventurers((prevAdventurers) => [...prevAdventurers, ...adventurers]);
  };

  return (
    <SelectedAdventurersContext.Provider
      value={{
        selectedAdventurers,
        hiredAdventurers,
        deceasedAdventurers,
        selectAdventurer,
        removeSelectedAdventurer,
        findAdventurerStatus,
        clearAdventurers,
        hireAdventurers,
        slayAdventurers,
      }}
    >
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
