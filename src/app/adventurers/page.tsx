import Link from 'next/link';
import Image from "next/image";
import { adventurers } from '@/adventurers.json';

const AdventurersListPage = () => {
  return (
    <>
      <h1 className="text-3xl font-bold">Available Adventurers</h1>
      <ul className="mt-4">
        {adventurers.map((adventurer) => (
          <li key={adventurer.id} className="mb-4">
            <Link href={`adventurers/${adventurer.id}`}>
              <h3 className="text-xl font-bold underline">{adventurer.name}</h3>
            </Link>
            <p><span className="font-bold">Profession:</span> {adventurer.profession}</p>
            <p><span className="font-bold">Level:</span> {adventurer.level}</p>
            <p><span className="font-bold">Health:</span> {adventurer.health}</p>
            <p><span className="font-bold">Strength:</span> {adventurer.strength}</p>
            <p><span className="font-bold">Cunning:</span> {adventurer.cunning}</p>
            <p><span className="font-bold">Intellect:</span> {adventurer.intellect}</p>
            <p><span className="font-bold">Description:</span> {adventurer.description}</p>
            <p><span className="font-bold">Cost:</span> {adventurer.cost}</p>
            <Image 
              src={`/images/${adventurer.image}`}
              alt={adventurer.name}
              width={300}
              height={200}
              className="rounded-lg shadow-md"
            />
          </li>
        ))}
      </ul>
    </>
  );
};

export default AdventurersListPage;
