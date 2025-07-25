'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Button from '@/app/ui/button';
import SelectedAdventurers from '@/app/cart/selected-adventurers';
import { adventurerDetailsPath, combatPath } from '@/app/lib/paths';
import { useGetAdventurersQuery } from '@/app/api/api-slice';
import { selectTheme } from '@/app/lib/features/theme/theme-slice';
import { AdventurerStatuses, type Adventurer } from '@/app/lib/definitions';
import { useAppSelector } from '@/app/lib/hooks';
import clsx from 'clsx';

const CartPage = () => {
  const [hiredAdventurers, setHiredAdventurers] = useState<Adventurer[]>([]);
  const router = useRouter();
  const theme = useAppSelector(selectTheme);
  const { data, /*isLoading, /*error*/} = useGetAdventurersQuery();

  useEffect(() => {
    const getHiredAdventurers = () => {
      const adventurers = data?.adventurers ?? [];
      return adventurers.filter((adventurer: Adventurer) => adventurer.status === AdventurerStatuses.Hired);
    }

    setHiredAdventurers(getHiredAdventurers());  
  }, [data?.adventurers]);

  const engageAdventurersInCombat = () => {
    router.push(combatPath());
  };

  return (
    <>
      <h2 className="text-3xl font-bold">Hiring Selected Adventurers</h2>
      <SelectedAdventurers />
      <h3 className="mt-8 text-2xl font-bold">Hired Adventurers</h3>
      <table id="hired-adventurers-table" className="w-full mt-2 border-collapse">
        <thead>
          <tr className="text-2xl font-bold">
            <th className="border border-zinc-500 px-4 py-2">Name</th>
            <th className="border border-zinc-500 px-4 py-2">Profession</th>
            <th className="border border-zinc-500 px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {hiredAdventurers.map((adventurer) => (
            <tr key={adventurer.id}>
              <td className="border border-zinc-500 px-4 py-2">
                <Link href={ adventurerDetailsPath(adventurer.id) }>
                  <h4 className="text-lg font-bold">{ adventurer.name }</h4>
                </Link>
              </td>
              <td className="border border-zinc-500 px-4 py-2">
                { adventurer.profession || '' }
              </td>
              <td className="border border-zinc-500 px-4 py-2"> 
                { adventurer.status || '' }
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Button
        className={clsx(
          'flex h-10 grow items-center justify-center gap-2 rounded-md p-3 text-sm  mt-4 mb-4'
          + 'font-medium hover:bg-gray-400 hover:rounded-lg md:flex-none md:justify-start md:p-2 md:px-3',
          {
            'bg-gray-500 text-gray-600': theme === 'light',
            'bg-gray-700 text-gray-300': theme === 'dark',
          },
        )}
        onClick={ engageAdventurersInCombat }
        disabled={ hiredAdventurers.length === 0 }
        aria-disabled={ hiredAdventurers.length === 0 }>
        Go to Combat Page!
      </Button>
    </>
  );
};

export default CartPage;
