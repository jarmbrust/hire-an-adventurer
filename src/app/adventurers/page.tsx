import Link from 'next/link';
import Image from "next/image";
import { adventurers } from '@/adventurers.json';

const AdventurersListPage = () => {
  return (
    <>
      <h1 className="text-3xl font-bold">Available Adventurers</h1>
      <ul className="flex flex-wrap gap-4 mt-4">
        {adventurers.map((adventurer) => (
          <li key={adventurer.id} className="mb-4">
            <Link href={`adventurers/${adventurer.id}`}>
              <h3 className="text-xl font-bold">{adventurer.name}</h3>
              <Image 
                src={`/images/${adventurer.image}`}
                alt={adventurer.name}
                width={300}
                height={200}
                className="rounded-lg shadow-md"
              />
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default AdventurersListPage;
