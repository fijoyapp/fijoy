import { Workspace } from "@/gen/proto/fijoy/v1/workspace_pb";
import { Button } from "../ui/button";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import NewAccountForm from "./new-account-form";
import { Card, CardContent } from "../ui/card";
import { useAccountsStore } from "@/store/accounts";
import { NewAccountStep } from "@/types/accounts";

type Props = {
  workspace: Workspace;
  step: NewAccountStep;
};

const AddAccount = ({ workspace, step }: Props) => {
  const { open, setOpen } = useAccountsStore((state) => ({
    open: state.newAccountFormOpen,
    setOpen: state.setNewAccountFormOpen,
  }));

  return (
    <div>
      <Collapsible open={open} onOpenChange={setOpen}>
        <CollapsibleTrigger>
          <Button>{open ? "Hide Form" : "Add Account"}</Button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="py-2"></div>
          <Card>
            <CardContent className="pt-6">
              <NewAccountForm workspace={workspace} step={step} />
            </CardContent>
          </Card>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default AddAccount;
