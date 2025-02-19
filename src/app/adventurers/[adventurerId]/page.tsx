'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Button } from '@/app/ui/button';
import { type Adventurer } from '@/app/lib/definitions';
import AdventurerStats from '@/app/ui/adventurer-stats';
import { useSelectedAdventurers } from '@/context/selected-adventurers-context';

const fetchAdventurerInfo = async (adventurerId: number) => {

  // Simulate a 1.5 second delay to show the loading state
  // for demo purposes only!
  await new Promise(resolve => setTimeout(resolve, 1500));

  const response = await fetch(`/api/adventurers/${adventurerId}`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const adventurer = await response.json();
  return adventurer;
};

const AdventurerDetailsPage = ({ params }: { params: Promise<{ adventurerId: number }> }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [disableButton, setDisableButton] = useState(false);
  const [hireButton, setHireButton] = useState(false);
  const [adventurerInfo, setAdventurerInfo] = useState<Adventurer | null>(null);
  const { addAdventurer, findAdventurer } = useSelectedAdventurers();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await params;
        const advId = res.adventurerId;
        const adventurer = await fetchAdventurerInfo(advId);
        setAdventurerInfo(adventurer);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [params]);

  useEffect(() => {
    if (findAdventurer(adventurerInfo?.id)) {
      setDisableButton(true);
    };
  }, [findAdventurer, adventurerInfo?.id]);

  const handleHireAdventurer = async () => {
    setHireButton(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      if (adventurerInfo) {
        addAdventurer(adventurerInfo);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setHireButton(false);
    }
  }

  const buttonText = () => {
    if (hireButton) {
      return 'Selecting...';
    }
    if (disableButton) {
      return 'Adventurer selected';
    }
    return 'Hire this adventurer';
  }

  return (
    <>
      <h1 className="text-3xl font-bold mb-4">Adventurer Details</h1>
      {isLoading ?
        <>
          <Image 
            src="/images/loading-spinner2.gif"
            alt="placeholder"
            width={75}
            height={75}
            className="rounded-lg shadow-md"
          />
        </>
        :
        <>
          <AdventurerStats stats={adventurerInfo} />
        </>
      }
      <Button
        onClick={handleHireAdventurer}
        disabled={isLoading || disableButton}
        aria-disabled={isLoading || disableButton}>
        { buttonText() }
      </Button>
    </>
  );
};

export default AdventurerDetailsPage;
