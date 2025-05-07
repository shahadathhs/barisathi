import PolicyCard from "@/components/card/PolicyCard";
import PolicyPageContactSection from "@/components/sections/PolicyPageContactSection";
import { termsOfUseSections } from "@/constant/policy";

export default function TermsOfUsePage() {
  return (
    <main className="min-h-screen py-16 px-4 max-w-3xl mx-auto md:border-l md:border-r">
      <div className="max-w-xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center">Terms of Use</h1>

        {termsOfUseSections.map((section) => (
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
