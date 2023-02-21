import React, { useEffect } from "react";
import { useRouter } from "next/router";

import { useAuth } from "@/modules/auth";
import { Login } from "@/pageComponent";

export default function SignIn() {
  const { signIn, authState, signOut } = useAuth();
  const router = useRouter();
  const backRoute = router.query.back;

  useEffect(() => {
    if (authState === "signedIn" && typeof backRoute === "string") {
      router.push(decodeURIComponent(backRoute));
    }
  }, [authState, backRoute, router]);

  return (
    <Login handleLogin={authState === "signedOut" ? signIn : signOut}/>
  );
}
