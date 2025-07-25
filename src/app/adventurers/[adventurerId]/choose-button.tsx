import { useEffect, useState } from 'react';
import Button from '@/app/ui/button';
import { useAppSelector } from '@/app/lib/hooks';
import { useRouter } from 'next/navigation';
import { selectTheme } from '@/app/lib/features/theme/theme-slice';
import { type Adventurer, AdventurerStatuses } from '@/app/lib/definitions';
import { adventurersListPath } from '@/app/lib/paths';
import { useAppDispatch } from '@/app/lib/hooks';
import { adventurerApi } from '@/app/api/api-slice';
import { AdventurerConditions } from '@/app/lib/definitions';
import clsx from 'clsx';


const ChooseAdventurerButton = (params: { adventurerInfo: Adventurer }) => {
  const theme = useAppSelector(selectTheme);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [disableButton, setDisableButton] = useState(false);
  
  const returnToAdventurersList = () => {
    router.push(adventurersListPath());
  };

  useEffect(() => {
    if (params.adventurerInfo.condition === AdventurerConditions.Dead 
      || params.adventurerInfo.status === AdventurerStatuses.Hired) {
      setDisableButton(true);
    };
  }, [params.adventurerInfo.condition, params.adventurerInfo.status]);

  const buttonText = () => {
    if (params.adventurerInfo.condition === AdventurerConditions.Fatigued) {
      return 'Adventurer is fatigued';
    }
    if (params.adventurerInfo.condition === AdventurerConditions.Injured) {
      return 'Adventurer is injured';
    }
    if (disableButton && params.adventurerInfo.condition === AdventurerConditions.Dead) {
      return 'Adventurer is dead';
    }
    if (disableButton && params.adventurerInfo.status === AdventurerStatuses.Hired) {
      return 'Adventurer is already hired';
    }
    if (params.adventurerInfo.status === AdventurerStatuses.Selected) {
      return 'Adventurer is selected (click again to de-select)';
    }
    return 'Choose this adventurer';
  }

  const handleStatusChange = (adventurerId: number, newStatus: AdventurerStatuses) => {
    if (adventurerId <= 0 || !params.adventurerInfo) {
      console.error('Invalid adventurer ID or adventurer info:', adventurerId, params.adventurerInfo);
      return;
    }
    dispatch(
      adventurerApi.util.updateQueryData('getAdventurers', undefined, (draft) => {
        const idx: number = draft.adventurers.findIndex(a => a.id === adventurerId);
        if (idx !== -1) {
          draft.adventurers[idx].status = newStatus;
        }
      })
    );
    returnToAdventurersList();
  };
  return (
    <Button
      className={clsx(
        'flex w-full mt-4 mb-4 h-10 grow items-center justify-center rounded-md text-sm'
        + 'font-medium hover:bg-gray-400 hover:rounded-lg md:flex-none md:justify-start md:p-2 md:px-3',
        {
          'bg-gray-500 text-gray-600': theme === 'light',
          'bg-gray-700 text-gray-300': theme === 'dark',
        },
      )}
      onClick={() => handleStatusChange(
        params.adventurerInfo?.id ?? 0, 
        params.adventurerInfo?.status === AdventurerStatuses.Selected 
          ? AdventurerStatuses.Available 
          : AdventurerStatuses.Selected
      )}
      disabled={ disableButton }
      aria-disabled={ disableButton }>
      { buttonText() }
    </Button>
  )
}

export default ChooseAdventurerButton;