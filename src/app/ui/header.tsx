'use client';

import {
  SunIcon,
  MoonIcon
} from '@heroicons/react/24/outline';
import { useSelector } from 'react-redux'
import { useTheme } from '@/context/theme-context';
// import { selectScore } from '@/app/lib/features/score/score-slice';
// import { useAppStore } from '@/app/lib/hooks';

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  // const store = useAppStore();
  const scoreValue = useSelector((store: { score: { score: { value: number } } }) => store.score.score.value);
  return (
    <div className="w-full">
      <div className="flex justify-end text-sm mt-5">
        <span className="flex justify-end text-sm mt-0">
          { theme === 'light'
            ? <SunIcon className="w-6 mt-0 ml-4 mr-4" onClick={ toggleTheme } />
            : <MoonIcon className="w-6 mt-0 ml-4 mr-4" onClick={ toggleTheme } />
          }</span>
        </div>
      <h1 className="flex text-4xl justify-center font-semibold">Hire an Adventurer</h1>
      <p className="flex text-sm justify-center mt-0">Score: { scoreValue }</p>
    </div>
  );
};  

export default Header;