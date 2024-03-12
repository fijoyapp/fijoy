import { Workspace } from "@/gen/proto/fijoy/v1/workspace_pb";

type Props = {
  workspace: Workspace;
};

const NewAccountForm = ({ workspace }: Props) => {
  console.log(workspace);
  return <div>NewAccountForm</div>;
};

export default NewAccountForm;
