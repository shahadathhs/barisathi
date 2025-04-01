import Testimonials from "@/components/sections/Testimonials";
import RentalTips from "@/components/sections/RentalTips";
import FAQSection from "@/components/sections/FAQSection";
import HeroSection from "@/components/sections/HeroSection";

export default function Home() {
  return (
    <main className="min-h-screen py-8 px-4 md:px-8 lg:px-12">
      <HeroSection />
      <Testimonials />
      <RentalTips />
      <FAQSection />
    </main>
  );
}
