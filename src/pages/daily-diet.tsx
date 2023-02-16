import { AuthRequired } from "@/modules/auth";
import DailyDiet from "@/pageComponent/DailyDiet";

export default function DailyDietPage() {
  return (
    <AuthRequired>
      <DailyDiet />
    </AuthRequired>
  );
}
