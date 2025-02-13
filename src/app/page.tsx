'use client'

import Link from "next/link";
import { adventurersListPath } from "@/paths";

const Home = () => {
  return (
    <>
      <h1 className="text-3xl font-bold">Welcome to Hire an Adventurer!</h1>

      <p className="mt-4">
        Hire an adventurer for your next quest! You can find a list of adventurers
        by clicking the link below.
      </p>
      <Link href={adventurersListPath()}className="font-bold text-2xl">Adventurers</Link>
    </>
  );
};

export default Home;
