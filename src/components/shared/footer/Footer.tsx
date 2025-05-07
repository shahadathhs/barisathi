"use client";

import { Separator } from "@/components/ui/separator";
import { SocialLinks } from "@/components/shared/SocialLinks";
import {
  contactLinks,
  legalLinks,
  quickLinks,
} from "@/constant/navigationLinks";
import Logo from "../logo/Logo";
import { FooterColumn } from "./utils/FooterColumn";

export default function Footer() {
  return (
    <footer className="bg-black text-white py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          {/* Logo, Description, and Social Links */}
          <div className="md:w-1/3">
            <Logo />
            <p className="mt-4 text-gray-400">
              BariSathi is your smart rental housing solution connecting
              landlords, tenants, and administrators. Find your perfect home
              today!
            </p>
            <SocialLinks />
          </div>
          {/* Footer Columns for Links */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <FooterColumn title="Quick Links" links={quickLinks} />
            <FooterColumn title="Legal" links={legalLinks} />
            <FooterColumn title="Contact" links={contactLinks} />
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
