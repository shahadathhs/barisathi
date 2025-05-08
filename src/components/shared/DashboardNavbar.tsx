"use client";

import { usePathname } from "next/navigation";
import { logout } from "@/services/auth.service";
import { Button } from "../ui/button";
import { formatDashboardTitle } from "@/utils/formatDashboardTitle";
import { ModeToggle } from "./ModeToggle";
import { LogOutIcon } from "lucide-react";

export default function DashboardNavbar() {
  const pathname = usePathname();
  const title = formatDashboardTitle(pathname);

  const handleLogout = async () => {
    await logout();
    window.location.href = "/";
  };

  return (
    <div className="flex justify-between items-center p-3 border-b">
      <div className="text-lg font-semibold">{title}</div>
      <div className="flex items-center space-x-4">
        <Button variant={"destructive"} size={"icon"} onClick={handleLogout}>
          <LogOutIcon className="h-4 w-4" />
        </Button>
        <ModeToggle />
      </div>
    </div>
  );
}
