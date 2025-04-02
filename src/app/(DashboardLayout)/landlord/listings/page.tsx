"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import {
  Search,
  MapPin,
  Bed,
  DollarSign,
  Edit,
  Trash2,
  Plus,
  ChevronLeft,
  ChevronRight,
  Loader2,
  Home,
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { getToken } from "@/services/auth.service";
import {
  deleteLIstingById,
  getLandlordListings,
} from "@/services/listing.service";
import { toast } from "sonner";

// Define the listing interface based on your backend model
interface Listing {
  _id: string;
  location: string;
  description: string;
  rentAmount: number;
  bedrooms: number;
  images: string[];
  amenities: string[];
  landlord: string;
  createdAt: string;
  updatedAt: string;
}

export default function RentalListingsLandlord() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const fetchToken = async () => {
      const token = await getToken();
      if (token) setToken(token);
    };
    fetchToken();
  }, []);

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

  // State for delete confirmation
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [listingToDelete, setListingToDelete] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Fetch listings when filters or pagination changes
  useEffect(() => {
    if (token) fetchListings();
  }, [currentPage, token]);

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

      const result = await getLandlordListings(token || "", params.toString());
      const data = result.data;
      if (!result.success) {
        toast("Error fetching listings", {
          description: "Failed to load your rental listings",
          duration: 5000,
          icon: "🚨",
        });
        return;
      }
      setListings(data.listings);
      setTotalPages(Math.ceil(data.metadata.total / data.metadata.limit));
    } catch (error) {
      console.error("Error fetching listings:", error);
      toast("Error fetching listings", {
        description: "Failed to load your rental listings",
        duration: 5000,
        icon: "🚨",
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
    if (bedrooms) params.append("bedrooms", bedrooms);
    if (priceRange[0] > 0) params.append("minRent", priceRange[0].toString());
    if (priceRange[1] < 5000)
      params.append("maxRent", priceRange[1].toString());
    params.append("page", "1");

    router.push(`/landlord/listings?${params.toString()}`);
  };

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    setCurrentPage(newPage);

    // Update URL with new page
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    router.push(`/landlord/listings?${params.toString()}`);
  };

  const handleEditListing = (id: string) => {
    router.push(`/landlord/listings/edit/${id}`);
  };

  const handleDeleteClick = (id: string) => {
    setListingToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!listingToDelete) return;

    setIsDeleting(true);

    try {
      const result = await deleteLIstingById(listingToDelete, token || "");

      if (!result.success) {
        toast("Failed to delete listing", {
          description: "Failed to delete your rental listing",
          icon: "🚨",
        });
        return;
      }

      // Remove the deleted listing from the state
      setListings(
        listings.filter((listing) => listing._id !== listingToDelete)
      );

      toast("Listing deleted successfully", {
        description: "Your rental listing has been deleted",
        icon: "🗑️",
      });

      router.push(`/landlord/listings`);

      setDeleteDialogOpen(false);
    } catch (error) {
      console.error("Error deleting listing:", error);
      toast("Failed to delete listing", {
        description: "Failed to delete your rental listing",
        icon: "🚨",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="container mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold">My Rental Listings</h1>
        <Button onClick={() => router.push("/post-rental-house")}>
          <Plus className="mr-2 h-4 w-4" />
          Add New Listing
        </Button>
      </div>

      {/* Filters */}
      <div className="bg-muted p-6 rounded-lg mb-8">
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
      ) : listings.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold mb-2">No listings found</h2>
          <p className="text-muted-foreground mb-6">
            You haven&apos;t created any rental listings yet, or none match your
            current filters.
          </p>
          <Button onClick={() => router.push("/post-rental-house")}>
            <Home className="mr-2 h-4 w-4" />
            Post Your First Rental
          </Button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {listings.map((listing) => (
              <Card key={listing._id} className="overflow-hidden">
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
                  <Badge className="absolute top-2 right-2">
                    Your Property
                  </Badge>
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
                      <span>৳{listing.rentAmount.toLocaleString()}/month</span>
                    </div>
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground line-clamp-2">
                    {listing.description}
                  </p>
                </CardContent>
                <CardFooter className="p-4 pt-0 flex gap-2">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => handleEditListing(listing._id)}
                  >
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    className="flex-1"
                    onClick={() => handleDeleteClick(listing._id)}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </Button>
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

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              rental listing and remove it from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete Listing"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
