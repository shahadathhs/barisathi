"use client";

import { getAdminAnalytics } from "@/services/analytics.service";
import { getToken } from "@/services/auth.service";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export type Distribution = {
  _id: string;
  count: number;
};

export type UserAnalytics = {
  totalUsers: number;
  activeCount: number;
  inactiveCount: number;
  rolesDistribution: Distribution[];
};

export type BookingAnalytics = {
  statusDistribution: Distribution[];
  monthlyBookings: { month: string; count: number }[];
};

export type ListingAnalytics = {
  totalListings: number;
  averageRent: number;
  bedroomsDistribution: Distribution[];
  locationDistribution: Distribution[];
};

export type TotalCountAnalytics = {
  totalUsers: number;
  totalBookings: number;
  totalListings: number;
};

export type AdminAnalytics = {
  userAnalytics: UserAnalytics;
  bookingAnalytics: BookingAnalytics;
  listingAnalytics: ListingAnalytics;
  totalCountAnalytics: TotalCountAnalytics;
};

export default function Analytics() {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [analytics, setAnalytics] = useState<AdminAnalytics | null>(null);
  const router = useRouter();
  console.log("Analytics:", analytics);

  useEffect(() => {
    const fetchToken = async () => {
      const token = await getToken();
      if (token) setToken(token);
    };
    fetchToken();
  }, []);

  useEffect(() => {
    if (token) {
      fetchAnalytics();
    }
  }, [token, router]);

  const fetchAnalytics = async () => {
    setIsLoading(true);
    try {
      const result = await getAdminAnalytics(token || "");
      if (!result.success) {
        toast("Error", {
          description: result.message,
          icon: "🚨",
        });
        return;
      }

      const { data } = result;

      setAnalytics(data);
    } catch (error) {
      console.error("Error fetching analytics:", error);
      toast("Error", {
        description: "Failed to load analytics",
        icon: "🚨",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading || !token) {
    return (
      <div className="container mx-auto py-10 flex justify-center items-center min-h-[50vh]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return <div>page</div>;
}
