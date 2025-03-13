import Testimonials from "@/components/sections/Testimonials";
import RentalTips from "@/components/sections/RentalTips";

export default function Home() {
  return (
    <main className="min-h-screen py-8 md:py-16 px-4 md:px-8 lg:px-12">
      <Testimonials />
      <RentalTips />
    </main>
  );
}
