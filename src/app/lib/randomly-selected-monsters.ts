// importing the JSON directly file instead of calling the API since even though this will be stored in the DB
// eventually, it is not based on a choice by the user, so will deal that that later.
import { monsters } from '@/monsters.json';

const randomlySelectedMonsters = () => {
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
  // setTheMonster(selectedMonster);
  return selectedMonster;
};

export default randomlySelectedMonsters;