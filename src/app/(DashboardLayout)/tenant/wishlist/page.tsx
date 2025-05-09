"use client";

import { getToken } from "@/services/auth.service";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  addToOrRemoveFromWishlist,
  getWishlist,
} from "@/services/wishlist.service";
import { useRouter } from "next/navigation";
import { Bed, Heart, Loader2, MapPin, Trash2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Listing } from "@/interface/listing.interface";

export default function Wishlist() {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [wishlist, setWishlist] = useState<Listing[]>([]);
  const [removingIds, setRemovingIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    const fetchToken = async () => {
      const tkn = await getToken();
      if (tkn) setToken(tkn);
      else router.push("/login"); // Redirect to login if no token
    };
    fetchToken();
  }, [router]);

  // Fetch listing details
  useEffect(() => {
    const fetchWishlist = async () => {
      setIsLoading(true);

      try {
        // Fetch listing details
        const result = await getWishlist(token as string);

        console.log("Result:", result);
        if (result.success) {
          const listings = result?.data?.listings;
          setWishlist(listings);
        }
      } catch (error) {
        console.error("Error:", error);
        toast("Failed to load wishlist", {
          description: "There was an error loading your saved properties",
          icon: "🚨",
        });
      } finally {
        setIsLoading(false);
      }
    };

    if (token) {
      fetchWishlist();
    }
  }, [token, router]);

  const handleRemoveFromWishlist = async (listingId: string) => {
    try {
      setRemovingIds((prev) => new Set(prev).add(listingId));

      const result = await addToOrRemoveFromWishlist(
        listingId,
        "remove",
        token as string
      );

      if (result.success) {
        const updatedWishlist = wishlist.filter(
          (listing) => listing._id !== listingId
        );
        setWishlist(updatedWishlist);
        toast("Removed from wishlist", {
          description: "Property has been removed from your wishlist",
          icon: "❤️",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      toast("Failed to remove property", {
        description:
          "There was an error removing this property from your wishlist",
        icon: "🚨",
      });
    } finally {
      setRemovingIds((prev) => {
        const updated = new Set(prev);
        updated.delete(listingId);
        return updated;
      });
    }
  };

  if (isLoading || !token) {
    return (
      <div className="container mx-auto py-10 flex justify-center items-center min-h-[50vh]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold md:text-3xl">My Wishlist</h1>
            <p className="text-muted-foreground mt-1">
              {wishlist.length}{" "}
              {wishlist.length === 1 ? "property" : "properties"} saved
            </p>
          </div>
          <Button asChild variant="outline">
            <Link href="/rental-house">Browse More Properties</Link>
          </Button>
        </div>

        {wishlist.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 space-y-4 text-center border rounded-lg bg-muted/30">
            <Heart className="h-16 w-16 text-muted-foreground/50" />
            <h2 className="text-xl font-medium">Your wishlist is empty</h2>
            <p className="text-muted-foreground max-w-md">
              Save properties you like to your wishlist to easily find them
              later
            </p>
            <Button asChild className="mt-2">
              <Link href="/rental-house">Browse Properties</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlist.map((listing) => (
              <Card
                key={listing._id}
                className="overflow-hidden h-full flex flex-col pt-0"
              >
                <div className="relative aspect-[4/2] w-full overflow-hidden">
                  <Image
                    src={
                      listing.images[0] ||
                      "/placeholder.png?height=250&width=400"
                    }
                    alt={listing.location}
                    fill
                    className="object-cover transition-transform hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2 rounded-full"
                    onClick={() => handleRemoveFromWishlist(listing._id)}
                    disabled={removingIds.has(listing._id)}
                  >
                    {removingIds.has(listing._id) ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Trash2 className="h-4 w-4" />
                    )}
                    <span className="sr-only">Remove from wishlist</span>
                  </Button>
                </div>

                <CardContent className="flex-grow px-4 py-0">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg line-clamp-1">
                      <Link
                        href={`/rental-house/${listing._id}`}
                        className="hover:underline"
                      >
                        {listing.location}
                      </Link>
                    </h3>
                    <Badge variant="outline" className="font-bold text-primary">
                      ${listing.rentAmount.toLocaleString()}/mo
                    </Badge>
                  </div>

                  <div className="flex items-center text-muted-foreground mb-3">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span className="text-sm line-clamp-1">
                      {listing.location}
                    </span>
                  </div>

                  <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                    {listing.description}
                  </p>

                  <div className="flex items-center gap-4 mt-2">
                    <div className="flex items-center">
                      <Bed className="h-4 w-4 mr-1" />
                      <span className="text-sm">
                        {listing.bedrooms}{" "}
                        {listing.bedrooms === 1 ? "Bed" : "Beds"}
                      </span>
                    </div>
                  </div>

                  {listing.amenities && listing.amenities.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-3">
                      {listing.amenities.slice(0, 3).map((amenity, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="text-xs"
                        >
                          {amenity}
                        </Badge>
                      ))}
                      {listing.amenities.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{listing.amenities.length - 3} more
                        </Badge>
                      )}
                    </div>
                  )}
                </CardContent>

                <CardFooter className="px-4 py-0 flex gap-2">
                  <Button asChild className="flex-1">
                    <Link href={`/rental-details/${listing._id}`}>
                      View Details
                    </Link>
                  </Button>

                  <Button asChild className="flex-1" variant={"outline"}>
                    <Link href={`/rental-request/${listing._id}`}>
                      Request Rental
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
