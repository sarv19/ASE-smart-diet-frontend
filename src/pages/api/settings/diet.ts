import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import httpStatus from "http-status";
import { DecodedIdToken } from "firebase-admin/auth";

import { BACKEND_BASE_URL } from "@/constants";
import { getFirebaseApp } from "@/api/shared/firebaseApp";
import { verifyIdToken } from "@/api/shared/auth";

type SettingCalories = {
  targetCaloriesMin: number;
  targetCaloriesMax: number;
  targetId: number;
};

const getDietCalories = async (user: DecodedIdToken) => {
  const response = await axios.post<{
    data: { list: Array<Record<string, any>> };
    code: number;
  }>(
    `${BACKEND_BASE_URL}/sd/settings/queryDietPreference`,
    {},
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: user.uid,
      },
    }
  );
  const data = response.data;
  const foundSetting = data.data.list.find((elem) => elem["targetCaloriesMin"]);

  return foundSetting ? (foundSetting as SettingCalories) : null;
};

const createDietCalories = async (
  user: DecodedIdToken,
  args: Omit<SettingCalories, "targetId">
) => {
  await axios.post(`${BACKEND_BASE_URL}/sd/settings/addDietPreference`, args, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: user.uid,
    },
  });
};

const putDietCalories = async (
  user: DecodedIdToken,
  args: Omit<SettingCalories, "targetId">
) => {
  const existingDiet = await getDietCalories(user);

  if (!existingDiet) return createDietCalories(user, args);

  await axios.post(
    `${BACKEND_BASE_URL}/sd/settings/editDietPreference`,
    { ...args, targetId: existingDiet.targetId },
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: user.uid,
      },
    }
  );
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<unknown>
) {
  const firebaseApp = getFirebaseApp();
  if (req.method === "PUT") {
    const user = await verifyIdToken(
      firebaseApp,
      req.headers.authorization || ""
    );

    await putDietCalories(user, req.body);

    return res.status(httpStatus.NO_CONTENT).end();
  }
  if (req.method === "GET") {
    const user = await verifyIdToken(
      firebaseApp,
      req.headers.authorization || ""
    );
    const response = await getDietCalories(user);
    return res.status(httpStatus.OK).json(response);
  }

  return res
    .status(httpStatus.NOT_FOUND)
    .json({ message: "API route not found or method not allowed." });
}
