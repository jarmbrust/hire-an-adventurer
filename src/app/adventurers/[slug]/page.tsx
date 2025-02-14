import Image from "next/image";
import { adventurers } from '@/adventurers.json';
import { Button } from "@/app/ui/button";

const AdventurerDetailsPage = async ({ params}: { params: Promise<{ slug: number }> }) => {
  const adventurerId = (await params).slug - 1;
  return (
    <>
      <h1 className="text-3xl font-bold">Adventurer Details</h1>
      <p>{adventurers[adventurerId].name}</p>
      <Image 
        src={`/images/${adventurers[adventurerId].image}`}
        alt={adventurers[adventurerId].name}
        width={600}
        height={400}
        className="rounded-lg shadow-md"
      />
      <Button>Hire this adventurer</Button>
    </>
  );
};

export default AdventurerDetailsPage;
