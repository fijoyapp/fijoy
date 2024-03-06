import { Workspace } from "@/gen/proto/fijoy/v1/workspace_pb";
import { Button } from "../ui/button";

type Props = {
  workspace: Workspace;
};

const AddAccount = ({ workspace }: Props) => {
  console.log(workspace);
  return (
    <div>
      <Button>Add Account</Button>
    </div>
  );
};

export default AddAccount;
