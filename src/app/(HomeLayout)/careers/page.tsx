"use client";

import WhyJoinUsCard from "@/components/card/WhyJoinUsCard";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { whyJoinUsSections } from "@/constant/whyJoinUsSections";
import { toast } from "sonner";

export default function CareersPage() {
  const handleSeeJobs = () => {
    toast("Stay tuned for updates!", {
      description: "This feature is not yet available.",
      icon: "🚧",
    });
  };

  return (
    <main className="min-h-screen py-16 px-4 md:px-8 lg:px-12">
      {/* Hero Section */}
      <section className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Join the Barisathi Team
        </h1>
        <p className="text-lg md:text-xl text-gray-700 mb-6 max-w-2xl mx-auto">
          At Barisathi, we’re on a mission to revolutionize the rental housing
          market by connecting landlords and tenants in innovative ways. Join us
          to be part of a dynamic team that values creativity, integrity, and a
          drive for excellence.
        </p>
        <Button onClick={handleSeeJobs} className="mx-auto">
          See Job Openings
        </Button>
      </section>

      <Separator className="my-8" />

      {/* Why Join Us Section */}
      <section className="max-w-4xl mx-auto mb-12">
        <h2 className="text-3xl font-bold mb-6 text-center">
          Why Work at Barisathi?
        </h2>
        <div className="space-y-6">
          {whyJoinUsSections.map((section) => (
            <WhyJoinUsCard
              key={section.title}
              title={section.title}
              description={section.description}
            />
          ))}
        </div>
      </section>

      <Separator className="my-8" />

      {/* Contact Section */}
      <section className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
        <p className="text-lg text-gray-700 mb-6">
          If you’re passionate, innovative, and ready to make a difference,
          please send your resume and cover letter to{" "}
          <a
            href="mailto:careers@barisathi.com"
            className="text-primary hover:underline"
          >
            careers@barisathi.com
          </a>
          .
        </p>
        <p className="text-sm text-gray-500">
          For any inquiries, call us at: <strong>+1 234 567 890</strong>
        </p>
      </section>
    </main>
  );
}
