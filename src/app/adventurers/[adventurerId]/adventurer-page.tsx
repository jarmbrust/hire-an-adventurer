'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Button from '@/app/ui/button';
import { type Adventurer, AdventurerConditions, AdventurerStatuses } from '@/app/lib/definitions';
import AdventurerStats from '@/app/ui/adventurer-stats';
import { useGetAdventurersQuery, api } from '@/app/api/api-slice';
import { useAppDispatch } from '@/app/lib/hooks';

const AdventurerDetailsPage = (params: { adventurerId: number })  => {
  const router = useRouter();
  const [disableButton, setDisableButton] = useState(false);
  const [adventurerInfo, setAdventurerInfo] = useState<Adventurer | null>(null);
  const { data, isLoading, /*error*/ } = useGetAdventurersQuery();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const adventurers: Adventurer[] = data?.adventurers ?? [];
    const adventurer = adventurers.find((adventurer) => adventurer.id === Number(params.adventurerId));
    if (adventurer) {
      setAdventurerInfo(adventurer);
    }
  }, [data?.adventurers, params.adventurerId]);

  const returnToAdventurersList = () => {
    router.push('/adventurers');
  };

  const handleStatusChange = (adventurerId: number, newStatus: AdventurerStatuses) => {
    if (adventurerId <= 0 || !adventurerInfo) {
      console.error('Invalid adventurer ID or adventurer info:', adventurerId, adventurerInfo);
      return;
    }
    dispatch(
      api.util.updateQueryData('getAdventurers', undefined, (draft) => {
        const idx: number = draft.adventurers.findIndex(a => a.id === adventurerId);
        if (idx !== -1) {
          draft.adventurers[idx].status = newStatus;
        }
      })
    );
    returnToAdventurersList();
  };

  useEffect(() => {
    if (adventurerInfo?.condition === AdventurerConditions.Dead || adventurerInfo?.status === AdventurerStatuses.Hired) {
      setDisableButton(true);
    };
  }, [adventurerInfo]);

  const buttonText = () => {
    if (adventurerInfo?.condition === AdventurerConditions.Fatigued) {
      return 'Adventurer is fatigued';
    }
    if (adventurerInfo?.condition === AdventurerConditions.Injured) {
      return 'Adventurer is injured';
    }
    if (disableButton && adventurerInfo?.condition === AdventurerConditions.Dead) {
      return 'Adventurer is dead';
    }
    if (disableButton && adventurerInfo?.status === AdventurerStatuses.Hired) {
      return 'Adventurer is already hired';
    }
    if (adventurerInfo?.status === AdventurerStatuses.Selected) {
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
          onClick={() => handleStatusChange(
            adventurerInfo?.id ?? 0, 
            adventurerInfo?.status === AdventurerStatuses.Selected ? AdventurerStatuses.Available :  AdventurerStatuses.Selected
          )}
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
        onClick={() => handleStatusChange(
          adventurerInfo?.id ?? 0, 
          adventurerInfo?.status === AdventurerStatuses.Selected ? AdventurerStatuses.Available :  AdventurerStatuses.Selected
        )}
        disabled={ isLoading || disableButton }
        aria-disabled={ isLoading || disableButton }>
        { buttonText() }
      </Button>
    </div>
  );
};

export default AdventurerDetailsPage;
