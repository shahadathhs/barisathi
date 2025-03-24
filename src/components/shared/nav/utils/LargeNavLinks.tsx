"use client";

import { navLinks } from "@/constant/navigationLinks";
import { ActiveLink } from "@/components/shared/nav/utils/ActiveLink";
import { IUser } from "@/interface/auth.interface";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Menu } from "lucide-react";
import { nanoid } from "nanoid";

interface LargeNavLinksProps {
  user: IUser | null;
  handleLogout: () => void;
}

export const LargeNavLinks = ({ user, handleLogout }: LargeNavLinksProps) => {
  return (
    <div className="flex items-center space-x-2 lg:space-x-3 mr-6">
      {navLinks.map((link) => (
        <ActiveLink key={nanoid()} href={link.link}>
          {link.title}
        </ActiveLink>
      ))}

      {user ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Menu className="cursor-pointer" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="z-[10000]">
            <DropdownMenuItem>
              <ActiveLink href={`/${user.role}`}>Profile</ActiveLink>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onSelect={handleLogout}>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <ActiveLink href="/login">Login</ActiveLink>
      )}
    </div>
  );
};
