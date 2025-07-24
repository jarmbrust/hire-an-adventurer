'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { increaseScore } from '@/app/lib/features/score/score-slice';
import { useAppDispatch } from '@/app/lib/hooks';
import Button from '@/app/ui/button';
import Modal from '@/app/ui/modal';
import CombatResolution from '@/app/ui/combat-resolution';
// import { useRandomlySelectedMonster } from '@/app/lib/hooks';
import { getRandomMonsterId } from '@/app/lib/utils';
import { AdventurerStatuses, type Adventurer, type Monster } from '@/app/lib/definitions';
import { useGetAdventurersQuery, api, useGetMonstersQuery } from '@/app/api/api-slice';
import { 
  adventurersVictorious,
  adventurerConditionAssignment,
  adventurerStatusAssignment
} from '@/app/combat/combat-functions';
import { skipToken } from '@reduxjs/toolkit/query';

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
  const { data, /*isLoading, /*error*/} = useGetAdventurersQuery();
  // const { selectedMonster, /* isLoading, error */ } = useRandomlySelectedMonster();

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
    console.log('in use effect: monsterData:', monsterData);
  }, [monsterData]);


  useEffect(() => {
    console.log('in use effect: data.adventurers:', data?.adventurers);
    const getHiredAdventurers = () => {
      const adventurers = data?.adventurers ?? [];
      return adventurers.filter((adventurer: Adventurer) => adventurer.status === AdventurerStatuses.Hired);
    };

    setHiredAdventurers(getHiredAdventurers());
    if (hiredAdventurers.length === 0) {
      setShowNoAdventurersModal(true);
    } else {
      setShowNoAdventurersModal(false);
    }
  }, [data, hiredAdventurers.length]);

  const resetAdventurerStatus = (async () => {
    const updatedAdventurers = api.util.updateQueryData('getAdventurers', undefined, (draft) => {
      hiredAdventurers.forEach((adventurer: Adventurer) => {
        const idx: number = draft.adventurers.findIndex(a => a.id === adventurer.id);
        if (idx !== -1) {
          draft.adventurers[idx].status = AdventurerStatuses.Available;
        }
      });
    });
    // TODO: should handle errors
    dispatch(updatedAdventurers);
  });
  // }, [hiredAdventurers, dispatch]);


  const updateAdventurerCondition =  (updatedAdventurers: Adventurer[]) => {
    dispatch(api.util.updateQueryData('getAdventurers', undefined, (draft) => {
      updatedAdventurers.forEach((adventurer: Adventurer) => {
        const idx = draft.adventurers.findIndex(a => a.id === adventurer.id);
        if (idx !== -1) {
          draft.adventurers[idx].condition = adventurer.condition;
        }
      });
    }));
    // to persist on the backend
    // await dispatch(api.endpoints.setAdventurerCondition.initiate({ id, condition }));
  // }, [dispatch]);
  };

  // useEffect(() => {
  //   console.log('in use effect')
  //   if (showNoAdventurersModal) {
  //     return;
  //   }
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
  // }, [hiredAdventurers, theMonster, showNoAdventurersModal, combatEngaged, resetAdventurerStatus, dispatch, updateAdventurerCondition]);

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
        <div className="flex justify-center mt-6 text-2xl">
          <Link 
            href="/adventurers">
            <Button
              disabled={ combatEngaged }
              aria-disabled={ combatEngaged }>
              Hire More Adventurers
            </Button>
          </Link>
          &nbsp; or &nbsp;
          <Button
            disabled={ combatEngaged }
            aria-disabled={ combatEngaged }
            onClick={ getTheMonsters }>
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
