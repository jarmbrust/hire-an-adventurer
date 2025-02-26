'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Modal from "@/app/ui/modal";
import { useSelectedAdventurers } from '@/context/selected-adventurers-context';
import { useScore } from '@/context/score-context';
import Button from '@/app/ui/button';
import { adventurerDetailsPath, combatPath } from '@/app/lib/paths';

const CartPage = () => {
  const {
    selectedAdventurers,
    hiredAdventurers,
    deceasedAdventurers,
    removeSelectedAdventurer,
    clearAdventurers,
    hireAdventurers,
  } = useSelectedAdventurers();
  const { score, coinAmount, changeCoinAmount } = useScore();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [totalFee, setTotalFee] = useState(0);
  const [showNoAdventurersModal, setShowNoAdventurersModal] = useState(false);
  const [outOfMoneyModal, setOutOfMoneyModal] = useState(false);
  const [adventurersHiredOrDeceased, setAdventurersHiredOrDeceased] = useState([...hiredAdventurers, ...deceasedAdventurers]);
  const router = useRouter();

  useEffect(() => {
    setTotalFee(selectedAdventurers.reduce((acc, adventurer) => acc + parseInt(adventurer.fee), 0));
    if (selectedAdventurers.length === 0 && hiredAdventurers.length === 0) setShowNoAdventurersModal(true);
  }, [selectedAdventurers, hiredAdventurers]);

  const handleHireAdventurers = () => {
    if (isLoading) {
      return;
    }
    if (coinAmount < totalFee) {
      setErrorMessage('Not enough coins');
      setOutOfMoneyModal(true);
      return;
    }
    setIsLoading(true);
    changeCoinAmount(coinAmount - totalFee);
    hireAdventurers(selectedAdventurers);
    clearAdventurers('selected');
    setIsLoading(false);
    setErrorMessage('');
    setAdventurersHiredOrDeceased([...adventurersHiredOrDeceased, ...selectedAdventurers]);
  };

  const handleRemoveAdventurer = (id: number) => {
    const adventurer = selectedAdventurers.find((adventurer) => adventurer.id === id);
    const fee = adventurer ? parseInt(adventurer.fee) : 0;
    setTotalFee((totalFee) => totalFee - fee);
    removeSelectedAdventurer(id);
  };

  const getAdventurerStatus = (id: number | undefined): string => {
    if (!id) return 'Unknown';
    if (deceasedAdventurers.find((adventurer) => adventurer.id === id)) {
      return 'Deceased';
    }
    if (hiredAdventurers.find((adventurer) => adventurer.id === id)) {
      return 'Hired';
    }
    if (selectedAdventurers.find((adventurer) => adventurer.id === id)) {
      return 'Selected';
    }
    return 'Available'
  };

  const engageAdventurersInCombat = () => {
    router.push(combatPath());
  };

  const tooLittleMoneyText = () => {
    return (
      <>
        You are too low on silver to hire these adventurers, please choose less expensive adventurers or restart the game if too many are slain or you have too few coins.
        <span className="block">Your current score is <strong>{score}</strong> and you have <strong>{coinAmount}</strong> silver left.</span>
      </>
    );
  };

  return (
    <>
      <h2 className="text-3xl font-bold">Hiring Selected Adventurers</h2>
      { showNoAdventurersModal && <Modal message="No adventurers selected." link="/adventurers" /> }
      { outOfMoneyModal && <Modal message={tooLittleMoneyText()} link="/adventurers" /> }
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
              { totalFee} silver
            </td>
            <td className="border border-zinc-500 px-4 py-2"></td>
          </tr>
        </tbody>
      </table>
      <Button
        className="mt-4 mb-4"
        onClick={ handleHireAdventurers }
        disabled={ isLoading || selectedAdventurers.length === 0 }
        aria-disabled={ isLoading || selectedAdventurers.length === 0 }>
        Hire Adventurers
      </Button>
      { errorMessage && <p className="text-red-500 mt-4">{ errorMessage }</p> }
      <div className="mt-4">
        <p className="text-2xl font-bold">You have { coinAmount } silver coins</p>
      </div>

      <h2 className="mt-8 text-2xl font-bold">Hired Adventurers</h2>
      <table id="hired-adventurers-table" className="w-full mt-2 border-collapse">
        <thead>
          <tr className="text-2xl font-bold">
            <th className="border border-zinc-500 px-4 py-2">Name</th>
            <th className="border border-zinc-500 px-4 py-2">Profession</th>
            <th className="border border-zinc-500 px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {adventurersHiredOrDeceased.map((adventurer) => (
            <tr key={adventurer.id}>
              <td className="border border-zinc-500 px-4 py-2">
                <Link href={ adventurerDetailsPath(adventurer.id || 0) }>
                  <h3 className="text-lg font-bold">{ adventurer.name || '' }</h3>
                </Link>
              </td>
              <td className="border border-zinc-500 px-4 py-2">
                { adventurer.profession || '' }
              </td>
              <td className="border border-zinc-500 px-4 py-2"> 
                { getAdventurerStatus(adventurer.id) }
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Button
        className="mt-4 mb-4"
        onClick={ engageAdventurersInCombat }
        disabled={ hiredAdventurers.length === 0 }
        aria-disabled={ hiredAdventurers.length === 0 }>
        Go to Combat Page!
      </Button>
    </>
  );
};

export default CartPage;
