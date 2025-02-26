import React, { useEffect, useState } from 'react';
import CombatResolutionText from '@/app/ui/combat-resolution-text';
import { type Adventurer, type Monster } from '@/app/lib/definitions';

const CombatResolution = ({ 
  monsterDefeated, monster, adventurers
}: {
  monsterDefeated: boolean, monster: Monster | null, adventurers: Adventurer[]
}) => {
  const [theMonsters, setTheMonsters] = useState<Monster | null>(null);
  const [theAdventurers, setTheAdventurers] = useState<Adventurer[]>([]);

  useEffect(() => {
    setTheMonsters(monster);
    setTheAdventurers(adventurers);
  }, [monster, adventurers]);

  return (
    <>
      { CombatResolutionText(monsterDefeated, theMonsters, theAdventurers) }
    </>
  );
};

export default CombatResolution;