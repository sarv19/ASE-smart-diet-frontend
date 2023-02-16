import React, { useEffect } from "react";
import { useRouter } from "next/router";

import { useAuth } from "@/modules/auth";

export default function SignIn() {
  const { signIn, authState, signOut } = useAuth();
  const router = useRouter();
  const backRoute = router.query.back;

  useEffect(() => {
    if (authState === "signedIn" && typeof backRoute === "string") {
      router.push(decodeURIComponent(backRoute));
    }
  }, [authState, backRoute, router]);

  // TODO: Need style for button

  return (
    <>
      <button onClick={authState === "signedOut" ? signIn : signOut}>
        {authState === "signedOut" ? "Sign in" : "Sign out"}
      </button>
    </>
  );
}
