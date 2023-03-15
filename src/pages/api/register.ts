import type { NextApiRequest, NextApiResponse } from "next";
import httpStatus from "http-status";

import { getFirebaseApp } from "@/api/shared/firebaseApp";
import { registerUserWithBackend, verifyIdToken } from "@/api/shared/auth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<unknown>
) {
  const firebaseApp = getFirebaseApp();
  if (req.method === "POST") {
    const { uid, email } = await verifyIdToken(
      firebaseApp,
      req.headers.authorization || ""
    );

    await registerUserWithBackend(uid, email!);

    return res.status(httpStatus.NO_CONTENT).end();
  }
  return res
    .status(httpStatus.NOT_FOUND)
    .json({ message: "API route not found or method not allowed." });
}
