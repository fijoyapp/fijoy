import { Account } from "@/gen/proto/fijoy/v1/account_pb";
import { useWorkspace } from "@/hooks/use-workspace";
import { useRouter } from "@tanstack/react-router";
import { Row } from "@tanstack/react-table";
import { ChevronRight } from "lucide-react";

export function AccountDetailButton({ row }: { row: Row<Account> }) {
  const router = useRouter();
  const { workspace } = useWorkspace();

  return (
    <ChevronRight
      onClick={() =>
        router.navigate({
          to: "/workspace/$namespace/accounts/$accountId",
          params: {
            accountId: row.original.id,
            namespace: workspace.namespace,
          },
        })
      }
    />
  );
}
