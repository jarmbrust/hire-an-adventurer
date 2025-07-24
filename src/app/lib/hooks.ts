import { useDispatch, useSelector, useStore } from 'react-redux';
import type { AppDispatch, AppStore } from '@/app/lib/store';
import type { RootState } from '@/app/lib/definitions';
import { useGetMonstersQuery } from '@/app/api/api-slice';

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppStore = useStore.withTypes<AppStore>();

export const useRandomlySelectedMonster = () => {
  const monsterNumber = Math.floor(Math.random() * 20 + 1);
  let randomMonsterId = 0;
  switch (monsterNumber) {
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
      randomMonsterId = 1;
      break;
    case 6:
    case 7:
    case 8:
      randomMonsterId = 5;
      break;
    case 9:
    case 10:
    case 11:
      randomMonsterId = 4
      break;
    case 12:
    case 13:
    case 14:
    case 15:
      randomMonsterId = 6;
      break;
    case 16:
    case 17:
      randomMonsterId = 7;
      break;
    case 18:
    case 19:
      randomMonsterId = 2;
      break;
    case 20:
      randomMonsterId = 8;
      break;
  }

  const { data, isLoading, error } = useGetMonstersQuery({ id: randomMonsterId });
  const selectedMonster = data?.monster ?? null;
  return { selectedMonster, isLoading, error };
};
