"use client";

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
// import { useUser } from "@/hooks/use-user";
// import { useRouter } from "@tanstack/react-router";

function UserButton() {
  // const user = useUser();
  // const router = useRouter();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "h-8 justify-start gap-2 rounded-[0.5rem] bg-background text-sm font-normal  shadow-none",
          )}
        >
          <Avatar className="h-5 w-5">
            {/* <AvatarImage */}
            {/*   src={`https://avatar.vercel.sh/${session.user.email}.png`} */}
            {/*   alt={session.user.email} */}
            {/*   className="grayscale" */}
            {/* /> */}
            <AvatarFallback>SC</AvatarFallback>
          </Avatar>
          <div>{/* {session.user.email} / {workspace} */}</div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
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
          onSelect={async () => {
            const response = await fetch("/api/logout", {
              method: "POST",
              redirect: "manual",
            });

            if (response.status === 0) {
              // redirected
              // when using `redirect: "manual"`, response status 0 is returned
              // return router.refresh();
            }
          }}
        >
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default UserButton;
