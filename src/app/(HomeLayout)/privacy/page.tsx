"use client";

import PolicyCard from "@/components/card/PolicyCard";
import PolicyPageContactSection from "@/components/sections/PolicyPageContactSection";
import { privacyPolicySections } from "@/constant/policy";

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen py-16 px-4 max-w-3xl mx-auto md:border-l md:border-r">
      <div className="max-w-xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center">Privacy Policy</h1>

        {privacyPolicySections.map((section) => (
          <PolicyCard
            key={section.title}
            title={section.title}
            content={section.content}
          />
        ))}

        <PolicyPageContactSection />
      </div>
    </main>
  );
}
