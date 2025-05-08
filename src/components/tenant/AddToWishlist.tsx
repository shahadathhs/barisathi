import { getCurrentUser, getToken } from "@/services/auth.service";
import { IUser } from "@/interface/auth.interface";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  addToOrRemoveFromWishlist,
  getWishlist,
} from "@/services/wishlist.service";
import { Listing } from "@/interface/listing.interface";

export default function AddToWishlist({ id }: { id: string }) {
  const [user, setUser] = useState<IUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isExisting, setIsExisting] = useState(false);
  const [isAddingOrRemoving, setIsAddingOrRemoving] = useState(false);
  const router = useRouter();
  console.log("User:", user, "Token:", token);

  useEffect(() => {
    const fetchUserToken = async () => {
      const user = await getCurrentUser();
      const tkn = await getToken();
      if (user && tkn) {
        setUser(user);
        setToken(tkn);
      }
    };
    fetchUserToken();
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
          const isExisting = listings.some(
            (listing: Listing) => listing._id === id
          );
          setIsExisting(isExisting);
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

  const handleWishlist = async () => {
    try {
      setIsAddingOrRemoving(true);
      const result = await addToOrRemoveFromWishlist(
        id as string,
        isExisting ? "remove" : "add",
        token as string
      );

      if (result.success) {
        setIsExisting(!isExisting);
      }

      console.log("Result:", result);
    } catch (error) {
      console.error("Error:", error);
      toast("Failed to load property details", {
        description: "Failed to load property details",
        icon: "🚨",
      });
    } finally {
      setIsAddingOrRemoving(false);
    }
  };

  if (!user || !user.role || user.role !== "tenant" || !token || isLoading)
    return null;

  return (
    <Button
      className="w-full"
      variant={isExisting ? "destructive" : "secondary"}
      onClick={handleWishlist}
    >
      {isExisting
        ? isAddingOrRemoving
          ? "Removing..."
          : "Remove from wishlist"
        : isAddingOrRemoving
          ? "Adding..."
          : "Add to wishlist"}
    </Button>
  );
}
