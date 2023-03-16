import Head from "next/head";

import { AuthRequired } from "@/modules/auth";
import Setting from "@/pageComponent/Setting";

export default function SettingsPage() {
  return (
    <AuthRequired>
      <Head>
        <title>Settings</title>
      </Head>
      <Setting />
    </AuthRequired>
  );
}
