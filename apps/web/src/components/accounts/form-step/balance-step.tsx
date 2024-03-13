import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useWorkspace } from "@/workspace";
import { useRouter } from "@tanstack/react-router";

const BalanceStep = () => {
  const router = useRouter();
  const { workspace } = useWorkspace();

  function handleSubmit() {
    router.navigate({
      to: "/workspace/$namespace/accounts",
      params: { namespace: workspace.namespace },
      search: { step: "final" },
    });
  }

  function handleBack() {
    router.navigate({
      to: "/workspace/$namespace/accounts",
      params: { namespace: workspace.namespace },
      search: { step: "institution" },
    });
  }

  return (
    <div className="flex items-center gap-2">
      <div>What is the current balance on this account?</div>
      <Input className="w-64" placeholder="e.g. American Express" />
      <Button onClick={handleSubmit}>Next</Button>
      <Button variant="secondary" onClick={handleBack}>
        Create
      </Button>
    </div>
  );
};

export default BalanceStep;
