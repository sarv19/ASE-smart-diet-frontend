import axios from "axios";
import { User } from "firebase/auth";

export async function get(token: string) {
  const response = await axios.get("/api/settings/food-preferences", {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: token,
    },
  });
  return response.data;
}

get.key = "/modules/settings/foodPreferences/actions/get";

export async function post(token: string, body: any) {
  const response = await axios.post("/api/settings/food-preferences", body, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: token,
    },
  });

  const data = response.data;
  return data;
}

export async function remove(token: string, body: any) {
  const response = await axios.delete("/api/settings/food-preferences", {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: token,
    },
    data: body,
  });

  return response.data;
}
