import { AuthRequired } from "@/modules/auth";
import { Diet } from "@/pageComponent";

export default function DietPage() {
  return (
    <AuthRequired>
      <Diet />
    </AuthRequired>
  );
}
