import { NextApiRequest, NextApiResponse } from 'next';
import adventurers from '@/adventurers.json';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const adventurerId = parseInt(id as string, 10);
  const adventurer = adventurers.adventurers.find((adv) => adv.id === adventurerId);

  if (!adventurer) {
    return res.status(404).json({ error: `Adventurer with id ${adventurerId} not found` });
  }

  res.status(200).json(adventurer);
}