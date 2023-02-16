import React, { createContext, useContext, useEffect, useState } from "react";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  User,
  signOut as firebaseSignOut,
} from "firebase/auth";
import { getFirestore, doc, setDoc, Firestore } from "firebase/firestore";
import { useRouter } from "next/router";

import getFirebase from "@/shared/getFirebase";

type AuthState = "unknown" | "signedIn" | "signedOut" | "error";

type UserContext = {
  currentUser: User | null;
  authState: AuthState;
};

const INITIAL_CONTEXT: UserContext = {
  currentUser: null,
  authState: "unknown",
};

async function storeUserInFirestore(db: Firestore, user: User) {
  await setDoc(doc(db, "users", user.uid), {
    email: user.email,
    emailVerified: user.emailVerified,
    photoUrl: user.photoURL,
    displayName: user.displayName,
  });
  await setDoc(doc(db, "publicUsers", user.uid), {
    emailVerified: user.emailVerified,
    photoUrl: user.photoURL,
    displayName: user.displayName,
  });
}

const Context = createContext<UserContext>(INITIAL_CONTEXT);

export function AuthContext({ children }: React.PropsWithChildren) {
  const app = getFirebase();
  const db = getFirestore(app);
  const auth = getAuth(app);

  const [authContext, setAuthContext] = useState<UserContext>(INITIAL_CONTEXT);

  useEffect(() => {
    return auth.onAuthStateChanged(
      async (user) => {
        if (user) {
          await storeUserInFirestore(db, user);
          setAuthContext({ currentUser: user, authState: "signedIn" });
        } else {
          setAuthContext({ authState: "signedOut", currentUser: null });
        }
      },
      () => setAuthContext({ currentUser: null, authState: "error" })
    );
  }, [auth, db]);

  return <Context.Provider value={authContext}>{children}</Context.Provider>;
}

export function useAuth() {
  const app = getFirebase();
  const auth = getAuth(app);
  const authContext = useContext(Context);

  const signIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (_e) {}
  };

  const signOut = async () => {
    await firebaseSignOut(auth);
  };

  return {
    signIn,
    signOut,
    isSigningIn: authContext.authState === "unknown",
    currentUser: authContext.currentUser,
    authState: authContext.authState,
    isError: authContext.authState === "error",
  };
}

export function AuthRequired({ children }: React.PropsWithChildren) {
  const { authState } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // FIXME: Add a default sign in page
    if (authState === "signedOut") {
      router.push(`/signin?back=${encodeURIComponent(router.asPath)}`);
    }
  }, [authState, router]);

  return <>{children}</>;
}

export type AuthHeader = {
  idToken: string;
};
