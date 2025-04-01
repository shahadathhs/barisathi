import { DollarSign, MapPin, Search } from "lucide-react";

export default function WhyChooseUs() {
  return (
    <section className="container mx-auto px-4">
      <h2 className="text-3xl font-bold text-center mb-12">
        Why Choose BariSathi
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="text-center p-6 bg-muted rounded-lg">
          <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="h-8 w-8 text-primary" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Extensive Listings</h3>
          <p className="text-muted-foreground">
            Thousands of verified properties across Bangladesh to choose from.
          </p>
        </div>

        <div className="text-center p-6 bg-muted rounded-lg">
          <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <MapPin className="h-8 w-8 text-primary" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Prime Locations</h3>
          <p className="text-muted-foreground">
            Find properties in the most desirable neighborhoods and areas.
          </p>
        </div>

        <div className="text-center p-6 bg-muted rounded-lg">
          <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <DollarSign className="h-8 w-8 text-primary" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Best Value</h3>
          <p className="text-muted-foreground">
            Competitive prices and transparent rental agreements.
          </p>
        </div>
      </div>
    </section>
  );
}
