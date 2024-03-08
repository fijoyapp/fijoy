import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/auth";

function WorkspaceButton() {
  const { user } = useAuth();

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
              src={`https://avatar.vercel.sh/${user.email}.png`}
              alt={user.email}
              className="grayscale"
            />
            <AvatarFallback>SC</AvatarFallback>
          </Avatar>
          {/* TODO: Display full name instead */}
          <div className="overflow-hidden overflow-ellipsis whitespace-nowrap">
            {user.email}
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48">
        <DropdownMenuLabel>My Workspaces</DropdownMenuLabel>
        {/* TODO: Add a list of workspaces here */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default WorkspaceButton;
