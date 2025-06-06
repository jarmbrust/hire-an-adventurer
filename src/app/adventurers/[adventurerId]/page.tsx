'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Button from '@/app/ui/button';
import { type Adventurer } from '@/app/lib/definitions';
import AdventurerStats from '@/app/ui/adventurer-stats';
import { useSelectedAdventurers } from '@/context/selected-adventurers-context';
// import { adventurerAPIPath } from '@/app/lib/paths';
import { getAdventurerById } from '@/app/actions';

const AdventurerDetailsPage = ({ params }: { params: { adventurerId: number } }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [disableButton, setDisableButton] = useState(false);
  const [hireButton, setHireButton] = useState(false);
  const [adventurerInfo, setAdventurerInfo] = useState<Adventurer | null>(null);
  const { selectAdventurer, getAdventurerStatus, removeSelectedAdventurer } = useSelectedAdventurers();
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchAdventurer = async () => {
      setIsLoading(true);
      try {
        const result = await getAdventurerById(params.adventurerId);
        if (!result) {
          throw new Error('No adventurer found');
        }
        setAdventurerInfo(result);
      } catch (err) {
        console.error(err);
        setError(err instanceof Error ? err : new Error('Failed to fetch adventurer'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchAdventurer();
  }, [params.adventurerId]);

  if (error) {
    throw error;
  }

  useEffect(() => {
    if (getAdventurerStatus(adventurerInfo?.id) === 'Deceased' ||
      getAdventurerStatus(adventurerInfo?.id) === 'Hired') {
      setDisableButton(true);
    };
  }, [getAdventurerStatus, adventurerInfo?.id]);

  const handleHireAdventurer = async () => {

    setHireButton(true);
    setDisableButton(true);
    try {
      if (adventurerInfo && getAdventurerStatus(adventurerInfo.id) === 'Selected') {
        removeSelectedAdventurer(adventurerInfo.id);
      } else if (adventurerInfo && getAdventurerStatus(adventurerInfo.id) === 'Available') {
        selectAdventurer(adventurerInfo);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setHireButton(false);
      setDisableButton(false);
      router.push('/adventurers');
    }
  }

  const buttonText = () => {
    if (hireButton) {
      return 'Selecting...';
    }
    if (disableButton && getAdventurerStatus(adventurerInfo?.id) === 'Deceased') {
      return 'Adventurer is deceased';
    }
    if (disableButton && getAdventurerStatus(adventurerInfo?.id) === 'Hired') {
      return 'Adventurer is already hired';
    }
    if (getAdventurerStatus(adventurerInfo?.id) === 'Selected') {
      return 'Adventurer is selected (click again to de-select)';
    }
    return 'Choose this adventurer';
  }

  return (
    <div className="flex flex-col">
      <span>
        <h1 className="text-3xl font-bold mb-4">
          Adventurer Details
        </h1>
        <Button
          className="mt-4 mb-4 w-full"
          onClick={ handleHireAdventurer }
          disabled={ isLoading || disableButton }
          aria-disabled={ isLoading || disableButton }>
          { buttonText() }
        </Button>
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
      <Button
        className="mt-4 mb-4"
        onClick={ handleHireAdventurer }
        disabled={ isLoading || disableButton }
        aria-disabled={ isLoading || disableButton }>
        { buttonText() }
      </Button>
    </div>
  );
};

export default AdventurerDetailsPage;
