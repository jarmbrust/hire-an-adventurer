'use client';

import { useState, useEffect, useCallback } from 'react';
import { skipToken } from '@reduxjs/toolkit/query';
import { increaseScore } from '@/app/lib/features/score/score-slice';
import { useAppDispatch } from '@/app/lib/hooks';
import Modal from '@/app/ui/modal';
import CombatResolution from '@/app/ui/combat-resolution';
import { AdventurerStatuses, type Adventurer, type Monster } from '@/app/lib/definitions';
import { useGetAdventurersQuery, adventurerApi, useGetMonstersQuery } from '@/app/api/api-slice';
import { 
  adventurersVictorious,
  adventurerConditionAssignment,
  adventurerStatusAssignment
} from '@/app/combat/combat-functions';
import { getRandomMonsterId } from '@/app/lib/utils';
import CombatButtons from '@/app/combat/combat-buttons';

const CombatPage = () => {
  const [theMonster, setTheMonster] = useState<Monster | null>(null);
  const [randomMonsterId, setRandomMonsterId] = useState<number | null>(null);
  const [showNoAdventurersModal, setShowNoAdventurersModal] = useState(false);
  const [showResolutionModal, setShowResolutionModal] = useState(false);
  const [monsterDefeated, setMonsterDefeated] = useState<boolean>(false);
  const [combatEngaged, setCombatEngaged] = useState<boolean>(false);
  const [hiredAdventurers, setHiredAdventurers] = useState<Adventurer[]>([]);

  const dispatch = useAppDispatch();
  // TODO: should handle errors
  const { data: adventurerData, /*isLoading, /*error*/} = useGetAdventurersQuery();
  const { data: monsterData, /*isLoading: monsterLoading, error: monsterError*/ } = useGetMonstersQuery(
    randomMonsterId !== null ? { id: randomMonsterId } : skipToken
  );

  useEffect(() => {
    setRandomMonsterId(getRandomMonsterId());
  }, []);

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
    if (combatEngaged && theMonster && hiredAdventurers.length > 0) {
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
  }, [combatEngaged, theMonster, hiredAdventurers, dispatch, resetAdventurerStatus, updateAdventurerCondition]);

  return (
    <>
      <h2 className="flex justify-center text-2xl font-bold">Combat!!</h2>
      { showNoAdventurersModal && <Modal message="No adventurers have been Hired" link="/adventurers" /> }
      { showResolutionModal && <Modal message={
         <CombatResolution monsterDefeated={monsterDefeated} monster={theMonster} adventurers={hiredAdventurers}/>
        } link="/adventurers" /> 
      }

      <p className="flex justify-center mt-6 mb-6 text-2xl">These are the adventurers you have hired:</p>
      { hiredAdventurers.map((adventurer) => (
        <div key={adventurer.id}>
          <p className="flex mt-3 text-3xl justify-center font-bold font-sans text-yellow-100">{ adventurer.name }</p>
        </div>
      )) }

      <div className="flex justify-center mt-8 text-xl">Would you like to:</div>
      <div className="flex justify-center align-text-bottom mt-4 text-2xl">
        <CombatButtons buttonType="hire" setCombatEngaged={setCombatEngaged} />
        <span className="flex justify-center align-text-bottom mt-4 text-2xl px-4">or</span>
        <CombatButtons buttonType="fight" setCombatEngaged={setCombatEngaged} />
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
