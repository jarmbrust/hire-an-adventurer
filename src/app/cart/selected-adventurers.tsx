import { useState, useEffect } from 'react';
import Link from 'next/link';
import Button from '@/app/ui/button';
import Modal from "@/app/ui/modal";
import { Adventurer, AdventurerStatuses } from '@/app/lib/definitions';
import { adventurerAPIPath } from '@/app/lib/paths';
import { modifyCoinAmount } from '@/app/lib/features/score/score-slice';
import { useGetAdventurersQuery, api } from '@/app/api/api-slice';
import { useAppDispatch, useAppStore } from '@/app/lib/hooks';

const SelectedAdventurers = () => {
  const [totalFee, setTotalFee] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedAdventurers, setSelectedAdventurers] = useState<Adventurer[]>([]);
  const [showNoAdventurersModal, setShowNoAdventurersModal] = useState(false);
  const [outOfMoneyModal, setOutOfMoneyModal] = useState(false);

  const dispatch = useAppDispatch();
  const { data, isLoading, /*error*/} = useGetAdventurersQuery();
  const store = useAppStore();
  const score = store.getState().score;
  const scoreValue = score.score.value;
  const coinAmount = score.score.coins;

  const aggregateTotalFee = (selected: Adventurer[]) => {
    return selected.reduce((sum, adventurer) => sum + adventurer.fee, 0);
  };

  useEffect(() => {
    const adventurers = data?.adventurers ?? [];
    if (adventurers.length <= 0) {
      setShowNoAdventurersModal(true);
      return;
    }
    const selected = adventurers.filter((adventurer: Adventurer) => adventurer.status === AdventurerStatuses.Selected);
    const hired = adventurers.filter((adventurer: Adventurer) => adventurer.status === AdventurerStatuses.Hired);
    if (selected.length === 0 && hired.length === 0) {
      setShowNoAdventurersModal(true);
    } else {
      setTotalFee(aggregateTotalFee(selected));
      setSelectedAdventurers(selected);
    }
  }, [data?.adventurers]);

  const handleRemoveAdventurer = (id: number) => {
    setSelectedAdventurers((prev) => prev.filter((adventurer: Adventurer) => adventurer.id !== id));
    updateAdventurerStatus(AdventurerStatuses.Available, id);
    const adventurerFee = selectedAdventurers.find((adventurer: Adventurer) => adventurer.id === id)?.fee ?? 0;
    setTotalFee(totalFee - adventurerFee);
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

  const handleHireAdventurers = () => {
    if (isLoading) {
      return;
    }
    if(!hasEnoughCoins()) {
      return;
    } else {
      updateAdventurerStatus(AdventurerStatuses.Hired);
      dispatch(modifyCoinAmount({ coins: totalFee, type: 'deductCoins' }));
      setSelectedAdventurers([]);
      setTotalFee(0);
      setErrorMessage('');
    }
  };

  const updateAdventurerStatus = async (newStatus: AdventurerStatuses, id: number | null = null) => {
    const updateAdventurer = api.util.updateQueryData('getAdventurers', undefined, (draft) => {
      if (id) {
        const idx: number = draft.adventurers.findIndex(a => a.id === id);
        if (idx !== -1) {
          draft.adventurers[idx].status = newStatus
        }
      } else {
        selectedAdventurers.forEach((adventurer: Adventurer) => {
          const idx: number = draft.adventurers.findIndex(a => a.id === adventurer.id);
          if (idx !== -1) {
            draft.adventurers[idx].status = newStatus
          }
        });
      }
    });
    // TODO: should handle errors
    dispatch(updateAdventurer);
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
      { showNoAdventurersModal && <Modal message="No adventurers selected." link="/adventurers" /> }
      { outOfMoneyModal && <Modal message={tooLittleMoneyText()} link="/adventurers" /> }
      <table id="adventurers-table" className="w-full mt-4 border-collapse">
        <thead>
          <tr className="text-2xl font-bold">
            <th className="border border-zinc-500 px-4 py-2">Name</th>
            <th className="border border-zinc-500 px-4 py-2">Fee</th>
            <th className="border border-zinc-500 px-4 py-2">Remove Adventurer</th>
          </tr>
        </thead>
        <tbody>
          {selectedAdventurers.map((adventurer: Adventurer) => (
            <tr key={ adventurer.id }>
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
              { totalFee } silver
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
    </>
  )
}

export default SelectedAdventurers;
