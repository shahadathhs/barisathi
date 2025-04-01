"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

export default function SearchSection() {
  const router = useRouter();
  const [location, setLocation] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (location && bedrooms !== "any") params.append("location", location);
    if (bedrooms) params.append("bedrooms", bedrooms);
    params.append("minRent", priceRange[0].toString());
    params.append("maxRent", priceRange[1].toString());

    router.push(`/rental-house?${params.toString()}`);
  };

  return (
    <section className="container mx-auto px-4">
      <div className="bg-card shadow-lg rounded-xl p-6 -mt-32 relative z-30 border">
        <h2 className="text-2xl font-bold mb-6">Find Your Next Home</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div>
            <label className="text-sm font-medium mb-2 block">Location</label>
            <Input
              placeholder="City, area, or neighborhood"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full"
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Bedrooms</label>
            <Select value={bedrooms} onValueChange={setBedrooms}>
              <SelectTrigger>
                <SelectValue placeholder="Any" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any</SelectItem>
                <SelectItem value="1">1</SelectItem>
                <SelectItem value="2">2</SelectItem>
                <SelectItem value="3">3</SelectItem>
                <SelectItem value="4">4+</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">
              Price Range: ৳{priceRange[0].toLocaleString()} - ৳
              {priceRange[1].toLocaleString()}
            </label>
            <Slider
              defaultValue={priceRange}
              min={0}
              max={5000}
              step={100}
              value={priceRange}
              onValueChange={(value) =>
                setPriceRange(value as [number, number])
              }
              className="mt-6"
            />
          </div>

          <div className="flex items-end">
            <Button onClick={handleSearch} className="w-full gap-2">
              <Search className="h-4 w-4" />
              Search Properties
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
