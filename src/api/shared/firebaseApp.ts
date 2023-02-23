import { initializeApp, cert, getApp, getApps } from "firebase-admin/app";

export const getFirebaseApp = () => {
  if (getApps().length > 0) return getApp();

  return initializeApp({
    credential: cert({
      projectId: "ase-project-team-42",
      privateKey: process.env.FIREBASE_PRIVATE_KEY,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    }),
    projectId: "ase-project-team-42",
  });
};
