'use client'

import { useRef } from 'react';
import { Provider } from 'react-redux';
import { makeStore, AppStore } from '@/app/lib/store';
import { initializeScores } from '@/app/lib/features/score/score-slice';
// import { initializeAdventurers } from '@/app/lib/features/adventurer/adventurer-slice';
/**
 * StoreProvider component initializes the Redux store and provides it to the application.
 * It ensures that the store is created only once and persists across re-renders.
 */
export default function StoreProvider({
  children
}: {
  children: React.ReactNode
}) {
  const storeRef = useRef<AppStore | null>(null)
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore();
    storeRef.current.dispatch(initializeScores()); // initializes score to 0 and coins to 200
    // storeRef.current.dispatch(initializeAdventurers([])); // initializes adventurers to an empty array
    console.log('Store initialized with initial state:', storeRef.current.getState());
  }

  return <Provider store={storeRef.current}>{children}</Provider>
};
