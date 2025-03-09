"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import logo from "@/assets/logo.png";
import { getCurrentUser, IUser, logout } from "@/services/auth.service";

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState<IUser | null>(null);

  // Listen for scroll events to update sticky behavior.
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) setScrolled(true);
      else setScrolled(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Retrieve the user info from localStorage.
  useEffect(() => {
    const fetchUser = async () => {
      const currentUser = await getCurrentUser();
      if (currentUser) {
        setUser(currentUser);
      }
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    await logout();

    // * redirect to home page
    window.location.href = "/";
  };

  // Helper for active link classes.
  const getLinkClasses = (linkPath: string) =>
    `text-sm ${
      pathname === linkPath || pathname.startsWith(linkPath)
        ? "font-semibold text-primary"
        : "text-gray-700 hover:text-primary"
    }`;

  return (
    <nav
      className={`sticky top-4 z-50 bg-white transition-all transform ease-in-out duration-500 border rounded-md p-4 m-4 ${
        scrolled ? "scale-90" : ""
      }`}
    >
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
          <Link
            href="/"
            className={`text-sm ${
              pathname === "/" ? "font-semibold text-primary" : "text-gray-700"
            }`}
          >
            Home
          </Link>
          <Link href="/about-us" className={getLinkClasses("/about-us")}>
            About Us
          </Link>
          <Link href="/listings" className={getLinkClasses("/listings")}>
            Listings
          </Link>

          {/* Conditional links based on login status */}
          {user ? (
            <>
              <Link href="/dashboard" className={getLinkClasses("/dashboard")}>
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="text-sm text-blue-600 hover:underline"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="text-sm text-blue-600 hover:underline"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="text-sm text-blue-600 hover:underline"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
