import { nanoid } from "nanoid";
import { ActiveLink } from "./ActiveLink";
import { authLinks, navLinks } from "@/constant/navigationLinks";
import { IUser } from "@/interface/auth.interface";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export const MobileNavDropdown = ({
  user,
  handleLogout,
}: {
  user: IUser | null;
  handleLogout: () => void;
}) => {
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
            <DropdownMenuItem>
              <ActiveLink href={`/${user?.role}`}>Profile</ActiveLink>
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={handleLogout} className="text-red-600">
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
