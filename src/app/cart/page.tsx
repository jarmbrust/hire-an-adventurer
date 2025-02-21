'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSelectedAdventurers } from '@/context/selected-adventurers-context';
import { useCoins } from '@/context/coins-context';
import { Button } from '@/app/ui/button';

const CartPage = () => {
  const { selectedAdventurers, removeAdventurer } = useSelectedAdventurers();
  const { coinAmount, changeCoinAmount } = useCoins();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [totalFee, setTotalFee] = useState(0);

  useEffect(() => {
    setTotalFee(selectedAdventurers.reduce((acc, adventurer) => acc + parseInt(adventurer.fee), 0));
  }, [selectedAdventurers]);

  console.log('>>', selectedAdventurers, totalFee)

  const handleHireAdventurers = () => {
    if (isLoading) {
      return;
    }
    if (coinAmount < totalFee) {
      setErrorMessage('Not enough coins');
      return;
    }
    setIsLoading(true);
    console.log('Hire adventurers', coinAmount, totalFee);
    changeCoinAmount(coinAmount - totalFee);
    setIsLoading(false);
    setErrorMessage('');
  }
  const handleRemoveAdventurer = (id: number) => {
    const adventurer = selectedAdventurers.find((adventurer) => adventurer.id === id);
    const fee = adventurer ? parseInt(adventurer.fee) : 0;
    setTotalFee((totalFee) => totalFee - fee);
    removeAdventurer(id);
    // selectedAdventurers.filter((adventurer) => adventurer.id !== id);
  }

  return (
    <>
      <h1 className="text-3xl font-bold">Hiring Selected Adventurers</h1>
      <table id="adventurers-table" className="w-full mt-4 border-collapse">
        <thead>
          <tr className="text-2xl font-bold">
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
              <td>
                <button onClick={() => handleRemoveAdventurer(adventurer.id)}>
                  Remove
                </button>
              </td>
            </tr>
          ))}
          <tr className="font-bold">
            <td className="border px-4 py-2">
              Total Fee
            </td>
            <td className="border px-4 py-2">
              {totalFee} cost in gold
            </td>
          </tr>
        </tbody>
      </table>
      <Button
        className="mt-4 mb-4"
        onClick={handleHireAdventurers}
        disabled={isLoading || !!errorMessage || selectedAdventurers.length === 0}
        aria-disabled={isLoading || !!errorMessage || selectedAdventurers.length === 0}>
        {/* { buttonText() } */}
        Hire
      </Button>

      <div className="mt-4">
        <p className="text-2xl font-bold">You have {coinAmount} gold coins</p>
      </div>
    </>
  );
};

export default CartPage;
