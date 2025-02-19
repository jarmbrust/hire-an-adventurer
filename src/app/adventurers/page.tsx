'use client';

import Link from 'next/link';
import Image from "next/image";
import { useEffect, useState } from 'react';
import { useSelectedAdventurers } from '@/context/selected-adventurers-context';
import { Adventurer } from '@/app/lib/definitions';

const fetchAdventurersList = async () => {
  // Simulate a 0.5 second delay to show the loading state
  // for demo purposes only!
  await new Promise(resolve => setTimeout(resolve, 500));

  const response = await fetch(`/api/adventurers-list`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);    
  }

  console.log('response', response);
  const adventurers = await response.json();
  return adventurers;
};

const AdventurersListPage = () => {
  const { findAdventurer } = useSelectedAdventurers();
  const [isLoading, setIsLoading] = useState(false);
  const [adventurerListInfo, setAdventurerListInfo] = useState<Adventurer[] | null>(null);

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
        {isLoading ?
          <>
            <Image 
              src="/images/loading-spinner2.gif"
              alt="placeholder"
              width={75}
              height={75}
            />
          </>
          :
          <>
            {adventurerListInfo?.map((adventurer) => (
              <li key={adventurer.id} className="mb-4">
                <Link href={`adventurers/${adventurer.id}`}>
                  <h3 className="text-xl font-bold">{adventurer.name}
                    <span className="italic text-gray-500">
                      {findAdventurer(adventurer.id) ? ' (Selected)' : ''}
                    </span>
                  </h3>
                  <Image 
                    src={`/images/${adventurer.image}`}
                    alt={adventurer.name}
                    width={300}
                    height={200}
                    className="rounded-lg shadow-md"
                  />
                </Link>
              </li>
            ))}
          </>
        }
      </ul>
    </>
  );
};

export default AdventurersListPage;
