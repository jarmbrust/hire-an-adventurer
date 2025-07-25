'use server';

import { neon } from '@neondatabase/serverless';
import { Adventurer, Monster } from '@/app/lib/definitions';

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
};

export async function getAdventurerById(id: number): Promise<Adventurer> {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not defined');
  }
  const sql = neon(process.env.DATABASE_URL);
  const result = await sql`
      SELECT id, name, image, profession, description,
      strength, agility, arcane, fee, successes, defeats,
      victory_phrase, condition, status FROM adventurers WHERE id = ${id}
  `;
  if (!result?.[0]) {
    throw new Error(`Adventurer with id ${id} not found`);
  }
  return result[0] as Adventurer;
};

export async function getAdventurerByName(name: string) {
    if (!process.env.DATABASE_URL) {
      throw new Error('DATABASE_URL is not defined');
    }
    const sql = neon(process.env.DATABASE_URL);
    const data = await sql`
      SELECT id, name, image, profession, description,
      strength, agility, arcane, fee, successes, defeats,
      victory_phrase, condition, status FROM adventurers WHERE name = ${name}`;
    return data;
};

export async function modifyMultipleAdventurersStatus(ids: number[], status: string) {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not defined');
  }
  const sql = neon(process.env.DATABASE_URL);
  if (ids.length === 0) {
    throw new Error('No adventurer IDs provided');
  }
  const idList = ids.map(id => sql`${id}`)
  const result = await sql`
    UPDATE adventurers SET status = ${status} WHERE id IN (${idList.join(',')})
  `;
  const rowCount = result.length;

  if (rowCount === 0) {
    throw new Error(`No adventurers found with IDs: ${ids.join(', ')}`);
  }
  if (rowCount !== ids.length) {
    throw new Error(`Not all adventurers were updated. Expected ${ids.length}, but updated ${rowCount}`);
  }
  console.log(`Updated ${rowCount} adventurers to status '${status}'`);
  return result;
};

export async function modifyMultipleAdventurersCondition(ids: number[], condition: string) {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not defined');
  }
  const sql = neon(process.env.DATABASE_URL);
  if (ids.length === 0) {
    throw new Error('No adventurer IDs provided');
  }
  const idList = ids.map(id => sql`${id}`)
  const result = await sql`
    UPDATE adventurers SET condition = ${condition} WHERE id IN (${idList.join(',')})
  `;
  const rowCount = result.length;

  if (rowCount === 0) {
    throw new Error(`No adventurers found with IDs: ${ids.join(', ')}`);
  }
  if (rowCount !== ids.length) {
    throw new Error(`Not all adventurers were updated. Expected ${ids.length}, but updated ${rowCount}`);
  }
  console.log(`Updated ${rowCount} adventurers to condition '${condition}'`);
  return result;
};

export async function getMonsterById(id: number): Promise<Monster> {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not defined');
  }
  const sql = neon(process.env.DATABASE_URL);
  const result = await sql`
    SELECT id, name, flies, image, description, victory_phrase AS "victoryPhrase",
    attack_power AS "attackPower" FROM monsters WHERE id = ${id}
  `;
  if (!result?.[0]) {
    throw new Error(`Monster with id ${id} not found`);
  }
  return result[0] as Monster;
};

export async function getMonsterByName(name: string): Promise<Monster> {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not defined');
  }
  const sql = neon(process.env.DATABASE_URL);
  const result = await sql`
    SELECT id, name, flies, image, description, victory_phrase AS "victoryPhrase", 
    attack_power AS "attackPower" FROM monsters WHERE name = ${name}
  `;
  if (!result?.[0]) {
    throw new Error(`Monster ${name} not found`);
  }
  return result[0] as Monster;
};
