import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";

import getFirebase from "@/shared/getFirebase";

export async function get(userId: string) {
  const app = getFirebase();
  const db = getFirestore(app);

  const col = doc(db, "users", userId);
  const userInfo = (await getDoc(col)).data();

  return userInfo;
}

get.key = "/modules/settings/basic/actions/get";

export async function put(userId: string, values: any) {
  const app = getFirebase();
  const db = getFirestore(app);

  const col = doc(db, "users", userId);
  Object.keys(values).forEach((key) => {
    if (values[key] === undefined) values[key] = null;
  });
  await updateDoc(col, values);
}
