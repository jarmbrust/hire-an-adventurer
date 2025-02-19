'use client';

import Link from 'next/link';
import { useSelectedAdventurers } from '@/context/selected-adventurers-context';

const CartPage = () => {
  const { selectedAdventurers } = useSelectedAdventurers();
  console.log('selectedAdventurers', selectedAdventurers);

  return (
    <>
      <h1 className="text-3xl font-bold">Selected Adventurers</h1>
      <table id="adventurers-table" className="w-full mt-4 border-collapse">
        <thead>
          <tr>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Fee</th>
          </tr>
        </thead>
        <tbody>
          {selectedAdventurers.map((adventurer) => (
            <tr key={adventurer.id}>
              <td className="border px-4 py-2">
                <Link href={`adventurers/${adventurer.id}`}>
                  <h3 className="text-lg font-bold">{adventurer.name}</h3>
                </Link>
              </td>
              <td className="border px-4 py-2">
                {adventurer.fee}
              </td>
            </tr>
          ))}
          <tr className="font-bold">
            <td className="border px-4 py-2">
              <td>Total Cost</td>
            </td>
            <td className="border px-4 py-2">
              {selectedAdventurers.reduce((acc, adventurer) => acc + parseInt(adventurer.fee), 0)}  silver coins
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default CartPage;
