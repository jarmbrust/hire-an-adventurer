'use client';

import Link from 'next/link';
import Image from "next/image";
import {
  adventurerDetailsPath,
  imageOfAdventurer,
} from '@/app/lib/paths';
import { useGetAdventurersQuery } from '@/app/api/api-slice';
import clsx from 'clsx';
import { type Adventurer, AdventurerConditions, AdventurerStatuses } from '@/app/lib/definitions';

const AdventurersListPage = () => {
  const { data, isLoading, /*error*/ } = useGetAdventurersQuery();
  const adventurers = data?.adventurers ?? [];

  const getStatusColor = (adventurer: Adventurer) => ({
    'text-blue-500': adventurer.status === AdventurerStatuses.Selected,
    'text-gray-500': adventurer.status === AdventurerStatuses.Available,
    'text-yellow-500': adventurer.condition === AdventurerConditions.Fatigued,
    'text-orange-500': adventurer.condition === AdventurerConditions.Injured,
    'text-red-500': adventurer.condition === AdventurerConditions.Dead,
    'text-green-500': adventurer.status === AdventurerStatuses.Hired,
  });

  const getAdventurerStatusCondition = (adventurer: Adventurer) => {
    if (adventurer.status === AdventurerStatuses.Hired) {
      return 'Hired';
    }
    if (adventurer.status === AdventurerStatuses.Selected) {
      return 'Selected';
    }
    if (adventurer.condition === AdventurerConditions.Injured 
      || adventurer.condition === AdventurerConditions.Fatigued) {
      return `${adventurer.status} but ${adventurer.condition}`;
    }
    if (adventurer.condition === AdventurerConditions.Dead) {
      return 'Dead';
    }
    return 'Available';
  };

  return (
    <>
      <h1 className="text-3xl font-bold">Available Adventurers</h1>
      <ul className="flex flex-wrap gap-4 mt-4">
        {isLoading ? (
          <li key="loading-state">
            <Image 
              src="/images/loading-spinner2.gif"
              alt="placeholder"
              width={75}
              height={75}
            />
          </li>
         ) : (
          adventurers.map((adventurer: Adventurer) => (
            <li key={`adventurer-${adventurer.id}`} className="mb-4">
              <Link href={ adventurerDetailsPath(adventurer.id) }>
                <h3 className="text-xl font-bold">{ adventurer.name }
                  <div className={clsx('italic', getStatusColor(adventurer))}>
                    { ` (${getAdventurerStatusCondition(adventurer)})` }
                  </div>
                </h3>
                <Image 
                  src={ imageOfAdventurer(adventurer.image) }
                  alt={ adventurer.name}
                  width={ 300 }
                  height={ 200 }
                  style={{ width: 'auto', height: 'auto' }}
                  className="rounded-lg shadow-md"
                  priority={ true }
                />
              </Link>
            </li>
          ))
        )}
      </ul>
    </>
  );
};

export default AdventurersListPage;
