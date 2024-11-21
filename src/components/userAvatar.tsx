import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { useAuth } from "@/context/authContext";
import Link from "next/link";
import { Menu } from "lucide-react";

const UserAvatar = () => {
  const { user, isAuthenticated, logOut } = useAuth();

  return (
    <div className="absolute rounded-full right-5 cursor-pointer">
      {!isAuthenticated ? (
        <Link href='/login' className="text-white">Login</Link>
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
           
              <Menu className="bg-primary-foreground"/>
           
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-48">
            <DropdownMenuLabel className="text-black">Menu</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              {user?.role == "admin" && (
                <DropdownMenuItem>
                  <Link href="/admin">Admin</Link>
                </DropdownMenuItem>
              )}
                {/*   <DropdownMenuItem>
                <Link href="/vip">VIP</Link>
              </DropdownMenuItem>*/}
              <DropdownMenuItem>
                <Button onClick={logOut}>Logout</Button>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
};

export default UserAvatar;
