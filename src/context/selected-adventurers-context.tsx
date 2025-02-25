'use client'

import { createContext, useContext, useState, ReactNode } from 'react';
import { type Adventurer, type SelectedAdventurersContextType } from '@/app/lib/definitions';

const SelectedAdventurersContext = createContext<SelectedAdventurersContextType | undefined>(undefined);

export const SelectedAdventurersProvider = ({ children }: { children: ReactNode }) => {
  const [selectedAdventurers, setSelectedAdventurers] = useState<Adventurer[]>([]);
  const [hiredAdventurers, setHiredAdventurers] = useState<Adventurer[]>([]);
  const [deceasedAdventurers, setDeceasedAdventurers] = useState<Adventurer[]>([]);
  const [adventurersInCombat, setAdventurersInCombat] = useState<boolean>(false);

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

  const getAdventurerStatus = (id: number | undefined): string => {
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

  const slayAdventurers = () => {
    setDeceasedAdventurers((prevDeceasedAdventurers) => {
      const slainAdventurers = [...prevDeceasedAdventurers, ...hiredAdventurers];
      return slainAdventurers;
    });
    setHiredAdventurers([]);
  };

  const combatEngaged = (inCombat: boolean) => {
    setAdventurersInCombat(inCombat);
  };

  return (
    <SelectedAdventurersContext.Provider
      value={{
        selectedAdventurers,
        hiredAdventurers,
        deceasedAdventurers,
        adventurersInCombat,
        selectAdventurer,
        removeSelectedAdventurer,
        getAdventurerStatus,
        clearAdventurers,
        hireAdventurers,
        slayAdventurers,
        combatEngaged,
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
