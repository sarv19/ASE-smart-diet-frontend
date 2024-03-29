import axios from "axios";
import { User } from "firebase/auth";

export type PutDietArgs = {
  targetCaloriesMin: number;
  targetCaloriesMax: number;
};

export async function putCalories(args: PutDietArgs, user: User) {
  const response = await axios.put("/api/settings/diet", args, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: await user.getIdToken(),
    },
  });
  const data = response.data;
  return data;
}

export async function getCalories(userIdToken: string) {
  const response = await axios.get("/api/settings/diet", {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: userIdToken,
    },
  });
  const data = response.data;
  return data;
}

getCalories.key = "/modules/settings/diet/actions/getCalories";
