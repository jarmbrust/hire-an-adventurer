'use server';

import { neon } from '@neondatabase/serverless';
import { Adventurer } from '@/app/lib/definitions';

export async function getAllAdventurers() {
    if (!process.env.DATABASE_URL) {
      throw new Error('DATABASE_URL is not defined');
    }
    const sql = neon(process.env.DATABASE_URL);
    const data = await sql`
      SELECT id, name, image, profession, description,
      strength, agility, arcane, fee, successes, defeats,
      victory_phrase, condition, status FROM adventurers`;
    return data;
}

export async function getAdventurerById(id: number): Promise<Adventurer> {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not defined');
  }
  const sql = neon(process.env.DATABASE_URL);
  const result = await sql`
    SELECT * FROM adventurers WHERE id = ${id}
  `;
  if (!result?.[0]) {
    throw new Error(`Adventurer with id ${id} not found`);
  }
  return result[0] as Adventurer;
}

export async function getAdventurerByName(name: string) {
    if (!process.env.DATABASE_URL) {
      throw new Error('DATABASE_URL is not defined');
    }
    const sql = neon(process.env.DATABASE_URL);
    const data = await sql`SELECT * FROM adventurers WHERE name = ${name}`;
    return data;
}