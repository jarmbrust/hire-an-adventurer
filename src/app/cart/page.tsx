'use client';

import Link from 'next/link';
import { useSelectedAdventurers } from '@/context/selected-adventurers-context';

const CartPage = () => {
  const { selectedAdventurers } = useSelectedAdventurers();
  console.log('selectedAdventurers', selectedAdventurers);

  return (
    <>
      <h1 className="text-3xl font-bold">Selected Adventurers</h1>
      <ul className="flex flex-wrap gap-4 mt-4">
        {selectedAdventurers.map((adventurer) => (
          <li key={adventurer.id} className="mb-4">
            <Link href={`adventurers/${adventurer.id}`}>
              <h3 className="text-xl font-bold">{adventurer.name}</h3>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default CartPage;
