"use client"

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import logo from "@/assets/logo.png";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link href="/">
          <div className="flex items-center space-x-2 cursor-pointer">
            <Image src={logo} alt="Logo" width={60} height={60} />
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
          <Link
            href="/about-us"
            className={`text-sm ${
              pathname === "/about-us"
                ? "font-semibold text-primary"
                : "text-gray-700"
            }`}
          >
            About Us
          </Link>
          <Link
            href="/listings"
            className={`text-sm ${
              pathname.startsWith("/listings")
                ? "font-semibold text-primary"
                : "text-gray-700"
            }`}
          >
            Listings
          </Link>
          <Link
            href="/dashboard"
            className={`text-sm ${
              pathname.startsWith("/dashboard")
                ? "font-semibold text-primary"
                : "text-gray-700"
            }`}
          >
            Dashboard
          </Link>
          <Link href="/login" className="text-sm text-blue-600 hover:underline">
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
}
