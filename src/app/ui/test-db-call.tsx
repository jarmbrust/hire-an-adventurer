// 'use client';

// import { useEffect, useState } from 'react';
// import { getTestData } from '@/app/actions';

// export default function TestDBCall() {
//   const [data, setData] = useState<any>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<Error | null>(null);

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const result = await getTestData();
//         setData(result);
//       } catch (err) {
//         if (err instanceof Error) {
//           setError(err);
//         }
//       } finally {
//         setIsLoading(false);
//       }
//     }

//     fetchData();
//   }, []);

//   if (isLoading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error.message}</div>;

//   return (
//     <div>
//       {/* Your existing JSX */}
//       <div className="mt-4">
//         <h3>Database Test:</h3>
//         <pre>{JSON.stringify(data, null, 2)}</pre>
//       </div>
//     </div>
//   );
// }


// CREATE TABLE "public"."adventurers" (
//   "id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
//   "name" varchar(40),
//   "image" varchar(30),
//   "profession" varchar(30),
//   "description" varchar(200),
//   "strength" integer,
//   "agility" integer,
//   "arcane" integer,
//   "fee" integer,
//   "successes" integer,
//   "defeats" integer,
//   "victory_phrase" varchar(120),
//   "condition" varchar(20),
//   "status" varchar(20)
// )


// CREATE TABLE "public"."monsters" (
//   "id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
//   "name" varchar(40),
//   "flies" boolean,
//   "description" varchar(200),
//   "image" varchar(40),
//   "victory_phrase" varchar(120),
//   "attack_power" integer
//   "kills" integer
// )