'use client';

import {
  HomeIcon,
  UsersIcon,
  ShoppingCartIcon,
  FireIcon,
} from '@heroicons/react/24/outline';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from '@/context/theme-context';
import {
  adventurersListPath,
  cartPath,
  homePath,
} from '@/app/lib/paths';
import { useSelectedAdventurers } from '@/context/selected-adventurers-context';

const links = [
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
    href: '/combat',
    icon: FireIcon,
  }
];

export default function NavLinks() {
  const { theme } = useTheme();
  const pathname = usePathname();
  const { adventurersInCombat } = useSelectedAdventurers();

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={ link.name }
            href={ link.href }
            onClick={ adventurersInCombat ? (e) => e.preventDefault() : undefined }
            className={ clsx(
              'flex h-[48px] grow items-center justify-center gap-2 rounded-md p-3 text-sm '
              + 'font-medium hover:bg-gray-400 hover:rounded-lg md:flex-none md:justify-start md:p-2 md:px-3',
              {
                'bg-gray-400 text-gray-600': pathname === link.href && theme === 'light',
                'bg-gray-700 text-gray-300': pathname === link.href && theme === 'dark',
                'bg-gray-300 text-gray-600': pathname !== link.href && theme === 'light',
                'bg-gray-600 text-gray-300': pathname !== link.href && theme === 'dark',
              },
            ) }
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{ link.name }</p>
          </Link>
        );
      })}
    </>
  );
}
