import { NextApiRequest, NextApiResponse } from 'next';
import adventurers from '@/adventurers.json';

export default function handler(req: NextApiRequest, res: NextApiResponse) {  
  if (!adventurers.adventurers) {
    return res.status(404).json({ error: `Adventurers list not found` });
  }
  res.status(200).json(adventurers.adventurers);
}