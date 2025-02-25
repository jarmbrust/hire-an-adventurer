'use client';

import {
  SunIcon,
  MoonIcon
} from '@heroicons/react/24/outline';
import { useTheme } from '@/context/theme-context';
import { useScore } from '@/context/score-context';

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const { score } = useScore();

  return (
    <div className="w-full">
      <div className="flex justify-end text-sm mt-5">
        <span >
          Theme: 
        </span>
        <span className="flex justify-end text-sm mt-0">
          { theme === 'light'
            ? <SunIcon className="w-6 mt-0 ml-4 mr-4" onClick={ toggleTheme } />
            : <MoonIcon className="w-6 mt-0 ml-4 mr-4" onClick={ toggleTheme } />
          }</span>
        </div>
      <h1 className="flex text-4xl justify-center font-semibold">Hire an Adventurer</h1>
      <p className="flex text-sm justify-center mt-0">Score: { score }</p>
    </div>
  );
};  

export default Header;