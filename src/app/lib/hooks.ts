import { useDispatch, useSelector, useStore } from 'react-redux';
import type { AppDispatch, AppStore } from './store';
import type { RootState } from './definitions';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppStore = useStore.withTypes<AppStore>();