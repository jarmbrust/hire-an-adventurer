'use client';

import {
  HomeIcon,
  UsersIcon,
  ShoppingCartIcon,
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
];

export default function NavLinks() {
  const { theme } = useTheme();
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={ link.name }
            href={ link.href}
            className={ clsx(
              'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-200 text-gray-500 p-3 text-sm'
              + 'font-medium hover:bg-gray-400  md:flex-none md:justify-start md:p-2 md:px-3',
              {
                'bg-gray-300 text-gray-600': pathname === link.href && theme === 'light',
                'bg-gray-600 text-gray-300': pathname === link.href && theme === 'dark',
              },
            ) }
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{ link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
