"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import {
  Bed,
  MapPin,
  DollarSign,
  ArrowLeft,
  Loader2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Listing } from "@/interface/listing.interface";
import { toast } from "sonner";
import { getListingById } from "@/services/listing.service";

export default function ListingDetails() {
  const router = useRouter();
  const { id } = useParams();

  const [listing, setListing] = useState<Listing | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchListing = async () => {
      setIsLoading(true);
      try {
        const result = await getListingById(id as string);

        if (!result.success) {
          toast("Failed to load rental details", {
            description: "Failed to load rental details",
            icon: "🚨",
          });
          return;
        }

        setListing(result.data);
      } catch (error) {
        console.error("Error fetching listing details:", error);
        toast("Failed to load rental details", {
          description: "Failed to load rental details",
          icon: "🚨",
        });
      } finally {
        setIsLoading(false);
      }
    };

    // Ensure token and id are available before fetching
    if (id) {
      fetchListing();
    }
  }, [id]);

  const handleRequestRental = () => {
    router.push(`/rental-request/${id}`);
  };

  const handleBackToListings = () => {
    router.push("/rental-house");
  };

  const handlePrevImage = () => {
    if (!listing) return;
    setCurrentImageIndex((prev) =>
      prev === 0 ? listing.images.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    if (!listing) return;
    setCurrentImageIndex((prev) =>
      prev === listing.images.length - 1 ? 0 : prev + 1
    );
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-10 flex justify-center items-center min-h-[50vh]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="container mx-auto py-10">
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold mb-2">Listing not found</h2>
          <p className="text-muted-foreground mb-4">
            The rental property you&apos;re looking for doesn&apos;t exist or
            has been removed.
          </p>
          <Button onClick={handleBackToListings}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Listings
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <Button variant="ghost" onClick={handleBackToListings} className="mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Listings
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Image Gallery */}
        <div className="lg:col-span-2">
          <div className="relative aspect-video overflow-hidden rounded-lg mb-4">
            {listing.images.length > 0 ? (
              <>
                <Image
                  src={
                    listing.images[currentImageIndex] ||
                    "/placeholder.svg?height=500&width=800"
                  }
                  alt={`Property image ${currentImageIndex + 1}`}
                  fill
                  className="object-cover"
                />

                {listing.images.length > 1 && (
                  <>
                    <Button
                      variant="outline"
                      size="icon"
                      className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-background/80 hover:bg-background"
                      onClick={handlePrevImage}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-background/80 hover:bg-background"
                      onClick={handleNextImage}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </>
                )}
              </>
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-muted">
                <p>No images available</p>
              </div>
            )}
          </div>

          {listing.images.length > 1 && (
            <div className="grid grid-cols-5 gap-2">
              {listing.images.map((image, index) => (
                <div
                  key={index}
                  className={`aspect-video relative rounded-md overflow-hidden cursor-pointer border-2 ${
                    index === currentImageIndex
                      ? "border-primary"
                      : "border-transparent"
                  }`}
                  onClick={() => setCurrentImageIndex(index)}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`Thumbnail ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Property Details */}
        <div>
          <Card>
            <CardContent className="p-6">
              <h1 className="text-2xl font-bold mb-2">{listing.location}</h1>

              <div className="flex items-center text-muted-foreground mb-4">
                <MapPin className="h-4 w-4 mr-1" />
                <span className="text-sm">{listing.location}</span>
              </div>

              <div className="flex justify-between mb-6">
                <div className="flex items-center">
                  <Bed className="h-5 w-5 mr-1" />
                  <span>
                    {listing.bedrooms}{" "}
                    {listing.bedrooms === 1 ? "Bedroom" : "Bedrooms"}
                  </span>
                </div>
                <div className="flex items-center font-bold text-xl">
                  <DollarSign className="h-5 w-5" />
                  <span>{listing.rentAmount}</span>
                  <span className="text-sm font-normal text-muted-foreground">
                    /month
                  </span>
                </div>
              </div>

              <Button className="w-full mb-6" onClick={handleRequestRental}>
                Request Rental
              </Button>

              <Separator className="mb-4" />

              <div>
                <h2 className="font-semibold text-lg mb-2">Description</h2>
                <p className="text-muted-foreground mb-6">
                  {listing.description}
                </p>

                <h2 className="font-semibold text-lg mb-2">Amenities</h2>
                <div className="flex flex-wrap gap-2 mb-4">
                  {listing.amenities.map((amenity, index) => (
                    <Badge key={index} variant="outline">
                      {amenity}
                    </Badge>
                  ))}
                </div>

                <div className="text-sm text-muted-foreground mt-6">
                  <p>
                    Listed on:{" "}
                    {new Date(listing.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
