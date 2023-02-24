import { Header } from "@/components";
import Link from "next/link";
import CommingSoon from "./CommingSoon";
import DietForm from "./DietForm";

const Diet = () => {
  return (
    <div className="diet">
      <Header text={`Your diet`}/>
      <div className="diet-content">
        <div className="diet-content-edit">Edit your diet <Link href={"/settings"}>here</Link></div>
        <div className="diet-content-or">or</div>
        <div className="diet-content-edit">Create a new one below:</div>
        <DietForm />
      </div>
    </div>
  )
};

export default Diet;