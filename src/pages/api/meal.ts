import type { NextApiRequest, NextApiResponse } from "next";

import data from "../../data/data.json";

import { verifyIdToken } from "@/api/shared/auth";
import { getFirebaseApp } from "@/api/shared/firebaseApp";

type Data = {
  ingredientId: React.Key;
  ingredientName: string;
  calories: number;
  quantity: number;
  weight: number;
  substitute?: Data[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  // TODO: Set up firebase to accept the authorization header and validate it
  const firebaseApp = getFirebaseApp();
  await verifyIdToken(firebaseApp, req.headers.authorization || "");
  res.status(200).json({ data });
}
