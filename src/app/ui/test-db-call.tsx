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
//   "name" varchar(30),
//   "profession" varchar(30),
//   "strength" integer,
//   "agility" integer,
//   "intellect" integer,
//   "description" varchar(400),
//   "fee" integer,
//   "image" varchar(40),
//   "successful_missions" integer,
//   "deaths" integer
// )