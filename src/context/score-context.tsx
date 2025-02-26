'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { type ScoreContextType } from '@/app/lib/definitions';

const ScoreContext = createContext<ScoreContextType | undefined>(undefined);

export const ScoreProvider = ({ children }: { children: ReactNode }) => {
  const [coinAmount, setCoinAmount] = useState<number>(200);
  const [score, setScore] = useState<number>(0);

  const changeCoinAmount = (amount: number) => {
    setCoinAmount(amount);
  };

  const increaseScore = (amount: number) => {
    setScore(score => score + amount);
  };

  return (
    <ScoreContext.Provider value={{ score, coinAmount, increaseScore, changeCoinAmount }}>
      {children}
    </ScoreContext.Provider>
  );
};

export const useScore = () => {
  const context = useContext(ScoreContext);
  if (context === undefined) {
    throw new Error('useScore must be used within a ScoreProvider');
  }
  return context;
};
