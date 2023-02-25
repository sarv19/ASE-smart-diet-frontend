import { AuthRequired } from "@/modules/auth";
import { HomePage } from "@/pageComponent";

export default function Home() {
  return (
    <AuthRequired>
      <HomePage />
    </AuthRequired>
  )
}
