import { Workspace } from "@/gen/proto/fijoy/v1/workspace_pb";
import { NewAccountStep } from "@/types/accounts";
import NameStep from "./form-step/name-step";
import TypeStep from "./form-step/type-step";
import InstitutionStep from "./form-step/institution-step";
import BalanceStep from "./form-step/balance-step";
import { Icons } from "../icons";

type Props = {
  workspace: Workspace;
  step: NewAccountStep;
};

const NewAccountForm = ({ workspace, step }: Props) => {
  console.log(workspace);
  return (
    <div className="">
      {step === "name" && <NameStep />}
      {step === "type" && <TypeStep />}
      {step === "institution" && <InstitutionStep />}
      {step === "balance" && <BalanceStep />}
      {step === "final" && (
        <div className="flex items-center gap-2">
          <Icons.spinner className="animate-spin" />
          <div>Creating your account...</div>
        </div>
      )}
    </div>
  );
};

export default NewAccountForm;
