"use client";

import Image from "next/image";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardFooter } from "../ui/card";
import { ArrowRight, Bed, DollarSign, Loader2, MapPin } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import { getFirstThreeListings } from "@/services/listing.service";
import { useEffect, useState } from "react";

export default function FeaturedListings() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [featuredListings, setFeaturedListings] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedListings = async () => {
      try {
        const result = await getFirstThreeListings();

        if (result.success && result.data) {
          setFeaturedListings(result.data.listings);
        }
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching featured listings:", error);
        setIsLoading(false);
      }
    };
    fetchFeaturedListings();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="animate-spin h-10 w-10" />
      </div>
    );
  }

  if (!featuredListings || featuredListings.length === 0) return null;

  return (
    <section className="container mx-auto px-4">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">Featured Properties</h2>
        <Button variant="ghost" asChild className="gap-2">
          <Link href="/rental-house">
            View All
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {featuredListings?.map((listing) => (
          <Card key={listing._id} className="overflow-hidden pt-0">
            <div className="aspect-video relative">
              <Image
                src={listing.images[0] || "/placeholder.svg"}
                alt={listing.location}
                fill
                className="object-cover"
              />
              <Badge className="absolute top-2 right-2 bg-primary">
                Featured
              </Badge>
            </div>
            <CardContent className="p-4">
              <h3 className="font-semibold text-lg line-clamp-1">
                {listing.location}
              </h3>
              <div className="flex items-center text-muted-foreground mt-2">
                <MapPin className="h-4 w-4 mr-1" />
                <span className="text-sm line-clamp-1">{listing.location}</span>
              </div>
              <div className="flex justify-between mt-2">
                <div className="flex items-center">
                  <Bed className="h-4 w-4 mr-1" />
                  <span className="text-sm">
                    {listing.bedrooms}{" "}
                    {listing.bedrooms === 1 ? "Bedroom" : "Bedrooms"}
                  </span>
                </div>
                <div className="flex items-center font-medium">
                  <DollarSign className="h-4 w-4" />
                  <span>৳{listing.rentAmount.toLocaleString()}/month</span>
                </div>
              </div>
              <p className="mt-3 text-sm text-muted-foreground line-clamp-2">
                {listing.description}
              </p>
            </CardContent>
            <CardFooter className="p-4 pt-0 pb-0">
              <Button variant="outline" className="w-full" asChild>
                <Link href={`/rental-details/${listing._id}`}>View Details</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}
