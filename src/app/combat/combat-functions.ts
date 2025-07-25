import {
  Adventurer,
  AdventurerConditions,
  AdventurerStatuses,
  Monster
} from '@/app/lib/definitions';

export const adventurersVictorious = (theMonster: Monster, hiredAdventurers: Adventurer[]): boolean => {
  let partyAttackValue: number = 0;
  const arcaneMultiplier = 3;
  const strengthMultiplier = 4;
  const agilityMultiplier = 4;
  
  if (theMonster.flies) {
    partyAttackValue = hiredAdventurers.reduce((total, adventurer) => 
      total + ((Number(adventurer.agility) || 0) * agilityMultiplier) + ((Number(adventurer.arcane) || 0) * arcaneMultiplier), 0);
  } else {
    partyAttackValue = hiredAdventurers.reduce((total, adventurer) => 
      total + ((Number(adventurer.strength) || 0) * strengthMultiplier) + ((Number(adventurer.arcane) || 0) * arcaneMultiplier), 0);
  }
  console.log('partyAttackValue:', partyAttackValue);
  console.log('theMonsterAttackPower:', theMonster.attackPower);
  return partyAttackValue > theMonster.attackPower ? true : false; 
};

export const adventurerConditionAssignment = (adventurers: Adventurer[], adventurersDefeated: boolean): Adventurer[] => {
  const modifiedAdventurers: Adventurer[] = [];
  if (adventurersDefeated) {
    adventurers.forEach(adventurer => {
      const modifier = adventurerConditionModifier(adventurer.condition);
      modifiedAdventurers.push({
        ...adventurer,
        condition: adventurerAfflictions(modifier)
      });
    });
  } else {
    adventurers.forEach(adventurer => {
       modifiedAdventurers.push({
        ...adventurer,
        condition: AdventurerConditions.Healthy
      });
    });
  }
  return modifiedAdventurers;
};

export const adventurerStatusAssignment = (adventurer: Adventurer, newStatus: AdventurerStatuses): Adventurer => {
  return {
    ...adventurer,
    status: newStatus
  }
}

const adventurerConditionModifier = (currentCondition: AdventurerConditions): number => {
  if (currentCondition === AdventurerConditions.Healthy) {
    return 0;
  } else if (currentCondition === AdventurerConditions.Fatigued) {
    return 2;
  } else if (currentCondition === AdventurerConditions.Injured) {
    return 4;
  }
  throw new Error(`Unknown adventurer condition: ${currentCondition}`);
};

const adventurerAfflictions = (modifier: number): AdventurerConditions => {
  // Randomly select an affliction for the adventurer, can be from 1 to 6.
  // There can be a +2 to +4 modifier to the affliction based on the the condition
  // of the adventurer when they entered combat.
  // Results: 1-3: Fatigued, 4-6: Injured, 7-10: Dead
  console.log('Modifier:', modifier);
  const conditionNumber = Math.floor(Math.random() * 6 + 1) + modifier;
  console.log('Condition Number:', conditionNumber);
  switch (conditionNumber) {
    case 1:
    case 2:
    case 3:
      return AdventurerConditions.Fatigued;
    case 4:
    case 5:
    case 6:
      return AdventurerConditions.Injured;
    case 7:
    case 8:
    case 9:
    case 10:
      return AdventurerConditions.Dead;
    default:
      return AdventurerConditions.Fatigued;
  }
};
