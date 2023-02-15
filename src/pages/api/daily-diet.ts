import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import httpStatus from "http-status";

import { BACKEND_BASE_URL } from "@/constants";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<unknown>
) {
  if (req.method === "POST") {
    const response = await axios.post(
      `${BACKEND_BASE_URL}/sd/meal/queryAMeal`,
      req.body,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    const data = response.data;
    res.status(httpStatus.OK).json(data);
  }
  res
    .status(httpStatus.NOT_FOUND)
    .json({ message: "API route not found or method not allowed." });
}
