import { initializeApp, cert, getApp, getApps } from "firebase-admin/app";

export const getFirebaseApp = () => {
  if (getApps().length > 0) return getApp();

  const { private_key } = JSON.parse(process.env.FIREBASE_PRIVATE_KEY!);

  return initializeApp({
    credential: cert({
      projectId: "ase-project-team-42",
      privateKey: private_key,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    }),
    projectId: "ase-project-team-42",
  });
};
