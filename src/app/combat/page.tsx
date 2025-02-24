'use client';

import { useState } from 'react';
import { useSelectedAdventurers } from '@/context/selected-adventurers-context';
// importing the JSON file instead of calling the API since even though this likely will be stored in the DB
// it is not based on a choice by the user, so will deal that that later.
import { monsters } from '@/monsters.json';
import { Button } from '@/app/ui/button';
import { type Monster } from '@/app/lib/definitions';

const CombatPage = () => {
  const { hiredAdventurers } = useSelectedAdventurers();
  const [monsterId, setMonsterId] = useState<number | undefined>(undefined);
  const [theMonster, setTheMonster] = useState<Monster>({ id: 0, name: '', flies: false, health: '', description: '', image: '', attackPower: 0 });
  const [disableMonsterButton, setDisableMonsterButton] = useState<boolean>(false);

  const chooseMonster = () => {
    console.log("Choose Monster");
    const monsterNumber = Math.floor(Math.random() * 10 + 1);
    switch (monsterNumber) {
      case 1:
      case 2:
      case 3:
        console.log("Giant Rat");
        // setTheMonster(monsters.find((m) => m.id === 1) || { id: 0, name: '', flies: false, health: '', description: '', image: '', attackPower: 0 });
        setMonsterId(1);
        break;
      case 4:
      case 5:
        console.log("Goblin Raiders");
        setMonsterId(5);
        break;
      case 6:
      case 7:
        console.log("Minotaur");
        setMonsterId(3);
        break;
      case 8:
      case 9:
        console.log("Swarm of Flying Monkeys");
        setMonsterId(4);
        break;
      case 10:
        console.log("Dragon");
        setMonsterId(2);
        break;
    }
    setTheMonster(monsters.find((m) => m.id === monsterId) || { id: 0, name: '', flies: false, health: '', description: '', image: '', attackPower: 0 });
    setDisableMonsterButton(true);
  };

  return (
    <>
      <h2 className="flex text-3xl font-bold">Combat</h2>
      <Button onClick={chooseMonster} 
        disabled={disableMonsterButton} 
        aria-disabled={disableMonsterButton}>
        Reveal Monster
      </Button>

      <p className="flex justify-center mt-6 text-xl">{hiredAdventurers.length > 0 ? (
            "Ready for combat!"
          ) : (
            "You have not hired any adventurers yet."
          )}
      </p>
      <p className="flex mt-4 text-xl justify-center">Your adventurers:</p>
      {hiredAdventurers.map((adventurer) => (
        <div key={adventurer.id}>
          <p className="flex mt-4 text-lg justify-center">{adventurer.name}</p>
        </div>
      ))}
      <p className="flex mt-4 text-4xl justify-center">VS</p>
      <p className="flex mt-4 text-lg justify-center">{theMonster.name}</p>
      
    </>
  );
}

export default CombatPage;
