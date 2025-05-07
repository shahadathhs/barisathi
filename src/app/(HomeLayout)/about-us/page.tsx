"use client";

import { teamMembers } from "@/constant/team";
import Image from "next/image";

export default function AboutUsPage() {
  return (
    <main className="min-h-screen py-16 px-4 max-w-3xl mx-auto md:border-l md:border-r">
      <section className="max-w-xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center">About Us</h1>
        <p className="text-lg text-gray-700 mb-4">
          Barisathi is a full-stack rental housing solution designed to bring
          transparency, convenience, and trust to the rental market. Our mission
          is to connect landlords and tenants seamlessly while providing tools
          to manage rental listings and requests efficiently.
        </p>
        <p className="text-lg text-gray-700 mb-4">
          Our vision is to become the go-to platform for smart rental housing,
          ensuring that everyone finds the perfect home while maintaining high
          standards of quality and security.
        </p>
        <h2 className="text-2xl font-bold mt-10 mb-4">Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {teamMembers.map((member) => (
            <div
              key={member.name}
              className="flex flex-col items-center text-center"
            >
              <div className="relative w-32 h-32 mb-4 rounded-full overflow-hidden shadow-lg">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold">{member.name}</h3>
              <p className="text-sm text-primary">{member.role}</p>
              <p className="mt-2 text-gray-600">{member.bio}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
