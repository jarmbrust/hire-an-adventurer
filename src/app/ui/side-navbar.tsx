'use client';

import Link from 'next/link';
import { clsx } from 'clsx';
import NavLinks from '@/app/ui/nav-links';
import InnLogo from '@/app/ui/inn-logo';
import { useTheme } from '@/context/theme-context';

export default function SideNavbar() {
  const { theme } = useTheme();

  return (
    <div className="flex h-full flex-col px-3 py-1 md:px-2">
      <Link
        className="mb-2 flex h-20 items-end justify-start rounded-md bg-zinc-600 p-4 md:h-40"
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
        </div> 
      </div>
    </div>
  );
}
