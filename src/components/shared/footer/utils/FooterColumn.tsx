"use client";

import Link from "next/link";

interface FooterColumnProps {
  title: string;
  links: { title: string; link: string }[];
}

export function FooterColumn({ title, links }: FooterColumnProps) {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <ul className="space-y-2">
        {links.map((link) => (
          <li key={link.link}>
            <Link
              href={link.link}
              className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
            >
              {link.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
