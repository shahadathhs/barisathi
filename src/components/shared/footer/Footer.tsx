"use client";

import Link from "next/link";
import {
  IconBrandFacebook,
  IconBrandTwitter,
  IconBrandInstagram,
  IconBrandLinkedin,
} from "@tabler/icons-react";
import { Separator } from "@/components/ui/separator";
import Logo from "../Logo";
import {
  contactLinks,
  legalLinks,
  quickLinks,
} from "@/constant/navigationLinks";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4 md:px-8 lg:px-12">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          {/* Logo and Description with Social Links */}
          <div className="md:w-1/3">
            {/* Logo */}
            <Logo textColor="text-secondary" />

            {/* Description */}
            <p className="mt-4 text-gray-400">
              BariSathi is your smart rental housing solution connecting
              landlords, tenants, and administrators. Find your perfect home
              today!
            </p>

            {/* Social Links */}
            <div className="flex gap-4 mt-6">
              <Link
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                <IconBrandFacebook size={24} />
              </Link>
              <Link
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                <IconBrandTwitter size={24} />
              </Link>
              <Link
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                <IconBrandInstagram size={24} />
              </Link>
              <Link
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                <IconBrandLinkedin size={24} />
              </Link>
            </div>
          </div>
          {/* links */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            {/* Quick Links Column */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                {quickLinks.map((link) => (
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

            {/* Legal  Column */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                {legalLinks.map((link) => (
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

            {/*Contact Column */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <ul className="space-y-2">
                {contactLinks.map((link) => (
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
          </div>
        </div>

        {/* Separator from shadcn UI */}
        <Separator className="my-8 bg-gray-700" />

        {/* Bottom Section */}
        <div className="text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} BariSathi. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
