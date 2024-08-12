import CenterLoadingSpinner from "@/components/center-loading-spinner";
import { Button } from "@/components/ui/button";
import {
  // deleteAccountById,
  getAccounts,
} from "@/gen/proto/fijoy/v1/account-AccountService_connectquery";
import { getProfileHeader } from "@/lib/headers";
import { getAccountByIdQueryOptions } from "@/lib/queries/account";
import { createConnectQueryKey, useMutation } from "@connectrpc/connect-query";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { toast } from "sonner";

export const Route = createFileRoute(
  "/_protected/_profile/accounts/$accountId/",
)({
  component: Page,
  loader: ({ context, params: { accountId } }) => {
    context.queryClient.ensureQueryData(
      getAccountByIdQueryOptions({
        id: accountId,
        context,
      }),
    );
  },
  pendingComponent: CenterLoadingSpinner,
});

function Page() {
  const { accountId } = Route.useParams();
  const context = Route.useRouteContext();
  const router = useRouter();

  const { data: account } = useSuspenseQuery(
    getAccountByIdQueryOptions({
      id: accountId,
      context,
    }),
  );

  // const deleteAccount = useMutation(deleteAccountById, {
  //   callOptions: {
  //     headers: getProfileHeader(context.profile.id),
  //   },
  //   onSuccess: () => {
  //     context.queryClient.invalidateQueries({
  //       queryKey: createConnectQueryKey(getAccounts),
  //     });
  //     toast.success("Account deleted");
  //     router.navigate({ from: Route.fullPath, to: ".." });
  //   },
  // });
  //
  return (
    <div>
      {/* <Button onClick={() => deleteAccount.mutate({ id: account.id })}> */}
      Delete {account.name}
      {/* </Button> */}
    </div>
  );
}
