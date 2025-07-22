'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { increaseScore } from '@/app/lib/features/score/score-slice';
import { useAppDispatch } from '@/app/lib/hooks';
import Button from '@/app/ui/button';
import Modal from '@/app/ui/modal';
import CombatResolution from '@/app/ui/combat-resolution';
import randomlySelectedMonsters from '@/app/lib/randomly-selected-monsters';
import { AdventurerStatuses, type Adventurer, type Monster } from '@/app/lib/definitions';
import { useGetAdventurersQuery, api } from '@/app/api/api-slice';
import { adventurersVictorious, adventurerConditionAssignment } from '@/app/combat/combat-functions';

const CombatPage = () => {
  const [theMonster, setTheMonster] = useState<Monster | null>(null);
  const [showNoneHiredModal, setShowNoneHiredModal] = useState(false);
  const [showResolutionModal, setShowResolutionModal] = useState(false);
  const [monsterDefeated, setMonsterDefeated] = useState<boolean>(false);
  const [combatEngaged, setCombatEngaged] = useState<boolean>(false);
  const [hiredAdventurers, setHiredAdventurers] = useState<Adventurer[]>([]);

  const dispatch = useAppDispatch();
  // TODO: should handle errors
  const { data, /*isLoading, /*error*/} = useGetAdventurersQuery();
  
  const getTheMonsters = () => {
    setTheMonster(randomlySelectedMonsters());
  };

  useEffect(() => {
    const getHiredAdventurers = () => {
      const adventurers = data?.adventurers ?? [];
      return adventurers.filter((adventurer: Adventurer) => adventurer.status === AdventurerStatuses.Hired);
    };

    setHiredAdventurers(getHiredAdventurers());
    if (hiredAdventurers.length === 0) {
      setShowNoneHiredModal(true);
    } else {
      setShowNoneHiredModal(false);
    }
  }, [data?.adventurers, hiredAdventurers.length]);

  const updateAdventurerStatus = useCallback(async (adventurerId: number, newStatus: AdventurerStatuses) => {
    const updateAdventurer = api.util.updateQueryData('getAdventurers', undefined, (draft) => {
      hiredAdventurers.forEach((adventurer: Adventurer) => {
        const idx: number = draft.adventurers.findIndex(a => a.id === adventurer.id);
        if (idx !== -1 && adventurer.id === adventurerId) {
          draft.adventurers[idx].status = newStatus;
        }
      });
    });
    // TODO: should handle errors
    dispatch(updateAdventurer);
  }, [dispatch, hiredAdventurers]);

  useEffect(() => {
    if (showNoneHiredModal) {
      return;
    }
    if (hiredAdventurers.length > 0 && theMonster && !combatEngaged) {
      setCombatEngaged(true);
      const adventurersWin = adventurersVictorious(theMonster, hiredAdventurers);
      if (adventurersWin) {
        setMonsterDefeated(true);
        dispatch(increaseScore(theMonster.attackPower));
        hiredAdventurers.forEach(adventurer => {
          adventurer.status = AdventurerStatuses.Available;
        });
      } else {
        setMonsterDefeated(false);
        adventurerConditionAssignment(hiredAdventurers, true);
      }
      updateAdventurerStatus(hiredAdventurers[0].id, AdventurerStatuses.Available);
      setHiredAdventurers([]);
      setCombatEngaged(false);
      setShowResolutionModal(true);
    }
  }, [hiredAdventurers, theMonster, showNoneHiredModal, combatEngaged, dispatch, updateAdventurerStatus]);

  return (
    <>
      <h2 className="flex justify-center text-2xl font-bold">Combat!!</h2>
      { showNoneHiredModal && <Modal message="No adventurers have been Hired" link="/adventurers" /> }
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
