"use client";

import { socialLinks } from "@/constant/sociallinks";
import Link from "next/link";
import { nanoid } from "nanoid";

export function SocialLinks({
  color = "text-gray-400",
  hoverColor = "text-white",
}: {
  color?: string;
  hoverColor?: string;
}) {
  return (
    <div className="flex gap-4 mt-6">
      {socialLinks.map(({ href, icon: Icon }) => (
        <Link
          key={nanoid()}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={`${color} hover:${hoverColor} transition-colors duration-200`}
        >
          <Icon size={24} />
        </Link>
      ))}
    </div>
  );
}
