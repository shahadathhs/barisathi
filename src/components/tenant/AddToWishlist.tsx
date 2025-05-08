import { getCurrentUser, getToken } from "@/services/auth.service";
import { IUser } from "@/interface/auth.interface";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useParams, useRouter } from "next/navigation";
import { getWishlist } from "@/services/wishlist.service";
import { Listing } from "@/interface/listing.interface";

export default function AddToWishlist() {
  const [user, setUser] = useState<IUser | null>(null);
  const { id } = useParams();
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isExisting, setIsExisting] = useState(false);
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

  const handleWishlist = () => {
    console.log("Add to wishlist");
  };

  if (!user || !user.role || user.role !== "tenant" || !token || isLoading)
    return null;

  return (
    <Button className="w-full mb-6" onClick={handleWishlist}>
      {isExisting ? "Remove from wishlist" : "Add to wishlist"}
    </Button>
  );
}
