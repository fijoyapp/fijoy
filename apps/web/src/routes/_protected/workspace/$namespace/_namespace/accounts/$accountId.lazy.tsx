import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute(
  "/_protected/workspace/$namespace/_namespace/accounts/$accountId",
)({
  component: AccountDetail,
});

function AccountDetail() {
  const queryClient = useQueryClient();
  const { accountId } = Route.useParams();
  // const { workspace } = Route.useRouteContext();
  const deleteAccount = useMutation({
    mutationFn: async (id: string) => {
      console.log(id);
      // await api.delete(`accounts/${id}`, {
      //   searchParams: {
      //     workspace_id: workspace.id,
      //   },
      // });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["accounts"],
      });
    },
  });
  return (
    <div>
      <Button onClick={() => deleteAccount.mutate(accountId)}>Nuke</Button>
    </div>
  );
}
