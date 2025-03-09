"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface ActiveLinkProps {
  href: string;
  children: React.ReactNode;
  extraClasses?: string;
}

export function ActiveLink({
  href,
  children,
  extraClasses = "",
}: ActiveLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href && pathname.startsWith(href);

  return (
    <Link
      href={href}
      className={`text-sm transition-colors duration-300 ${
        isActive
          ? "font-semibold text-primary border-primary"
          : "text-gray-700 hover:text-primary"
      } ${extraClasses}`}
    >
      {children}
    </Link>
  );
}
