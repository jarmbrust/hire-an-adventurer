'use client';

import Link from 'next/link';
import Image from "next/image";
import { useEffect, useState } from 'react';
import { useSelectedAdventurers } from '@/context/selected-adventurers-context';
import { Adventurer } from '@/app/lib/definitions';
import {
  // adventurerAPIPath,
  adventurerDetailsPath,
  adventurersListAPIPath,
  imageOfAdventurer,
} from '@/app/lib/paths';
import clsx from 'clsx';

const fetchAdventurersList = async () => {
  try {
    const response = await fetch(adventurersListAPIPath());
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);    
    }
    const data = await response.json();
    return data.adventurers;
  } catch (error) {
    console.error('Error fetching adventurers:', error);
    throw error;
  }
};

const AdventurersListPage = () => {
  const { getAdventurerStatus } = useSelectedAdventurers();
  const [isLoading, setIsLoading] = useState(false);
  const [adventurerListInfo, setAdventurerListInfo] = useState<Adventurer[] | null>(null);

  const getStatusColor = (status: string) => ({
    'text-blue-500': status === 'Selected',
    'text-gray-500': status === 'Available',
    'text-red-500': status === 'Deceased',
    'text-green-500': status === 'Hired',
  });

  useEffect(() => {
    const fetchData = async () => {
      if (adventurerListInfo) {
        return;
      }
      setIsLoading(true);
      try {
        const adventurers = await fetchAdventurersList();
        setAdventurerListInfo(adventurers);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [adventurerListInfo]);

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
                  <span className={clsx('italic', getStatusColor(getAdventurerStatus(adventurer.id)))}>
                    { ` (${getAdventurerStatus(adventurer.id)})` }
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
