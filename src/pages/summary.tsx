import { AuthRequired } from "@/modules/auth";
import { Summary } from "@/pageComponent";

export default function SummaryPage() {
  return (
    <AuthRequired>
      <Summary />
    </AuthRequired>
  );
}
