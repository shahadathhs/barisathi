"use client";

import PrivacyPolicyCard from "@/components/card/PrivacyPolicyCard";
import { Separator } from "@/components/ui/separator";
import { privacyPolicySections } from "@/constant/policy";

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen py-16 px-4 md:px-8 lg:px-12 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-6 text-center">Privacy Policy</h1>

      {privacyPolicySections.map((section) => (
        <PrivacyPolicyCard
          key={section.title}
          title={section.title}
          content={section.content}
        />
      ))}

      <Separator className="my-8 bg-gray-700" />
      <Separator className="my-8 bg-gray-700" />

      {/* Contact Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mt-8 mb-4">Contact Us</h2>
        <p className="text-lg text-gray-700">
          If you have any questions about this Privacy Policy or our data
          practices, please contact us at{" "}
          <a
            href="mailto:privacy@barisathi.com"
            className="text-primary hover:underline"
          >
            privacy@barisathi.com
          </a>
          .
        </p>
      </section>
    </main>
  );
}
