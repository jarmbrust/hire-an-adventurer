import { type Adventurer, type Monster } from "@/app/lib/definitions";

const CombatResolutionText = (monsterDefeated: boolean, monster: Monster | null, adventurers: Adventurer[]) => {
  if (!monster) return '';
  const pastTense = adventurers.length === 1 ? 'was' : 'were';
  const plural = adventurers.length === 1 ? '' : 's';
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
        The <strong>{ monster.name }</strong> flew in to attack <strong>{ adventurerNames }</strong>, 
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
        <span className="mt-4">Tragically, the adventurer{ plural } { pastTense } defeated and { monster.victoryPhrase }!!</span>
      </>
    );
  }
  if (!monsterDefeated && !monster.flies) {
    return (
      <>
        The <strong>{ monster.name }</strong> charged in to attack <strong>{ adventurerNames}</strong>!
        <span className="mt-4">Tragically, the adventurer{ plural } { pastTense } defeated and { monster.victoryPhrase }!!</span>
      </>
    );
  }
  return <>Error Occurred!!</>;
}

export default CombatResolutionText;