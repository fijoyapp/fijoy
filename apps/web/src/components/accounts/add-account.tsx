import { Workspace } from "@/gen/proto/fijoy/v1/workspace_pb";
import { Button } from "../ui/button";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import NewAccountForm from "./new-account-form";
import { Card, CardContent } from "../ui/card";

type Props = {
  workspace: Workspace;
};

const AddAccount = ({ workspace }: Props) => {
  return (
    <div>
      <Collapsible>
        <CollapsibleTrigger>
          <Button>Add Account</Button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="py-2"></div>
          <Card>
            <CardContent className="pt-6">
              <NewAccountForm workspace={workspace} />
            </CardContent>
          </Card>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default AddAccount;
