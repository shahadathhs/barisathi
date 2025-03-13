import PolicyCard from "@/components/card/PolicyCard";
import PolicyPageContactSection from "@/components/sections/PolicyPageContactSection";
import { termsOfUseSections } from "@/constant/policy";

export default function TermsOfUsePage() {
  return (
    <main className="min-h-screen py-16 px-4 md:px-8 lg:px-12 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-6 text-center">Terms of Use</h1>

      {termsOfUseSections.map((section) => (
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
