import axios from "axios";
import { App } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

import { BACKEND_BASE_URL } from "@/constants";

export class FirebaseAuthError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export async function verifyIdToken(firebaseApp: App, idToken: string) {
  try {
    const firebaseAuth = getAuth(firebaseApp);
    return await firebaseAuth.verifyIdToken(idToken);
  } catch (e) {
    const error = e as any;
    throw new FirebaseAuthError(error.errorInfo.message);
  }
}

export async function registerUserWithBackend(uid: string, email: string) {
  await axios.post(
    `${BACKEND_BASE_URL}/sd/user/register`,
    { userUid: uid, email },
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  );
}
