import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { getCurrentUser, getToken } from "@/services/auth.service";
import { IUser } from "@/interface/auth.interface";
import {
  addToOrRemoveFromWishlist,
  getWishlist,
} from "@/services/wishlist.service";
import { Listing } from "@/interface/listing.interface";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";

export default function AddToWishlist({ id }: { id: string }) {
  const [user, setUser] = useState<IUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isExisting, setIsExisting] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const init = async () => {
      try {
        const currentUser = await getCurrentUser();
        const currentToken = await getToken();

        if (currentUser && currentToken) {
          setUser(currentUser);
          setToken(currentToken);
        }
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch user details.");
      }
    };

    init();
  }, []);

  useEffect(() => {
    const fetchWishlist = async () => {
      setIsLoading(true);
      try {
        const result = await getWishlist(token as string);
        const listings = result?.data?.listings || [];
        const exists = listings.some((listing: Listing) => listing._id === id);
        setIsExisting(exists);
      } catch (error) {
        console.error("Wishlist fetch error:", error);
        toast.error("Failed to load wishlist.");
      } finally {
        setIsLoading(false);
      }
    };

    if (token) fetchWishlist();
  }, [token, id, router]);

  const handleWishlist = async () => {
    setIsProcessing(true);
    try {
      const action = isExisting ? "remove" : "add";
      const result = await addToOrRemoveFromWishlist(id, action, token!);
      if (result.success) {
        setIsExisting((prev) => !prev);
        toast.success(
          isExisting ? "Removed from wishlist" : "Added to wishlist"
        );
      }
    } catch (error) {
      console.error("Wishlist action error:", error);
      toast.error("Failed to update wishlist.");
    } finally {
      setIsProcessing(false);
    }
  };

  if (!isClient) {
    return (
      <div className="flex justify-center items-center py-2">
        <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
        <span className="ml-2 text-sm text-muted-foreground">Loading...</span>
      </div>
    );
  }

  if (!user || !token || user.role !== "tenant") return null;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-2">
        <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
        <span className="ml-2 text-sm text-muted-foreground">Loading...</span>
      </div>
    );
  }

  return (
    <Button
      className="w-full"
      variant={isExisting ? "destructive" : "secondary"}
      disabled={isProcessing}
      onClick={handleWishlist}
    >
      {isProcessing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {isExisting
        ? isProcessing
          ? "Removing..."
          : "Remove from Wishlist"
        : isProcessing
          ? "Adding..."
          : "Add to Wishlist"}
    </Button>
  );
}
