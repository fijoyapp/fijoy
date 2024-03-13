import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useWorkspace } from "@/workspace";
import { useRouter } from "@tanstack/react-router";

const InstitutionStep = () => {
  const router = useRouter();
  const { workspace } = useWorkspace();

  function handleSubmit() {
    router.navigate({
      to: "/workspace/$namespace/accounts",
      params: { namespace: workspace.namespace },
      search: { step: "balance" },
    });
  }

  function handleBack() {
    router.navigate({
      to: "/workspace/$namespace/accounts",
      params: { namespace: workspace.namespace },
      search: { step: "type" },
    });
  }

  return (
    <div className="flex items-center gap-2">
      <div>Which institution issued this account?</div>
      <Input className="w-64" placeholder="e.g. American Express" />

      <div className="grow"></div>
      <Button variant="secondary" onClick={handleBack}>
        Back
      </Button>
      <Button onClick={handleSubmit}>Next</Button>
    </div>
  );
};

export default InstitutionStep;
