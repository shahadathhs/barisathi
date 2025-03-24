"use client";

import { useEffect, useState } from "react";
import { IUser } from "@/interface/auth.interface";
import { getCurrentUser } from "@/services/auth.service";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { getLinksByRole } from "./utils/getLinksByRole";
import { SidebarLink } from "./utils/SidebarLink";

export default function DashboardSide() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    const loadUser = async () => {
      const currentUser = await getCurrentUser();
      if (currentUser) {
        setUser(currentUser);
      }
    };
    loadUser();
  }, []);

  const links = getLinksByRole(user?.role);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      {/* Empty title bar to avoid console error */}
      <SheetTitle />
      <SheetTrigger asChild>
        <Button variant="outline" className="m-4">
          <Menu className="w-5 h-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-64 p-4">
        <h2 className="text-xl font-semibold mb-4">Dashboard</h2>
        <nav className="flex flex-col space-y-1">
          {/* Always render Home link */}
          <SidebarLink name="Home" href="/" onClick={() => setOpen(false)} />
          {links.map((link) => (
            <SidebarLink
              key={link.href}
              name={link.name}
              href={link.href}
              onClick={() => setOpen(false)}
            />
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
