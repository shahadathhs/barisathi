import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";

export default function HeroBanner() {
  return (
    <section className="relative">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-primary/20 z-10" />
      <div className="relative h-[500px] w-full">
        <Image
          src="/bedroombanner.png"
          alt="Beautiful homes in Bangladesh"
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="absolute inset-0 flex flex-col items-center justify-center z-20 text-white p-4">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-4 max-w-4xl">
          Find Your Perfect Home in Bangladesh
        </h1>
        <p className="text-xl md:text-2xl text-center mb-8 max-w-2xl">
          Discover thousands of rental properties across the country
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Button size="lg" asChild>
            <Link href="/rental-house">Browse Listings</Link>
          </Button>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/post-rental-house">Post Rental House</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
