import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import httpStatus from "http-status";

import { BACKEND_BASE_URL } from "@/constants";
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

    const getDailyDiet = async () => {
      const response = await axios.post(
        `${BACKEND_BASE_URL}/sd/meal/queryAMeal`,
        req.body,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: uid,
          },
        }
      );
      const data = response.data;
      return data;
    };

    const data = await getDailyDiet();

    if ([301, 401].includes(data.code)) {
      await registerUserWithBackend(uid, email!);
      const data = await getDailyDiet();
      console.log("🚀 ~ file: daily-diet.ts:41 ~ data:", data);
      return res.status(httpStatus.OK).json(data);
    }

    return res.status(httpStatus.OK).json(data);
  }
  return res
    .status(httpStatus.NOT_FOUND)
    .json({ message: "API route not found or method not allowed." });
}
