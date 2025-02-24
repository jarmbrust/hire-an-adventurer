'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSelectedAdventurers } from '@/context/selected-adventurers-context';
// importing the JSON file instead of calling the API since even though this likely will be stored in the DB
// it is not based on a choice by the user, so will deal that that later.
import { monsters } from '@/monsters.json';
import Button from '@/app/ui/button';
import Modal from '@/app/ui/modal';
import { type Monster } from '@/app/lib/definitions';

const CombatPage = () => {
  const { hiredAdventurers } = useSelectedAdventurers();
  const [monsterId, setMonsterId] = useState<number>(0);
  const [theMonster, setTheMonster] = useState<Monster>({ id: 0, name: '', flies: false, health: '', description: '', image: '', attackPower: 0 });
  const [startCombat, setStartCombat] = useState(false);
  const [showModal, setShowModal] = useState(false);

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
    setMonsterId(randomMonsterId);
  };

  useEffect(() => {
    if (monsterId !== 0) {
      const selectedMonster = monsters.find((m) => m.id === monsterId) || { id: 0, name: '', flies: false, health: '', description: '', image: '', attackPower: 0 };
      setTheMonster(selectedMonster);
      setStartCombat(true);
    }
  }, [monsterId]);

  useEffect(() => {
    if (hiredAdventurers.length === 0) {
      setShowModal(true);
    }
  }, [hiredAdventurers.length]);

  return (
    <>
      <h2 className="flex text-3xl font-bold">Combat</h2>
      { showModal && <Modal message="No adventurers have been Hired" link="/adventurers" /> }
      <p className="flex justify-center mt-6 text-2xl">These are the adventurers you have hired:</p>
      { hiredAdventurers.map((adventurer) => (
        <div key={adventurer.id}>
          <p className="flex mt-4 text-lg justify-center bold">{ adventurer.name }</p>
        </div>
      )) }
      <div className="flex justify-center mt-6 text-2xl">Would you like to:</div>
        <div className="flex justify-center mt-6 text-2xl">
          <Link 
            href="/adventurers">
            <Button>
              Hire More Adventurers
            </Button>
          </Link>
          &nbsp; or &nbsp;
          <Button
            onClick={ fightMonsters }>
            Fight the monsters!
          </Button>
        </div>

      {startCombat && theMonster.id !== 0 &&
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
            <p className="flex mt-4 text-lg justify-center bold">{adventurer.name}</p>
          </div>
        ))}
        <p className="flex mt-4 text-4xl justify-center">VS</p>
        <p className="flex mt-4 text-lg justify-center bold">{theMonster.name}</p>
      </>
      }
    </>
  );
}

export default CombatPage;
