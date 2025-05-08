"use client";

import { getToken } from "@/services/auth.service";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  addToOrRemoveFromWishlist,
  getWishlist,
} from "@/services/wishlist.service";
// import { Listing } from "@/interface/listing.interface";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { Link } from "@react-email/components";

export interface Listing {
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

export default function Wishlist() {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [wishlist, setWishlist] = useState<Listing[]>([]);
  const [isRemoving, setIsRemoving] = useState(false);

  useEffect(() => {
    const fetchToken = async () => {
      const tkn = await getToken();
      if (tkn) setToken(tkn);
    };
    fetchToken();
  }, []);

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
        // * set isExisting state
      } catch (error) {
        console.error("Error:", error);
        toast("Failed to load property details", {
          description: "Failed to load property details",
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
      setIsRemoving(true);
      const result = await addToOrRemoveFromWishlist(
        listingId as string,
        "remove",
        token as string
      );

      console.log("Result:", result);
      if (result.success) {
        const updatedWishlist = wishlist.filter(
          (listing) => listing._id !== listingId
        );
        setWishlist(updatedWishlist);
        toast("Removed from wishlist", {
          description: "You have removed this listing from your wishlist",
          icon: "🚨",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      toast("Failed to load property details", {
        description: "Failed to load property details",
        icon: "🚨",
      });
    } finally {
      setIsRemoving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-10 flex justify-center items-center min-h-[50vh]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <Link href="/rental-house">Add More to Wishlist</Link>
    </div>
  );
}
