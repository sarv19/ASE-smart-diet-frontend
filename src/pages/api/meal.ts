import type { NextApiRequest, NextApiResponse } from 'next'
import data from '../../data/data.json'
type Data = {
  ingredientId: React.Key;
  ingredientName: string;
  calories: number;
  quantity: number;
  weight: number;
  substitute?: Data[];
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  res.status(200).json({ data })
}