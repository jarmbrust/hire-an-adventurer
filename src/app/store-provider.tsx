'use client'

import { useRef } from 'react';
import { Provider } from 'react-redux';
import { makeStore, AppStore } from '@/app/lib/store';
import { initializeStore } from '@/app/lib/features/score/score-slice';
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
    storeRef.current.dispatch(initializeStore()); // initializes score to 0 and coins to 200
  }

  return <Provider store={storeRef.current}>{children}</Provider>
};
