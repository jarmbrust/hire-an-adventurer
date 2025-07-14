'use client';

import Link from 'next/link';
import Image from "next/image";
// import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { type Adventurer } from '@/app/lib/definitions';
import {
  // adventurerAPIPath,
  adventurerDetailsPath,
  // adventurersListAPIPath,
  imageOfAdventurer,
} from '@/app/lib/paths';
import { useGetAdventurersQuery } from '@/app/api/api-slice';
import clsx from 'clsx';

const AdventurersListPage = () => {
  // const [isLoading, setIsLoading] = useState(false);
  const [adventurerListInfo, setAdventurerListInfo] = useState<Adventurer[] | null>(null);


  interface UseGetAdventurersQueryResult {
    data: { adventurers: Adventurer[] };
    isLoading: boolean;
    error: Error;
  }
  const { data: adventurers, isLoading, error } = useGetAdventurersQuery() as UseGetAdventurersQueryResult;

  
  useEffect(() => {
    console.log('Adventurers fetched:', adventurers);
    // console.log(adventurers[1]);
    const adventurerArray = adventurers?.adventurers ?? adventurers;
    if (adventurerArray?.length > 0) {
      // const adventurerArray = Object.values(adventurers);
       console.log(adventurerArray[1]);
      console.log('Adventurer array:', adventurerArray);
      setAdventurerListInfo(
        adventurerArray.map(adventurer => ({
          ...adventurer,
          status: adventurer.status || 'Available',
        }))
      );
    }
  }, [adventurers]);

  const getStatusColor = (status: string) => ({
    'text-blue-500': status === 'Selected',
    'text-gray-500': status === 'Available',
    'text-red-500': status === 'Deceased',
    'text-green-500': status === 'Hired',
  });

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
          adventurerListInfo?.map((adventurer) => (
            <li key={`adventurer-${adventurer.id}`} className="mb-4">
              <Link href={ adventurerDetailsPath(adventurer.id) }>
                <h3 className="text-xl font-bold">{ adventurer.name }
                  <span className={clsx('italic', getStatusColor(adventurer.status))}>
                    { ` (${adventurer.status})` }
                  </span>
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
