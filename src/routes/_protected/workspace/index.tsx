import { env } from "@/env";
import { Workspace } from "@/types/workspace";
import { Navigate, createFileRoute } from "@tanstack/react-router";
import axios from "axios";
import Cookies from "js-cookie";

export const Route = createFileRoute("/_protected/workspace/")({
  component: Page,
  loader: async () => {
    const response = await axios.get(env.VITE_BACKEND_URL + "/workspace", {
      withCredentials: true,
    });

    return Workspace.array().parse(response.data);
  },
});

function Page() {
  const workspaces = Route.useLoaderData();

  if (workspaces.length === 0) {
    return <Navigate to="/setup" />;
  }

  const workspace = workspaces.find(
    (w) => w.Namespace === Cookies.get("namespace"),
  );

  if (workspace) {
    return (
      <Navigate
        to="/workspace/$namespace"
        params={{ namespace: workspace.Namespace }}
      />
    );
  }

  Cookies.set("namespace", workspaces[0].Namespace);
  return (
    <Navigate
      to="/workspace/$namespace"
      params={{ namespace: workspaces[0].Namespace }}
    />
  );
}

export default Page;
