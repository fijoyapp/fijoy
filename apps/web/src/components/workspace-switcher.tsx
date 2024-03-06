import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { env } from "@/env";
import { useAuth } from "@/auth";
import { useQueryClient } from "@tanstack/react-query";
// import { useRouter } from "@tanstack/react-router";

function WorkspaceButton() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  if (!user) {
    return null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className={cn("justify-start gap-2 text-sm font-normal")}
        >
          <Avatar className="h-6 w-6">
            <AvatarImage
              src={`https://avatar.vercel.sh/${user.Email}.png`}
              alt={user.Email}
              className="grayscale"
            />
            <AvatarFallback>SC</AvatarFallback>
          </Avatar>
          {/* TODO: Display full name instead */}
          <div className="overflow-hidden overflow-ellipsis whitespace-nowrap">
            {user.Email}
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onSelect={async () => {
            // return router.navigate("/profile");
          }}
        >
          Profile
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onSelect={() => {
            queryClient.clear();
            window.location.replace(env.VITE_BACKEND_URL + "/v1/auth/logout");
          }}
        >
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default WorkspaceButton;
