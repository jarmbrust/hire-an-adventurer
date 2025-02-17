'use client';

import Image from "next/image";
import { useState, useEffect } from "react";
import { Button } from "@/app/ui/button";

const fetchAdventurerInfo = async (adventurerId: number) => {
  await new Promise(resolve => setTimeout(resolve, 1500));
  const response = await fetch(`/api/adventurers/${adventurerId}`);

  console.log('response', response)


  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const adventurer = await response.json();
  return adventurer;
}

type Adventurer = {
  id: number,
  name: string,
  profession: string,
  level: string,
  health: string,
  strength: string,
  cunning: string,
  intellect: string,
  description: string,
  image: string,
  cost: string,
}

const AdventurerDetailsPage = ({ params }: { params: Promise<{ adventurerId: number }> }) => {
  
  console.log('params', params)
  const [isLoading, setIsLoading] = useState(false);
  const [adventurerInfo, setAdventurerInfo] = useState<Adventurer | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await params;
        const advId = res.adventurerId;
        const adventurer = await fetchAdventurerInfo(advId);
        setAdventurerInfo(adventurer);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [params]);

  const handleHireAdventurer = async () => {
    setIsLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <h1 className="text-3xl font-bold">Adventurer Details</h1>
      <p>{adventurerInfo?.name}</p>
      {isLoading && <p>Loading...</p>}
      {isLoading ?
        <Image src="/images/loading-spinner1.gif" alt="placeholder" width={300} height={200} className="rounded-lg shadow-md" />
        :
        <Image 
          src={`/images/${adventurerInfo?.image}`}
          alt={`${adventurerInfo?.name} picture`} 
          width={0}
          height={400} 
          sizes="150vw"
          placeholder='empty'
          className="w-auto h-auto rounded-lg shadow-md"
        />
      }
      <Button onClick={handleHireAdventurer} aria-disabled={isLoading}>Hire this adventurer</Button>
    </>
  );
};

export default AdventurerDetailsPage;
