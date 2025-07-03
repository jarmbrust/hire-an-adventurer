'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSelectedAdventurers } from '@/context/selected-adventurers-context';
import { increaseScore } from '@/app/lib/features/score/score-slice';
import { useAppStore } from '@/app/lib/hooks';
import Button from '@/app/ui/button';
import Modal from '@/app/ui/modal';
import CombatResolution from '@/app/ui/combat-resolution';
import randomlySelectedMonsters from '@/app/lib/randomly-selected-monsters';
import { type Adventurer, type Monster } from '@/app/lib/definitions';

const CombatPage = () => {
  const {
    hiredAdventurers,
    adventurersInCombat,
    combatEngaged,
    slayAdventurers,
    adventurerVictory,
  } = useSelectedAdventurers();
  const [theMonster, setTheMonster] = useState<Monster | null>(null);
  const [showNoneHiredModal, setShowNoneHiredModal] = useState(false);
  const [showResolutionModal, setShowResolutionModal] = useState(false);
  const [monsterDefeated, setMonsterDefeated] = useState<boolean>(false);
  const [adventurersList, setAdventurersList] = useState<Adventurer[]>([]);

  const store = useAppStore();

  const getTheMonsters = () => {
    setTheMonster(randomlySelectedMonsters());
  };

  useEffect(() => {
    const resolveCombat = (partyAttackValue: number) => {
      if (theMonster && partyAttackValue > theMonster.attackPower) {
        setMonsterDefeated(true);
        setAdventurersList(hiredAdventurers);
        adventurerVictory();
        store.dispatch(increaseScore(theMonster.attackPower))
      } else if (theMonster && partyAttackValue < theMonster.attackPower) {
        setMonsterDefeated(false);
        setAdventurersList(hiredAdventurers);
        slayAdventurers();
      }
    };
    if (theMonster) {
      let partyAttackValue: number = 0;
      if (theMonster.flies) {
        partyAttackValue = hiredAdventurers.reduce((total, adventurer) => total + ((Number(adventurer.agility) || 0) * 5) + ((Number(adventurer.arcane) || 0) * 3), 0);
      } else {
        partyAttackValue = hiredAdventurers.reduce((total, adventurer) => total + ((Number(adventurer.strength) || 0) * 5) + ((Number(adventurer.arcane) || 0) * 3), 0);
      }
      if (partyAttackValue && theMonster.attackPower) {
        combatEngaged(true);
        resolveCombat(partyAttackValue);
        setShowResolutionModal(true);
        combatEngaged(false);
      }
    }
  }, [theMonster, hiredAdventurers, slayAdventurers, adventurerVictory, combatEngaged, store]);

  useEffect(() => {
    if (hiredAdventurers.length === 0 && !adventurersInCombat) {
      setShowNoneHiredModal(true);
    }
  }, [hiredAdventurers.length, adventurersInCombat]);

  return (
    <>
      <h2 className="flex justify-center text-2xl font-bold">Combat!!</h2>
      { showNoneHiredModal && <Modal message="No adventurers have been Hired" link="/adventurers" /> }
      { showResolutionModal && <Modal message={
         <CombatResolution monsterDefeated={monsterDefeated} monster={theMonster} adventurers={adventurersList} />
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
              disabled={ adventurersInCombat }
              aria-disabled={ adventurersInCombat }>
              Hire More Adventurers
            </Button>
          </Link>
          &nbsp; or &nbsp;
          <Button
            disabled={ adventurersInCombat }
            aria-disabled={ adventurersInCombat }
            onClick={ getTheMonsters }>
            Fight the monsters!
          </Button>
        </div>

      {adventurersInCombat && theMonster &&
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
