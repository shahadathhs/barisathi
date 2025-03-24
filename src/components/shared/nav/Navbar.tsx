"use client";

import { useEffect, useState } from "react";
import { getCurrentUser, logout } from "@/services/auth.service";
import { IUser } from "@/interface/auth.interface";
import { MobileNavDropdown } from "./utils/MobileNavDropdown";
import { LargeNavLinks } from "./utils/LargeNavLinks"; // New extracted component
import Logo from "../logo/Logo";
import { ModeToggle } from "./utils/ModeToggle";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState<IUser | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Listen for scroll events to update sticky behavior.
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  // Sticky navbar with smooth transition and rounded border.
  const navClasses = `sticky top-4 z-[9999] bg-white dark:bg-gray-800 transition-all transform ease-in-out duration-500 border rounded-md p-2 lg:p-4 m-4 ${
    scrolled ? "scale-90" : ""
  }`;

  return (
    <nav className={navClasses}>
      <div className="container mx-auto flex items-center justify-between px-2 lg:px-4">
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
