import PolicyCard from "@/components/card/PolicyCard";
import PolicyPageContactSection from "@/components/sections/PolicyPageContactSection";
import { cookiePolicySections } from "@/constant/policy";

export default function CookiePolicyPage() {
  return (
    <main className="min-h-screen py-8 md:py-16 px-4 md:px-8 lg:px-12 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-6 text-center">Cookie Policy</h1>

      {cookiePolicySections.map((section) => (
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
