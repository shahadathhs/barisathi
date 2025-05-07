import Testimonials from "@/components/sections/Testimonials";
import RentalTips from "@/components/sections/RentalTips";
import FAQSection from "@/components/sections/FAQSection";
import HeroSection from "@/components/sections/HeroSection";
import RecentBlogs from "@/components/sections/RecentBlogs";
import ServiceSection from "@/components/sections/ServiceSection";
import HowItWorksSection from "@/components/sections/HowItWorksSection";

export default function Home() {
  return (
    <main className="min-h-screen pb-16 space-y-16">
      <HeroSection />
      <Testimonials />
      <RentalTips />
      <FAQSection />
      <RecentBlogs />
      <ServiceSection />
      <HowItWorksSection />
    </main>
  );
}
