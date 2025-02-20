'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { type CoinsContextType } from '@/app/lib/definitions';

const CoinsContext = createContext<CoinsContextType | undefined>(undefined);

export const CoinsProvider = ({ children }: { children: ReactNode }) => {
  const [coinAmount, setCoinAmount] = useState<number>(100);

  const changeCoinAmount = (amount: number) => {
    setCoinAmount(amount);
  };

  return (
    <CoinsContext.Provider value={{ changeCoinAmount, coinAmount }}>
      {children}
    </CoinsContext.Provider>
  );
};

export const useCoins = () => {
  const context = useContext(CoinsContext);
  if (context === undefined) {
    throw new Error('useCoins must be used within a CoinsProvider');
  }
  return context;
};
