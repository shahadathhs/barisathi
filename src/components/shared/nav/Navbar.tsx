"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logo.png";
import { getCurrentUser, IUser, logout } from "@/services/auth.service";
import { ActiveLink } from "@/components/shared/nav/ActiveLink";

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

  // Sticky navbar with smooth transition and rounded border.
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
          <ActiveLink href="/">Home</ActiveLink>
          <ActiveLink href="/about-us">About Us</ActiveLink>
          <ActiveLink href="/listings">Listings</ActiveLink>

          {/* Conditional links based on login status */}
          {user ? (
            <>
              <ActiveLink href="/dashboard">Dashboard</ActiveLink>
              <button
                onClick={handleLogout}
                className="text-sm text-blue-600 hover:underline transition-colors duration-300"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <ActiveLink href="/login">Login</ActiveLink>
              <ActiveLink href="/register">Register</ActiveLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
