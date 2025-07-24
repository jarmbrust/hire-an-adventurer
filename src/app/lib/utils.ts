
// Randomly selects a monster.  Currently there are 8 possible monsters.
// 1 = giant rat, 2 = dragon, 3 = minotaur, 4 = flying monkeys, 5 = goblins, 
// 6 = flying squirrel, 7 = vorpal bunny, 8 = frost giant
// TODO: Add more monsters and maybe select by name.
export function getRandomMonsterId() {
  const monsterNumber = Math.floor(Math.random() * 20 + 1);
  console.log('Monster Number:', monsterNumber);
  let randomMonsterId = 0;
    switch (monsterNumber) {
    case 1:
    case 2:
    case 3:
    case 4:
      randomMonsterId = 1; // giant rat
      break;
    case 5:
    case 6:
    case 7:
      randomMonsterId = 5; // goblins
      break;
    case 8:
    case 9:
    case 10:
      randomMonsterId = 4 // flying monkeys
      break;
    case 11:
    case 12:
    case 13:
      randomMonsterId = 6; // flying squirrel
      break;
    case 14:
    case 15:
      randomMonsterId = 3; // minotaur
    case 16:
    case 17:
      randomMonsterId = 8; // frost giant
      break;
    case 18:
    case 19:
      randomMonsterId = 2; // dragon
      break;
    case 20:
      randomMonsterId = 7; // vorpal bunny
      break;
  }
  return randomMonsterId;
}