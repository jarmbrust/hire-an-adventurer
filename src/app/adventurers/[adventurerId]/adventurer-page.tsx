'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
// import { useDispatch } from 'react-redux';
import Button from '@/app/ui/button';
import { type Adventurer } from '@/app/lib/definitions';
import AdventurerStats from '@/app/ui/adventurer-stats';
// import { updateAdventurerStatus } from '@/app/lib/features/adventurer/adventurer-slice';
// import { getAdventurerById } from '@/app/actions';
import { useGetAdventurersQuery, api } from '@/app/api/api-slice';
import { useAppDispatch } from '@/app/lib/hooks';


const AdventurerDetailsPage = (params: { adventurerId: number })  => {

  const router = useRouter();
  // const [isLoading, setIsLoading] = useState(false);
  const [disableButton, setDisableButton] = useState(false);
  const [hireButton, setHireButton] = useState(false);
  const [adventurerInfo, setAdventurerInfo] = useState<Adventurer | null>(null);

  const { data, isLoading } = useGetAdventurersQuery();
  const dispatch = useAppDispatch();


  useEffect(() => {
    const adventurers: Adventurer[] = data?.adventurers ?? [];
    const adventurer = adventurers.find((a) => a.id === params.adventurerId);
    if (adventurer) {
      setAdventurerInfo(adventurer);
    }
  }, [data?.adventurers, params.adventurerId]);


  const handleOptimisticUpdate = (updatedAdventurer: Adventurer) => {
    dispatch(
      api.util.updateQueryData('getAdventurers', undefined, (draft) => {
        // draft is the cached array of adventurers
        const idx: number = draft.adventurers.findIndex(a => a.id === updatedAdventurer.id);
        if (idx !== -1) {
          draft.adventurers[idx] = { ...draft.adventurers[idx], ...updatedAdventurer };
        }
      })
    );
  };


  useEffect(() => {
    if (adventurerInfo?.condition === 'Fatigued'
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
        console.log('de-selecting adventurer:', adventurerInfo.id);
        handleOptimisticUpdate({ ...adventurerInfo, status: 'Available' });
        // dispatch(updateAdventurerStatus({ payload: { id: adventurerInfo.id, status: 'Available' } }));
      } else if (adventurerInfo?.status === 'Available') {
        console.log('selecting adventurer:', adventurerInfo.id);
        handleOptimisticUpdate({ ...adventurerInfo, status: 'Selected' });
        // dispatch(updateAdventurerStatus({ payload: { id: adventurerInfo.id, status: 'Selected' } }));
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
    if (disableButton && adventurerInfo?.condition === 'Fatigued') {
      return 'Adventurer is fatigued';
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
