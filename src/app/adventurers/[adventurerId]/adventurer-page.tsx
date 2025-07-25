'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import ChooseAdventurerButton from '@/app/adventurers/[adventurerId]/choose-button';
import { type Adventurer } from '@/app/lib/definitions';
import AdventurerStats from '@/app/ui/adventurer-stats';
import { useGetAdventurersQuery } from '@/app/api/api-slice';

const AdventurerDetailsPage = (params: { adventurerId: number })  => {
  const [adventurerInfo, setAdventurerInfo] = useState<Adventurer>({} as Adventurer);
  const { data, isLoading, /*error*/ } = useGetAdventurersQuery();

  useEffect(() => {
    const adventurers: Adventurer[] = data?.adventurers ?? [];
    const adventurer = adventurers.find((adventurer) => adventurer.id === Number(params.adventurerId));
    if (adventurer) {
      setAdventurerInfo(adventurer);
    }
  }, [data?.adventurers, params.adventurerId]);

  return (
    <div className="flex flex-col">
      <span>
        <h2 className="text-3xl font-bold mb-4">
          Adventurer Details
        </h2>
        <ChooseAdventurerButton adventurerInfo={adventurerInfo} />
      </span>
      { isLoading ?
        <Image 
          src="/images/loading-spinner2.gif"
          alt="placeholder"
          width={ 75 }
          height={ 75 }
        />
        :
        <AdventurerStats stats={adventurerInfo} />
      }
      <ChooseAdventurerButton adventurerInfo={adventurerInfo} />
    </div>
  );
};

export default AdventurerDetailsPage;
