'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Modal from "@/app/ui/modal";
import { useSelectedAdventurers } from '@/context/selected-adventurers-context';
import { useCoins } from '@/context/coins-context';
import { Button } from '@/app/ui/button';
import { adventurerDetailsPath, combatPath } from '@/app/lib/paths';

const CartPage = () => {
  const {
    selectedAdventurers,
    removeAdventurer,
    clearAdventurers,
    hireAdventurers,
  } = useSelectedAdventurers();
  const { coinAmount, changeCoinAmount } = useCoins();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [totalFee, setTotalFee] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setTotalFee(selectedAdventurers.reduce((acc, adventurer) => acc + parseInt(adventurer.fee), 0));
    if (selectedAdventurers.length === 0) setShowModal(true);
  }, [selectedAdventurers]);

  const handleHireAdventurers = () => {
    if (isLoading) {
      return;
    }
    if (coinAmount < totalFee) {
      setErrorMessage('Not enough coins');
      return;
    }
    setIsLoading(true);
    changeCoinAmount(coinAmount - totalFee);
    hireAdventurers(selectedAdventurers);
    clearAdventurers();
    setIsLoading(false);
    setErrorMessage('');
    forwardToCombat();
  };

  const handleRemoveAdventurer = (id: number) => {
    const adventurer = selectedAdventurers.find((adventurer) => adventurer.id === id);
    const fee = adventurer ? parseInt(adventurer.fee) : 0;
    setTotalFee((totalFee) => totalFee - fee);
    removeAdventurer(id);
  };

  const forwardToCombat = () => {
    setTimeout(() => {
      router.push(combatPath())
    }, 2000);  
  };

  return (
    <>
      <h1 className="text-3xl font-bold">Hiring Selected Adventurers</h1>
      {showModal && <Modal message="No adventurers selected" link="/adventurers" />}
      <table id="adventurers-table" className="w-full mt-4 border-collapse">
        <thead>
          <tr className="text-2xl font-bold">
            <th className="border border-zinc-500 px-4 py-2">Name</th>
            <th className="border border-zinc-500 px-4 py-2">Fee</th>
            <th className="border border-zinc-500 px-4 py-2">Remove Adv.</th>
          </tr>
        </thead>
        <tbody>
          {selectedAdventurers.map((adventurer) => (
            <tr key={adventurer.id}>
              <td className="border border-zinc-500 px-4 py-2">
                <Link href={ adventurerDetailsPath(adventurer.id || 0) }>
                  <h3 className="text-lg font-bold">{ adventurer.name || '' }</h3>
                </Link>
              </td>
              <td className="border border-zinc-500 px-4 py-2">
                { adventurer.fee }
              </td>
              <td className="border border-zinc-500 px-4 py-2"> 
                <button onClick={ () => handleRemoveAdventurer(adventurer.id || 0) }>
                  Remove
                </button>
              </td>
            </tr>
          ))}
          <tr className="font-bold">
            <td className="border border-zinc-500 px-4 py-2 text-xl">
              Total Fee
            </td>
            <td className="border border-zinc-500 px-4 py-2 text-xl">
              { totalFee}
            </td>
            <td className="border border-zinc-500 px-4 py-2"></td>
          </tr>
        </tbody>
      </table>
      <Button
        className="mt-4 mb-4"
        onClick={ handleHireAdventurers }
        disabled={ isLoading || !!errorMessage || selectedAdventurers.length === 0 }
        aria-disabled={ isLoading || !!errorMessage || selectedAdventurers.length === 0 }>
        Hire and Continue to Combat
      </Button>
      { errorMessage && <p className="text-red-500 mt-4">{ errorMessage }</p> }
      <div className="mt-4">
        <p className="text-2xl font-bold">You have { coinAmount } gold coins</p>
      </div>
    </>
  );
};

export default CartPage;
