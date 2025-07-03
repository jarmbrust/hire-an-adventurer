'use client';

import Link from 'next/link';
import { clsx } from 'clsx';
import NavLinks from '@/app/ui/nav-links';
import InnLogo from '@/app/ui/inn-logo';
import { useSelectedAdventurers } from '@/context/selected-adventurers-context';
import { useAppSelector } from '@/app/lib/hooks';
import { selectTheme } from '@/app/lib/features/theme/theme-slice';

export default function SideNavbar() {
  const theme = useAppSelector(selectTheme);
  const { adventurersInCombat } = useSelectedAdventurers();

  return (
    <div className="flex h-full flex-col px-3 py-1 md:px-2">
      <Link
        className="mb-2 flex h-20 items-end justify-start rounded-md bg-zinc-600 p-4 md:h-40"
        onClick={ adventurersInCombat ? (e) => e.preventDefault() : undefined }
        href="/"
      >
        <div className="w-32 text-white md:w-40">
          <InnLogo />
        </div>
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className={clsx("hidden h-auto w-full grow rounded-md bg-gray-50 md:block",
          {
            'dark-sidebar': theme === 'dark',
            'light-sidebar': theme === 'light',
          })}>
          <div className="flex flex-col items-center justify-end h-full">
            <p className="text-center text-sm absolute bottom-4 ">
              &copy;2025 James Armbrust
            </p>
          </div>
        </div> 
      </div>
    </div>
  );
}
