'use client';

import {
  HomeIcon,
  UsersIcon,
  ShoppingCartIcon,
  FireIcon,
  QuestionMarkCircleIcon,
  TrophyIcon,
} from '@heroicons/react/24/outline';
import clsx from 'clsx';
import Button from '@/app/ui/button';
import { usePathname, useRouter } from 'next/navigation';
import {
  aboutPath,
  adventurersListPath,
  cartPath,
  combatPath,
  homePath,
  topScoresPath,
} from '@/app/lib/paths';
import { useAppSelector } from '@/app/lib/hooks';
import { selectTheme } from '@/app/lib/features/theme/theme-slice';

const routes = [
  {
    name: 'Home',
    href: homePath(),
    icon: HomeIcon
  },
  {
    name: 'Available Adventurers',
    href: adventurersListPath(),
    icon: UsersIcon,
  },
  { 
    name: 'Adventurer Cart',
    href: cartPath(),
    icon: ShoppingCartIcon
  },
  {
    name: 'Combat',
    href: combatPath(),
    icon: FireIcon,
  },
  // {
  //   name: 'Top Scores',
  //   href: topScoresPath(),
  //   icon: TrophyIcon,
  // },
  {
    name: 'About',
    href: aboutPath(),
    icon: QuestionMarkCircleIcon,
  }
];

const NavLinks = () => {
  const router = useRouter();
  const theme = useAppSelector(selectTheme);
  const pathname = usePathname();
  return (
    <>
      {routes.map((route) => {
        const ButtonIcon = route.icon;
        return (
          <Button
            key={ route.name }
            onClick={() => router.push(route.href)}
            className={ clsx(
              'flex h-[48px] grow items-center justify-center gap-2 rounded-md p-3 text-sm '
              + 'font-medium hover:bg-gray-400 hover:rounded-lg md:flex-none md:justify-start md:p-2 md:px-3',
              {
                'bg-gray-500 text-gray-600': pathname === route.href && theme === 'light',
                'bg-gray-700 text-gray-300': pathname === route.href && theme === 'dark',
                'bg-gray-400 text-gray-600': pathname !== route.href && theme === 'light',
                'bg-gray-600 text-gray-300': pathname !== route.href && theme === 'dark',
              },
            ) }
          >
            <ButtonIcon className="w-6" />
            <p className="hidden md:block">{ route.name }</p>
          </Button>
        );
      })}
    </>
  );
}

export default NavLinks;
