'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSelectedAdventurers } from '@/context/selected-adventurers-context';
// importing the JSON directly file instead of calling the API since even though this will be stored in the DB
// eventually, it is not based on a choice by the user, so will deal that that later.
import { monsters } from '@/monsters.json';
import Button from '@/app/ui/button';
import Modal from '@/app/ui/modal';
import { type Monster } from '@/app/lib/definitions';

const CombatPage = () => {
  const { hiredAdventurers, adventurersInCombat, combatEngaged, slayAdventurers, clearAdventurers } = useSelectedAdventurers();
  const [theMonster, setTheMonster] = useState<Monster | null>(null);
  const [showNoneHiredModal, setShowNoneHiredModal] = useState(false);
  const [showResolutionModal, setShowResolutionModal] = useState(false);
  const [monsterDefeated, setMonsterDefeated] = useState<boolean | null>(null);

  const fightMonsters = () => {
    const monsterNumber = Math.floor(Math.random() * 10 + 1);
    let randomMonsterId = 0
    switch (monsterNumber) {
      case 1:
      case 2:
      case 3:
        randomMonsterId = 1
        break;
      case 4:
      case 5:
        randomMonsterId = 5
        break;
      case 6:
      case 7:
        randomMonsterId = 3
        break;
      case 8:
      case 9:
        randomMonsterId = 4
        break;
      case 10:
        randomMonsterId = 2
        break;
    }
    const selectedMonster = monsters.find((m) => m.id === randomMonsterId) || null;
    setTheMonster(selectedMonster);
  };

  useEffect(() => {
    const resolveCombat = (partyAttackValue: number) => {
      if (theMonster && partyAttackValue > theMonster.attackPower) {
        setMonsterDefeated(true);
        clearAdventurers('hired');
      } else if (theMonster && partyAttackValue < theMonster.attackPower) {
        setMonsterDefeated(false);
        slayAdventurers();
        clearAdventurers('hired');
      }
    };
    if (theMonster) {
      let partyAttackValue: number = 0;
      if (theMonster.flies) {
        partyAttackValue = hiredAdventurers.reduce((total, adventurer) => total + adventurer.rangedPower, 0);
      } else {
        partyAttackValue = hiredAdventurers.reduce((total, adventurer) => total + adventurer.meleePower, 0);
      }
      if (partyAttackValue && theMonster.attackPower) {
        combatEngaged(true);
        resolveCombat(partyAttackValue);
        setShowResolutionModal(true);
        combatEngaged(false);
      }
    }
  }, [theMonster, hiredAdventurers, slayAdventurers, clearAdventurers, combatEngaged]);

  useEffect(() => {
    if (hiredAdventurers.length === 0 && !adventurersInCombat) {
      setShowNoneHiredModal(true);
    }
  }, [hiredAdventurers.length, adventurersInCombat]);

  return (
    <>
      <h2 className="flex justify-center text-2xl font-bold">Combat!!</h2>
      { showNoneHiredModal && <Modal message="No adventurers have been Hired" link="/adventurers" /> }
      { showResolutionModal && <Modal message={ monsterDefeated ? `Your adventurers defeated the ${ theMonster?.name }, congratulations!` : `Your adventurers were defeated by the ${ theMonster?.name }!` } link="/adventurers" /> }
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
            onClick={ fightMonsters }>
            Fight the monsters!
          </Button>
        </div>

      {adventurersInCombat && theMonster &&
      <>
        <p className="flex justify-center mt-6 text-xl">{hiredAdventurers.length > 0 ? (
            "Ready for combat!"
          ) : (
            "You have not hired any adventurers yet."
          )}
        </p>
        <p className="flex mt-4 text-xl justify-center">Your adventurers:</p>
        {hiredAdventurers.map((adventurer) => (
          <div key={adventurer.id}>
            <p className="flex font-bold mt-4 text-2xl justify-center">{adventurer.name}</p>
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
