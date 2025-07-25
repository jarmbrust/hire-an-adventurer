'use client';

import { useRouter } from 'next/navigation';
import Button from '@/app/ui/button';
import { clsx } from 'clsx';
import { useAppSelector } from '@/app/lib/hooks';
import { selectTheme } from '@/app/lib/features/theme/theme-slice';
import { adventurersListPath } from '@/app/lib/paths';

const CombatButtons = (params: { buttonType: string, setCombatEngaged: (value: boolean) => void} ) => {
  const router = useRouter();
  const theme = useAppSelector(selectTheme);

  const handleCombatEngaged = () => {
    params.setCombatEngaged(true);
  };

  const handleClick = () => {
    if (params.buttonType === 'hire') {
      return router.push(adventurersListPath()); 
    } else {
      return handleCombatEngaged();
    }
  };

  return (
    <>
      <Button
        className={clsx(
          'flex h-10 grow items-center justify-center gap-2 rounded-md text-sm mt-4 mb-4'
          + 'font-medium hover:bg-gray-400 hover:rounded-lg md:flex-none md:justify-start md:p-2 md:px-3',
          {
            'bg-gray-500 text-gray-600': theme === 'light',
            'bg-gray-700 text-gray-300': theme === 'dark',
          },
        )}
        onClick={ handleClick } 
      >
        { params.buttonType === 'hire' ? 'Hire more adventurers.' : 'Fight the monsters!!' }
      </Button>
    </>
  );
};

export default CombatButtons;
