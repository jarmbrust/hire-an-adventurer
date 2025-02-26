import { type Adventurer, type Monster } from "@/app/lib/definitions";

const CombatResolutionText = (monsterDefeated: boolean, monster: Monster | null, adventurers: Adventurer[]) => {
  if (!monster) return '';
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
    return (
      <>
        The <strong>{ monster.name }</strong> flew in to attack <strong>{ adventurerNames}</strong>, 
        but was heroically defeated by the adventurers!
      </>
    );
  }
  if (monsterDefeated && !monster.flies) {
    return (
      <>
        The <strong>{ monster.name }</strong> charged in to attack <strong>{ adventurerNames }</strong>,
        but was heroically defeated by the adventurers!
      </>
    );
  }
  if (!monsterDefeated && monster.flies) {
    return (
      <>
        The <strong>{ monster.name }</strong> flew in to attack <strong>{ adventurerNames }</strong>!
        Tragically, the adventurers did not have the ranged power to slay this threat and { pastTense } defeated!
      </>
    );
  }
  if (!monsterDefeated && !monster.flies) {
    return (
      <>
        The <strong>{ monster.name }</strong> charged in to attack <strong>{ adventurerNames}</strong>!
        Tragically, the adventurers did not have the melee power to slay this threat and { pastTense } defeated!
      </>
    );
  }
  return <>Error Occurred!!</>;
}

export default CombatResolutionText;