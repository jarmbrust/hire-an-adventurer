import { type Adventurer, type Monster } from "@/app/lib/definitions";

const combatResolutionText = (monsterDefeated: boolean, monster: Monster | null, adventurers: Adventurer[]) => {
  if (!monster) return '';
  console.log(adventurers, adventurers.length);
  const pastTense = adventurers.length === 1 ? 'was' : 'were';
  const adventurerNames: string = adventurers.map((adventurer) => {
    if (adventurers.length === 1) {
      return adventurer.name;
    }
    if (adventurer.name === adventurers[adventurers.length - 1].name) {
      return `and ${adventurer.name}`;
    }
    return adventurer.name;
  }).join(', ');

  if (monsterDefeated && monster.flies) {
    return `The ${monster.name} flew in to attack ${adventurerNames}, 
      but was heroically defeated by them as their ranged power was too strong for it!`;
  }
  if (monsterDefeated && !monster.flies) {
    return `The ${monster.name} charged in to attack ${adventurerNames},
      but was heroically defeated by them as their melee power was too strong for it!`;
  }
  if (!monsterDefeated && monster.flies) {
    return `The ${monster.name} flew in to attack ${adventurerNames}!
      Tragically, ${adventurerNames} did not have the ranged power to slay this threat and ${pastTense} defeated!`;
  }
  if (!monsterDefeated && !monster.flies) {
    return `The ${monster.name} charged in to attack ${adventurerNames}!
      Tragically, ${adventurerNames} did not have the melee power to slay this threat and ${pastTense} defeated!`;
  }
  return 'Error Occurred!!';
}

export default combatResolutionText;