'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Modal from "@/app/ui/modal";
import { useSelectedAdventurers } from '@/context/selected-adventurers-context';
import { useAppStore } from '@/app/lib/hooks';
import { initializeStore, deductCoins } from '@/app/lib/features/score/score-slice';
import Button from '@/app/ui/button';
import { adventurerAPIPath, combatPath } from '@/app/lib/paths';

const CartPage = () => {
  const {
    selectedAdventurers,
    hiredAdventurers,
    deceasedAdventurers,
    getAdventurerStatus,
    removeSelectedAdventurer,
    clearAdventurers,
    hireAdventurers,
  } = useSelectedAdventurers();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [totalFee, setTotalFee] = useState(0);
  const [showNoAdventurersModal, setShowNoAdventurersModal] = useState(false);
  const [outOfMoneyModal, setOutOfMoneyModal] = useState(false);
  const [adventurersHiredOrDeceased, setAdventurersHiredOrDeceased] = useState([...hiredAdventurers, ...deceasedAdventurers]);
  const router = useRouter();

 // Initialize the store with the product information
  const store = useAppStore();
  const score = store.getState().score;
  const scoreValue = score.score.value;
  const coinAmount = score.score.coins; 
  const initialized = useRef(false)
  if (!initialized.current) {
    store.dispatch(initializeStore());
    initialized.current = true
  }
  // const name = useAppSelector(state => state.product.name)
  // const dispatch = useAppDispatch()



  useEffect(() => {
    setTotalFee(selectedAdventurers.reduce((acc, adventurer) => acc + adventurer.fee, 0));
    if (selectedAdventurers.length === 0 && hiredAdventurers.length === 0) setShowNoAdventurersModal(true);
  }, [selectedAdventurers, hiredAdventurers]);

  const handleHireAdventurers = () => {
    if (isLoading) {
      return;
    }
    if (store.getState().score.score.coins < totalFee) {
      setErrorMessage('Not enough coins');
      setOutOfMoneyModal(true);
      return;
    }
    setIsLoading(true);
    store.dispatch(deductCoins(totalFee));
    hireAdventurers(selectedAdventurers);
    clearAdventurers('selected');
    setIsLoading(false);
    setErrorMessage('');
    setAdventurersHiredOrDeceased([...adventurersHiredOrDeceased, ...selectedAdventurers]);
  };

  const handleRemoveAdventurer = (id: number) => {
    const adventurer = selectedAdventurers.find((adventurer) => adventurer.id === id);
    const fee = adventurer ? adventurer.fee : 0;
    setTotalFee((totalFee) => totalFee - fee);
    removeSelectedAdventurer(id);
  };

  const engageAdventurersInCombat = () => {
    router.push(combatPath());
  };

  const tooLittleMoneyText = () => {
    return (
      <>
        You are too low on silver to hire these adventurers, please choose less expensive adventurers or restart the game if too many are slain or you have too few coins.
        <span className="block">Your current score is <strong>{ scoreValue  }</strong> and you have <strong>{ coinAmount }</strong> silver left.</span>
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
                <Link href={ adventurerAPIPath(adventurer.id || 0) }>
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
                <Link href={ adventurerAPIPath(adventurer.id || 0) }>
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
