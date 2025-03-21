"use client";

import { authLinks, navLinks } from "@/constant/navigationLinks";
import { ActiveLink } from "@/components/shared/nav/utils/ActiveLink";
import { IUser } from "@/services/auth.interface";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { SquareMenu } from "lucide-react";

interface LargeNavLinksProps {
  user: IUser | null;
  handleLogout: () => void;
}

export const LargeNavLinks = ({ user, handleLogout }: LargeNavLinksProps) => {
  return (
    <div className="flex items-center space-x-6">
      {navLinks.map((link) => (
        <ActiveLink key={link.link} href={link.link}>
          {link.title}
        </ActiveLink>
      ))}

      {user ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SquareMenu className="cursor-pointer" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-40 mt-2 mr-10 z-[10000]">
            <DropdownMenuItem>
              <ActiveLink href={`/${user.role}`}>Profile</ActiveLink>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onSelect={handleLogout}>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        authLinks.map((link) => (
          <ActiveLink key={link.link} href={link.link}>
            {link.title}
          </ActiveLink>
        ))
      )}
    </div>
  );
};
