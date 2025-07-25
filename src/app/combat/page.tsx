'use client';

import { useState, useEffect, useCallback } from 'react';
import { skipToken } from '@reduxjs/toolkit/query';
import { useRouter } from 'next/navigation';
import { increaseScore } from '@/app/lib/features/score/score-slice';
import { useAppDispatch, useAppSelector } from '@/app/lib/hooks';
import Button from '@/app/ui/button';
import Modal from '@/app/ui/modal';
import CombatResolution from '@/app/ui/combat-resolution';
import { getRandomMonsterId } from '@/app/lib/utils';
import { AdventurerStatuses, type Adventurer, type Monster } from '@/app/lib/definitions';
import { useGetAdventurersQuery, adventurerApi, useGetMonstersQuery } from '@/app/api/api-slice';
import { selectTheme } from '@/app/lib/features/theme/theme-slice';
import { 
  adventurersVictorious,
  adventurerConditionAssignment,
  adventurerStatusAssignment
} from '@/app/combat/combat-functions';
import clsx from 'clsx';

const CombatPage = () => {
  const [theMonster, setTheMonster] = useState<Monster | null>(null);
  const [randomMonsterId, setRandomMonsterId] = useState<number | null>(null);
  const [showNoAdventurersModal, setShowNoAdventurersModal] = useState(false);
  const [showResolutionModal, setShowResolutionModal] = useState(false);
  const [monsterDefeated, setMonsterDefeated] = useState<boolean>(false);
  const [combatEngaged, setCombatEngaged] = useState<boolean>(false);
  const [hiredAdventurers, setHiredAdventurers] = useState<Adventurer[]>([]);

  const dispatch = useAppDispatch();
  const router = useRouter();
  const theme = useAppSelector(selectTheme);
  // TODO: should handle errors
  const { data: adventurerData, /*isLoading, /*error*/} = useGetAdventurersQuery();
  const { data: monsterData, /*isLoading: monsterLoading, error: monsterError*/ } = useGetMonstersQuery(
    randomMonsterId !== null ? { id: randomMonsterId } : skipToken
  );

  const getTheMonsters = () => {
    setRandomMonsterId(getRandomMonsterId());
  };

  useEffect(() => {
    if (monsterData?.monster) {
      setTheMonster(monsterData.monster);
    }
  }, [monsterData]);

  useEffect(() => {
    const getHiredAdventurers = () => {
      const adventurers = adventurerData?.adventurers ?? [];
      return adventurers.filter((adventurer: Adventurer) => adventurer.status === AdventurerStatuses.Hired);
    };

    setHiredAdventurers(getHiredAdventurers());
    if (hiredAdventurers.length === 0) {
      setShowNoAdventurersModal(true);
    } else {
      setShowNoAdventurersModal(false);
    }
  }, [adventurerData, hiredAdventurers.length]);

  const resetAdventurerStatus = useCallback(async () => {
    const updatedAdventurers = adventurerApi.util.updateQueryData('getAdventurers', undefined, (draft) => {
      hiredAdventurers.forEach((adventurer: Adventurer) => {
        const idx: number = draft.adventurers.findIndex(a => a.id === adventurer.id);
        if (idx !== -1) {
          draft.adventurers[idx].status = AdventurerStatuses.Available;
        }
      });
    });
    // TODO: should handle errors
    dispatch(updatedAdventurers);
  }, [hiredAdventurers, dispatch]);

  const updateAdventurerCondition = useCallback(async (updatedAdventurers: Adventurer[]) => {
    dispatch(adventurerApi.util.updateQueryData('getAdventurers', undefined, (draft) => {
      updatedAdventurers.forEach((adventurer: Adventurer) => {
        const idx = draft.adventurers.findIndex(a => a.id === adventurer.id);
        if (idx !== -1) {
          draft.adventurers[idx].condition = adventurer.condition;
        }
      });
    }));
  }, [dispatch]);

  useEffect(() => {
    if (showNoAdventurersModal) {
      return;
    }
    if (hiredAdventurers.length > 0 && theMonster && !combatEngaged) {
      setCombatEngaged(true);
      const adventurersWin = adventurersVictorious(theMonster, hiredAdventurers);
      let updatedAdventurers: Adventurer[] = [];
      if (adventurersWin) {
        setMonsterDefeated(true);
        dispatch(increaseScore(theMonster.attackPower));
        hiredAdventurers.forEach(adventurer => {
          updatedAdventurers.push(adventurerStatusAssignment(adventurer, AdventurerStatuses.Available));
        });
      } else {
        setMonsterDefeated(false);
        updatedAdventurers = adventurerConditionAssignment(hiredAdventurers, true);
      }
      resetAdventurerStatus();
      updateAdventurerCondition(updatedAdventurers);
      setHiredAdventurers([]);
      setCombatEngaged(false);
      setShowResolutionModal(true);
    }
  }, [hiredAdventurers, theMonster, showNoAdventurersModal, combatEngaged, monsterDefeated, dispatch, resetAdventurerStatus, updateAdventurerCondition]);

  return (
    <>
      <h2 className="flex justify-center text-2xl font-bold">Combat!!</h2>
      { showNoAdventurersModal && <Modal message="No adventurers have been Hired" link="/adventurers" /> }
      { showResolutionModal && <Modal message={
         <CombatResolution monsterDefeated={monsterDefeated} monster={theMonster} adventurers={hiredAdventurers} />
        } link="/adventurers" /> 
      }

      <p className="flex justify-center mt-6 text-2xl">These are the adventurers you have hired:</p>
      { hiredAdventurers.map((adventurer) => (
        <div key={adventurer.id}>
          <p className="flex mt-4 text-lg justify-center font-bold">{ adventurer.name }</p>
        </div>
      )) }

      <div className="flex justify-center mt-6 text-2xl">Would you like to:</div>
        <div className="flex justify-center align-text-bottom mt-6 text-2xl">
          {/* TODO: pull out button to make more DRY */}
          <Button
            className={clsx(
              'flex h-10 grow items-center justify-center gap-2 rounded-md p-3 text-sm mt-4 mb-4'
              + 'font-medium hover:bg-gray-400 hover:rounded-lg md:flex-none md:justify-start md:p-2 md:px-3',
              {
                'bg-gray-500 text-gray-600': theme === 'light',
                'bg-gray-700 text-gray-300': theme === 'dark',
              },
            )}
            onClick={ () => router.push('/adventurers') }
            disabled={ combatEngaged }
            aria-disabled={ combatEngaged }>
            Hire More Adventurers
          </Button>
          <span className="flex justify-center align-text-bottom mt-4 text-2xl px-4">or</span>
          <Button
            className={clsx(
              'flex h-10 grow items-center justify-center gap-2 rounded-md p-3 text-sm mt-4 mb-4'
              + 'font-medium hover:bg-gray-400 hover:rounded-lg md:flex-none md:justify-start md:p-2 md:px-3',
              {
                'bg-gray-500 text-gray-600': theme === 'light',
                'bg-gray-700 text-gray-300': theme === 'dark',
              },
            )}
            onClick={ getTheMonsters }
            disabled={ combatEngaged }
            aria-disabled={ combatEngaged }>
            Fight the monsters!
          </Button>
        </div>

      {combatEngaged && theMonster &&
      <>
        <p className="flex justify-center mt-6 text-xl">{ hiredAdventurers.length > 0 ? (
            "Ready for combat!"
          ) : (
            "You have not hired any adventurers yet."
          )}
        </p>
        <p className="flex mt-4 text-xl justify-center">Your adventurers:</p>
        {hiredAdventurers.map((adventurer) => (
          <div key={adventurer.id}>
            <p className="flex font-bold mt-4 text-2xl justify-center">{ adventurer.name }</p>
          </div>
        ))}
        <p className="flex mt-4 text-4xl justify-center">VS</p>
        <p className="flex font-bold mt-4 text-2xl justify-center">{theMonster.name}</p>
      </>
      }
    </>
  );
}

export default CombatPage;
