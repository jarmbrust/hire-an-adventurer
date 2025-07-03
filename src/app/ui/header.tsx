'use client';

import {
  SunIcon,
  MoonIcon
} from '@heroicons/react/24/outline';
import { useDispatch, useSelector } from 'react-redux'
import { selectTheme, toggleTheme } from '../lib/features/theme/theme-slice';
import { useAppSelector } from '@/app/lib/hooks';
import { Theme } from '../lib/definitions';

const Header = () => {
  const dispatch = useDispatch();
  const theme: Theme = useAppSelector((state) => selectTheme(state));
  const scoreValue = useSelector((store: { score: { score: { value: number } } }) => 
    store.score.score.value);
  
  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };
  
  return (
    <div className="w-full">
      <div className="flex justify-end text-sm mt-5">
        <span className="flex justify-end text-sm mt-0">
          { theme === 'light'
            ? <SunIcon className="w-6 mt-0 ml-4 mr-4" onClick={ handleToggleTheme } />
            : <MoonIcon className="w-6 mt-0 ml-4 mr-4" onClick={ handleToggleTheme } />
          }</span>
        </div>
      <h1 className="flex text-4xl justify-center font-semibold">Hire an Adventurer</h1>
      <p className="flex text-sm justify-center mt-0">Score: { scoreValue }</p>
    </div>
  );
};  

export default Header;