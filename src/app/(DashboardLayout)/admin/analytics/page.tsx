"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAdminAnalytics } from "@/services/analytics.service";
import { getToken } from "@/services/auth.service";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, Home, Loader2, Users } from "lucide-react";
import { toast } from "sonner";
import {
  AdminAnalytics,
  BookingAnalytics,
  ListingAnalytics,
  TotalCountAnalytics,
  UserAnalytics,
} from "@/interface/analytics.interface";
import AnalyticsSummary from "@/components/admin/AnalyticsSummary";
import AnalyticsOverviewTab from "@/components/admin/AnalyticsOverviewTab";
import AnalyticsUsersTab from "@/components/admin/AnalyticsUsersTab";
import AnalyticsPropertiesTab from "@/components/admin/AnalyticsPropertiesTab";

export default function Analytics() {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [analytics, setAnalytics] = useState<AdminAnalytics | null>(null);
  const router = useRouter();

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
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading analytics data...</p>
        </div>
      </div>
    );
  }

  // Destructure with optional chaining
  const users = analytics?.userAnalytics;
  const bookings = analytics?.bookingAnalytics;
  const listings = analytics?.listingAnalytics;
  const totals = analytics?.totalCountAnalytics;

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">
          Analytics Dashboard
        </h1>
        <p className="text-muted-foreground">
          Comprehensive overview of platform performance and metrics
        </p>
      </div>

      {/* Summary Cards */}
      <AnalyticsSummary totals={totals as TotalCountAnalytics} />

      {/* Tabs for different analytics sections */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            <span className="hidden sm:inline">Overview</span>
          </TabsTrigger>
          <TabsTrigger value="users" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span className="hidden sm:inline">Users</span>
          </TabsTrigger>
          <TabsTrigger value="properties" className="flex items-center gap-2">
            <Home className="h-4 w-4" />
            <span className="hidden sm:inline">Properties</span>
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <AnalyticsOverviewTab
          users={users as UserAnalytics}
          bookings={bookings as BookingAnalytics}
        />

        {/* Users Tab */}
        <AnalyticsUsersTab users={users as UserAnalytics} />

        {/* Properties Tab */}
        <AnalyticsPropertiesTab listings={listings as ListingAnalytics} />
      </Tabs>
    </div>
  );
}
