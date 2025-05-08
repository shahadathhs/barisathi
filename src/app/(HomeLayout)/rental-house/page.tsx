"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import {
  Bed,
  MapPin,
  DollarSign,
  Search,
  ChevronLeft,
  ChevronRight,
  Loader2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";
import { Listing } from "@/interface/listing.interface";
import { getAllListings } from "@/services/listing.service";
import AddToWishlist from "@/components/tenant/AddToWishlist";

export default function RentalHouse() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // State for filters
  const [location, setLocation] = useState(searchParams.get("location") || "");
  const [bedrooms, setBedrooms] = useState(searchParams.get("bedrooms") || "");
  const [priceRange, setPriceRange] = useState<[number, number]>([
    Number.parseInt(searchParams.get("minRent") || "0"),
    Number.parseInt(searchParams.get("maxRent") || "5000"),
  ]);

  // State for listings and pagination
  const [listings, setListings] = useState<Listing[]>([]);
  const [currentPage, setCurrentPage] = useState(
    Number.parseInt(searchParams.get("page") || "1")
  );
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [limit] = useState(6); // Number of listings per page

  // Fetch listings when filters or pagination changes
  useEffect(() => {
    fetchListings();
  }, [currentPage]);

  const fetchListings = async () => {
    setIsLoading(true);

    try {
      // Build query parameters
      const params = new URLSearchParams();
      if (location) params.append("location", location);
      if (bedrooms && bedrooms !== "any") params.append("bedrooms", bedrooms);
      if (priceRange[0] > 0) params.append("minRent", priceRange[0].toString());
      if (priceRange[1] < 5000)
        params.append("maxRent", priceRange[1].toString());
      params.append("page", currentPage.toString());
      params.append("limit", limit.toString());

      const res = await getAllListings(params.toString());

      if (!res.success) {
        throw new Error(res.message || "Failed to fetch listings");
      }

      const result = await res.data;

      setListings(result.listings);
      setTotalPages(Math.ceil(result.metadata.total / result.metadata.limit));
    } catch (error) {
      console.error("Error fetching listings:", error);
      toast("Error fetching listings", {
        description:
          "There was an error fetching the listings. Please try again later.",
        icon: "🚨",
        duration: 5000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = () => {
    setCurrentPage(1); // Reset to first page when applying new filters
    fetchListings();

    // Update URL with search params
    const params = new URLSearchParams();
    if (location) params.append("location", location);
    if (bedrooms && bedrooms !== "any") params.append("bedrooms", bedrooms);
    if (priceRange[0] > 0) params.append("minRent", priceRange[0].toString());
    if (priceRange[1] < 5000)
      params.append("maxRent", priceRange[1].toString());
    params.append("page", "1");

    router.push(`/rental-house?${params.toString()}`);
  };

  const handleViewDetails = (id: string) => {
    router.push(`/rental-details/${id}`);
  };

  const handleRequestRental = (id: string) => {
    router.push(`/rental-request/${id}`);
  };

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    setCurrentPage(newPage);

    // Update URL with new page
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    router.push(`/rental-house?${params.toString()}`);
  };

  return (
    <div className="container mx-auto py-16 px-4">
      <h1 className="text-4xl font-bold mb-8">Find Your Perfect Rental</h1>

      {/* Filters */}
      <div className="border shadow-lg p-6 rounded-lg mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="text-sm font-medium mb-1 block">Location</label>
            <Input
              placeholder="City, neighborhood..."
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-1 block">Bedrooms</label>
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
            <label className="text-sm font-medium mb-1 block">
              Rent Range: ${priceRange[0]} - ${priceRange[1]}
            </label>
            <Slider
              defaultValue={priceRange}
              min={0}
              max={5000}
              step={100}
              value={priceRange}
              onValueChange={(value: [number, number]) =>
                setPriceRange(value as [number, number])
              }
              className="mt-4"
            />
          </div>

          <div className="flex items-end">
            <Button onClick={handleSearch} className="w-full">
              <Search className="mr-2 h-4 w-4" />
              Search
            </Button>
          </div>
        </div>
      </div>

      {/* Listings */}
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      ) : listings?.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold mb-2">No listings found</h2>
          <p className="text-muted-foreground">
            Try adjusting your search filters
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {listings.map((listing) => (
              <Card key={listing._id} className="overflow-hidden pt-0">
                <div className="aspect-video relative">
                  <Image
                    src={
                      listing.images[0] ||
                      "/placeholder.svg?height=300&width=500"
                    }
                    alt={listing.location}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardContent className="p-4">
                  <h2 className="font-semibold text-lg line-clamp-1">
                    {listing.location}
                  </h2>
                  <div className="flex items-center text-muted-foreground mt-2">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span className="text-sm line-clamp-1">
                      {listing.location}
                    </span>
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
                      <span>{listing.rentAmount}/month</span>
                    </div>
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground line-clamp-2">
                    {listing.description}
                  </p>
                </CardContent>
                <CardFooter className="p-4 pb-0 pt-0 grid grid-cols-2 gap-2">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => handleViewDetails(listing._id)}
                  >
                    View Details
                  </Button>
                  <Button
                    className="flex-1"
                    onClick={() => handleRequestRental(listing._id)}
                  >
                    Request Rental
                  </Button>

                  <div className="col-span-2">
                    <AddToWishlist id={listing?._id} />
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center mt-8 gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>

              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      size="icon"
                      onClick={() => handlePageChange(page)}
                      className="w-8 h-8"
                    >
                      {page}
                    </Button>
                  )
                )}
              </div>

              <Button
                variant="outline"
                size="icon"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
