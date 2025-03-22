"use client";

import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import Link from "next/link";
import DashboardNavbar from "@/components/shared/DashboardNavbar";

const sidebarLinks = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Projects", href: "/dashboard/projects" },
  { name: "Settings", href: "/dashboard/settings" },
];

export default function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar Drawer */}
      <Sheet open={open} onOpenChange={setOpen}>
        {/* Empty title bar to avoid console error */}
        <SheetTitle></SheetTitle>
        <SheetTrigger asChild>
          <Button variant="outline" className="m-4">
            <Menu className="w-5 h-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-4">
          <h2 className="text-xl font-semibold mb-4">Dashboard</h2>
          <nav className="flex flex-col space-y-2">
            {sidebarLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800"
                onClick={() => setOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </SheetContent>
      </Sheet>

      {/* Main content */}
      <main className="flex-1 p-3 h-screen overflow-y-auto">
        <div className="border rounded h-full">
          <DashboardNavbar />
          <div className="p-3">{children}</div>
        </div>
      </main>
    </div>
  );
}
