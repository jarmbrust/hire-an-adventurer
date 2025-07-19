'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Modal from "@/app/ui/modal";
import { useAppDispatch, useAppStore } from '@/app/lib/hooks';

import { modifyCoinAmount } from '@/app/lib/features/score/score-slice';
import { useGetAdventurersQuery, api } from '@/app/api/api-slice';
import Button from '@/app/ui/button';
import { adventurerAPIPath, combatPath } from '@/app/lib/paths';
import { AdventurerStatuses, type Adventurer } from '@/app/lib/definitions';

const CartPage = () => {
 // Initialize the store with the default information
  const store = useAppStore();
  const score = store.getState().score;
  const scoreValue = score.score.value;
  const coinAmount = score.score.coins; 
  const { data, isLoading, /*error*/} = useGetAdventurersQuery();

  const [errorMessage, setErrorMessage] = useState('');
  const [totalFee, setTotalFee] = useState(0);
  const [showNoAdventurersModal, setShowNoAdventurersModal] = useState(false);
  const [outOfMoneyModal, setOutOfMoneyModal] = useState(false);
  const [selectedAdventurers, setSelectedAdventurers] = useState<Adventurer[]>([]);
  const [hiredAdventurers, setHiredAdventurers] = useState<Adventurer[]>([]);

  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const adventurers = data?.adventurers ?? [];
    if (adventurers.length <= 0) {
      setShowNoAdventurersModal(true);
      return;
    }
    setSelectedAdventurers(
      adventurers.filter((adventurer: Adventurer) => adventurer.status === AdventurerStatuses.Selected)
    );
    setHiredAdventurers(
      adventurers.filter((adventurer: Adventurer) => adventurer.status === AdventurerStatuses.Hired)
    );
  }, [ data?.adventurers ]);

  // useEffect(() => {

  //   setTotalFee(selectedAdventurers.reduce((acc: number, adventurer: Adventurer) => acc + adventurer.fee, 0));
  //   if (selectedAdventurers.length === 0 && hiredAdventurers.length === 0) setShowNoAdventurersModal(true);
  // }, [ selectedAdventurers, hiredAdventurers ]);

  const handleHireAdventurers = () => {
    if (isLoading) {
      return;
    }
    if(!hasEnoughCoins()) {
      return;
    } else {
      updateAdventurerStatus(selectedAdventurers[0].id, AdventurerStatuses.Hired);
      dispatch(modifyCoinAmount({ coins: -totalFee, type: 'deductCoins' }));
      setHiredAdventurers((prev) => [...prev, ...selectedAdventurers]);
      setSelectedAdventurers([]);
      setTotalFee(0);
      setErrorMessage('');
      setOutOfMoneyModal(false);
      setShowNoAdventurersModal(false);
    }
  };

  const updateAdventurerStatus = async (adventurerId: number, newStatus: AdventurerStatuses) => {
    const updateAdventurer = api.util.updateQueryData('getAdventurers', undefined, (draft) => {
      selectedAdventurers.forEach((adventurer: Adventurer) => {
        const idx: number = draft.adventurers.findIndex(a => a.id === adventurer.id);
        if (idx !== -1 && adventurer.id === adventurerId) {
          draft.adventurers[idx].status = newStatus;
        }
      });
    });
    // TODO: should handle errors
    dispatch(updateAdventurer);
  };

  const handleRemoveAdventurer = (id: number) => {
    updateAdventurerStatus(id, 'Selected');
    dispatch(modifyCoinAmount({ coins: totalFee, type: 'deductCoins' }));
  };

  const hasEnoughCoins = () => {
    if (totalFee > coinAmount) {
      setOutOfMoneyModal(true);
      setErrorMessage('Not enough coins to hire these adventurers.');
      return false;
    }
    setOutOfMoneyModal(false);
    setErrorMessage('');
    return true;
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
          {selectedAdventurers.map((adventurer: Adventurer) => (
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
          {hiredAdventurers.map((adventurer) => (
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
                { adventurer.status || '' }
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
