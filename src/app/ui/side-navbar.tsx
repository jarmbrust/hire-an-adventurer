'use client';

import { clsx } from 'clsx';
import NavLinks from '@/app/ui/nav-links';
import InnLogo from '@/app/ui/inn-logo';
import { useAppSelector } from '@/app/lib/hooks';
import { selectTheme } from '@/app/lib/features/theme/theme-slice';
import Button from '@/app/ui/button';
import { useRouter } from 'next/navigation';

export default function SideNavbar() {
  const router = useRouter();
  const theme = useAppSelector(selectTheme);
  return (
    <div className="flex h-full flex-col px-3 py-1 md:px-2">
      <Button
        className={clsx("flex h-20 rounded-md p-4 mb-2 md:h-40 justify-center md:justify-start", {
          'dark-sidebar': theme === 'dark',
          'light-sidebar': theme === 'light',
        })}
        onClick={() => router.push('/')} 
      >
        <InnLogo />
      </Button>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className={clsx("hidden h-auto w-full grow rounded-md bg-gray-50 md:block", {
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
