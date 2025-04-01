import FeaturedListings from "./FeaturedListings";
import WhyChooseUs from "./WhyChooseUs";
import CallToAction from "./CallToAction";
import HeroBanner from "./HeroBanner";
import SearchSection from "./SearchSection";

export default function HeroSection() {
  return (
    <div className="space-y-16 pb-16">
      {/* Hero Banner */}
      <HeroBanner />

      {/* Search Section */}
      <SearchSection />

      {/* Featured Listings */}
      <FeaturedListings />

      {/* Why Choose Us */}
      <WhyChooseUs />

      {/* Call to Action */}
      <CallToAction />
    </div>
  );
}
