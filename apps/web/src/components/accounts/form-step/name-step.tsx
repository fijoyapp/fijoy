import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useWorkspace } from "@/workspace";
import { useRouter } from "@tanstack/react-router";

const NameStep = () => {
  const router = useRouter();
  const { workspace } = useWorkspace();

  function handleSubmit() {
    router.navigate({
      to: "/workspace/$namespace/accounts",
      params: { namespace: workspace.namespace },
      search: { step: "type" },
    });
  }

  return (
    <div className="flex items-center gap-2">
      <div>Let's get your account setup! How should we call it?</div>
      <Input className="w-64" placeholder="e.g. BMO Student Mastercard" />
      <Button onClick={handleSubmit}>Next</Button>
    </div>
  );
};

export default NameStep;
