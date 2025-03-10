"use client";

import { nanoid } from "nanoid";
import { useState, useEffect } from "react";
import { ActiveLink } from "./ActiveLink";
import { authLinks, dashboardLinks, navLinks } from "@/constant/navigationLinks";
import { getCurrentUser, IUser, logout } from "@/services/auth.service";

// Import shadcn DropdownMenu components.
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export const MobileNavDropdown = () => {
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const currentUser = await getCurrentUser();
      if (currentUser) setUser(currentUser);
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    await logout();
    window.location.href = "/";
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="px-3 py-2">
          Menu
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40 mt-2 mr-10 z-[10000]">
        {navLinks.map((link) => (
          <DropdownMenuItem key={nanoid()}>
            <ActiveLink href={link.link}>{link.title}</ActiveLink>
          </DropdownMenuItem>
        ))}

        <DropdownMenuSeparator />

        {user ? (
          <>
            {dashboardLinks.map((link) => (
              <DropdownMenuItem key={nanoid()}>
                <ActiveLink href={link.link}>{link.title}</ActiveLink>
              </DropdownMenuItem>
            ))}
            <DropdownMenuItem onSelect={handleLogout}>
              Logout
            </DropdownMenuItem>
          </>
        ) : (
          authLinks.map((link) => (
            <DropdownMenuItem key={nanoid()}>
              <ActiveLink href={link.link}>{link.title}</ActiveLink>
            </DropdownMenuItem>
          ))
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
