"use client";

import { useEffect, useState } from "react";
import { getCurrentUser, logout } from "@/services/auth.service";
import { IUser } from "@/interface/auth.interface";
import { MobileNavDropdown } from "./utils/MobileNavDropdown";
import { LargeNavLinks } from "./utils/LargeNavLinks";
import Logo from "../logo/Logo";
import { ModeToggle } from "../ModeToggle";

export default function Navbar() {
  const [user, setUser] = useState<IUser | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Retrieve the user info.
  useEffect(() => {
    const fetchUser = async () => {
      const currentUser = await getCurrentUser();
      if (currentUser) setUser(currentUser);
    };
    fetchUser();
  }, []);

  // Update window width state.
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize(); // initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = async () => {
    await logout();
    window.location.href = "/";
  };

  return (
    <nav className="sticky top-0 z-[9999] bg-white dark:bg-black border-b">
      <div className="flex items-center justify-between container mx-auto px-4  p-2 lg:p-4">
        {/* Logo */}
        <Logo />

        {/* Navigation Links */}
        <div className="flex items-center space-x-4">
          {/* Desktop Navigation: Large screen links */}
          {!isMobile && (
            <LargeNavLinks user={user} handleLogout={handleLogout} />
          )}

          {/* Mobile Navigation: Render dropdown for mobile devices */}
          {isMobile && (
            <MobileNavDropdown user={user} handleLogout={handleLogout} />
          )}

          {/* Mode Toggle */}
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
}
