"use client";

import PolicyCard from "@/components/card/PolicyCard";
import PolicyPageContactSection from "@/components/sections/PolicyPageContactSection";
import { privacyPolicySections } from "@/constant/policy";

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen py-8 md:py-16 px-4 md:px-8 lg:px-12 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-6 text-center">Privacy Policy</h1>

      {privacyPolicySections.map((section) => (
        <PolicyCard
          key={section.title}
          title={section.title}
          content={section.content}
        />
      ))}

      <PolicyPageContactSection />
    </main>
  );
}
