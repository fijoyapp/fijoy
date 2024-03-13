import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useWorkspace } from "@/workspace";
import { useRouter } from "@tanstack/react-router";

const TypeStep = () => {
  const router = useRouter();
  const { workspace } = useWorkspace();

  function handleSubmit() {
    router.navigate({
      to: "/workspace/$namespace/accounts",
      params: { namespace: workspace.namespace },
      search: { step: "institution" },
    });
  }

  function handleBack() {
    router.navigate({
      to: "/workspace/$namespace/accounts",
      params: { namespace: workspace.namespace },
      search: { step: "name" },
    });
  }
  return (
    <div className="flex items-center gap-2">
      <div>What type of account is this?</div>
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Debt" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="light">Light</SelectItem>
          <SelectItem value="dark">Dark</SelectItem>
          <SelectItem value="system">System</SelectItem>
        </SelectContent>
      </Select>

      <div className="grow"></div>
      <Button variant="secondary" onClick={handleBack}>
        Back
      </Button>
      <Button onClick={handleSubmit}>Next</Button>
    </div>
  );
};

export default TypeStep;
