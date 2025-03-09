"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logo.png";
import { getCurrentUser, IUser, logout } from "@/services/auth.service";
import { ActiveLink } from "@/components/shared/nav/utils/ActiveLink";
import {
  authLinks,
  dashboardLinks,
  navLinks,
} from "@/constant/navigationLinks";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState<IUser | null>(null);

  // * Listen for scroll events to update sticky behavior.
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // * Retrieve the user info.
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

  // Sticky navbar with smooth transition, rounded border, and slight scale on scroll.
  const navClasses = `sticky top-4 z-50 bg-white transition-all transform ease-in-out duration-500 border rounded-md p-4 m-4 ${
    scrolled ? "scale-90" : ""
  }`;

  return (
    <nav className={navClasses}>
      <div className="container w-full mx-auto flex items-center justify-between px-4">
        {/* Logo */}
        <Link href="/">
          <div className="flex items-center space-x-2 cursor-pointer">
            <Image src={logo} alt="Logo" width={60} height={60} />
            <span className="text-xl font-bold text-primary italic">
              BARISATHI
            </span>
          </div>
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center space-x-6">
          {navLinks.map((link) => (
            <ActiveLink key={link.link} href={link.link}>
              {link.title}
            </ActiveLink>
          ))}

          {/* Conditional links based on login status */}
          {user ? (
            <>
              {dashboardLinks.map((link) => (
                <ActiveLink key={link.link} href={link.link}>
                  {link.title}
                </ActiveLink>
              ))}
              <button
                onClick={handleLogout}
                className="text-sm text-blue-600 hover:underline transition-colors duration-300"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              {authLinks.map((link) => (
                <ActiveLink key={link.link} href={link.link}>
                  {link.title}
                </ActiveLink>
              ))}
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
