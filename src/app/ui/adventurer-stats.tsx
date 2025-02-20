import Image from "next/image";
import clsx from "clsx";
import { type Adventurer } from "@/app/lib/definitions";
import { useTheme } from "@/context/theme-context";

const AdventurerStats = ({stats}: {stats: Adventurer | null}) => {
  const { theme } = useTheme();
  if (!stats) {
    return null;
  }

  const feeText = parseInt(stats.fee) > 1 ? "silver coins to hire" : "silver coin to hire";

  return (
    <div className={clsx("flex flex-col items-center justify-center rounded-md bg-gray-50 p-4",
      {
        'dark-sidebar': theme === 'dark',
        'light-sidebar': theme === 'light',
      }
    )}>
      <Image 
        src={`/images/${stats?.image}`}
        alt={`${stats?.name} Image`} 
        width={0}
        height={400} 
        sizes="150vw"
        className="w-auto h-auto rounded-lg shadow-md mb-6"
      />
      <h2 className="mb-2 text-2xl font-bold">{stats?.name}&apos;s Stats</h2>
      <p><span className="font-bold">Profession:</span> {stats?.profession}</p>
      <p><span className="font-bold">Level:</span> {stats?.level}</p>
      <p><span className="font-bold">Health:</span> {stats?.health}</p>
      <p><span className="font-bold">Strength:</span> {stats?.strength}</p>
      <p><span className="font-bold">Cunning:</span> {stats?.cunning}</p>
      <p><span className="font-bold">Intellect:</span> {stats?.intellect}</p>
      <p><span className="font-bold">Description:</span> {stats?.description}</p>
      <p><span className="font-bold">Fee:</span> {stats?.fee} {feeText}</p>
    </div>
  );
};

export default AdventurerStats;