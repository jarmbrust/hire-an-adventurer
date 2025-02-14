'use client';

import {
  // DocumentDuplicateIcon,
  HomeIcon,
  UsersIcon,
  // UserIcon,
} from '@heroicons/react/24/outline';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { name: 'Home', href: '/', icon: HomeIcon },
  {
    name: 'Available Adventurers',
    href: '/adventurers',
    icon: UsersIcon,
  },
  // { name: 'Adventurer Profile', href: `/adventurers`, icon: UserIcon },
];

export default function NavLinks() {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-200 p-3 text-sm font-medium hover:bg-gray-400 hover:text-white md:flex-none md:justify-start md:p-2 md:px-3',
              {
                'bg-gray-400 text-gray-600': pathname === link.href,
              },
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
