'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Button from '@/app/ui/button';
import { type Adventurer } from '@/app/lib/definitions';
import AdventurerStats from '@/app/ui/adventurer-stats';
import { updateAdventurerStatus } from '@/app/lib/features/adventurer/adventurer-slice';
import { getAdventurerById } from '@/app/actions';

const AdventurerDetailsPage = (params: { adventurerId: string })  => {

  
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [disableButton, setDisableButton] = useState(false);
  const [hireButton, setHireButton] = useState(false);
  const [adventurerInfo, setAdventurerInfo] = useState<Adventurer | null>(null);

  const [error, setError] = useState<Error | null>(null);

  const dispatch = useDispatch();

  useEffect(() => {
    const adventurerId = params.adventurerId ? parseInt(params.adventurerId, 10) : 0;
    console.log('Adventurer ID:', adventurerId);
    const fetchAdventurer = async () => {
      setIsLoading(true);
      try {
        const result = await getAdventurerById(adventurerId);
        console.log('Fetched Adventurer:', result);
        if (!result) {
          throw new Error('No adventurer found');
        }
        result.status = result.status || 'Available';
        setAdventurerInfo(result);
      } catch (error) {
        console.error(error);
        setError(error instanceof Error ? error : new Error('Failed to fetch adventurer'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchAdventurer();
  }, [params]);

  if (error) {
    throw error;
  }

  useEffect(() => {
    if (adventurerInfo?.condition === 'Dead'
      || adventurerInfo?.condition === 'Injured'
      || adventurerInfo?.status === 'Hired'
    ) {
      setDisableButton(true);
    };
  }, [adventurerInfo]);

  const handleHireAdventurer = async () => {
    console.log('handleHireAdventurer called');
    setHireButton(true);
    setDisableButton(true);
    console.log('handleHireAdventurer called with:', adventurerInfo, 'and status:', adventurerInfo?.status);
    try {
      console.log('Hiring adventurer!!!!!:', adventurerInfo?.id);
      if (adventurerInfo?.status === 'Selected') {
        dispatch(updateAdventurerStatus({ payload: { id: adventurerInfo.id, status: 'Available' } }));
      } else if (adventurerInfo?.status === 'Available') {
        console.log('selecting adventurer:', adventurerInfo.id);
        dispatch(updateAdventurerStatus({ payload: { id: adventurerInfo.id, status: 'Selected' } }));
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
    if (disableButton && adventurerInfo?.condition === 'Dead') {
      return 'Adventurer is deceased';
    }
    if (disableButton && adventurerInfo?.condition === 'Injured') {
      return 'Adventurer is injured';
    }
    if (disableButton && adventurerInfo?.status === 'Hired') {
      return 'Adventurer is already hired';
    }
    if (adventurerInfo?.status === 'Selected') {
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
