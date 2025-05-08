"use client";

import { getAdminAnalytics } from "@/services/analytics.service";
import { getToken } from "@/services/auth.service";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip as ReTooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
} from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

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

  // Destructure with optional chaining
  const users = analytics?.userAnalytics;
  const bookings = analytics?.bookingAnalytics;
  const listings = analytics?.listingAnalytics;
  const totals = analytics?.totalCountAnalytics;

  const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#8dd1e1"];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Totals */}
      <Card>
        <CardHeader>
          <CardTitle>Totals</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Total Users: {totals?.totalUsers}</p>
          <p>Total Bookings: {totals?.totalBookings}</p>
          <p>Total Listings: {totals?.totalListings}</p>
        </CardContent>
      </Card>

      {/* Users Role Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>User Roles</CardTitle>
        </CardHeader>
        <CardContent style={{ height: 250 }}>
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={users?.rolesDistribution ?? []}
                dataKey="count"
                nameKey="_id"
                outerRadius={80}
                fill="#8884d8"
                label
              >
                {(users?.rolesDistribution ?? []).map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend />
              <ReTooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Booking Status Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Booking Status</CardTitle>
        </CardHeader>
        <CardContent style={{ height: 250 }}>
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={bookings?.statusDistribution ?? []}
                dataKey="count"
                nameKey="_id"
                outerRadius={80}
                fill="#82ca9d"
                label
              >
                {(bookings?.statusDistribution ?? []).map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend />
              <ReTooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Monthly Bookings */}
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Monthly Bookings</CardTitle>
        </CardHeader>
        <CardContent style={{ height: 300 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={bookings?.monthlyBookings ?? []}>
              <XAxis dataKey="month" />
              <YAxis />
              <ReTooltip />
              <Bar dataKey="count" fill="#ffc658" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Listings Bedrooms Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Bedrooms Distribution</CardTitle>
        </CardHeader>
        <CardContent style={{ height: 250 }}>
          <ResponsiveContainer>
            <BarChart
              data={
                listings?.bedroomsDistribution.map((item) => ({
                  name: item._id,
                  count: item.count,
                })) ?? []
              }
            >
              <XAxis dataKey="name" />
              <YAxis />
              <ReTooltip />
              <Bar dataKey="count" fill="#ff8042" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Listings Location Distribution */}
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Listing Locations</CardTitle>
        </CardHeader>
        <CardContent style={{ height: 300 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={
                listings?.locationDistribution.map((item) => ({
                  name: item._id,
                  count: item.count,
                })) ?? []
              }
            >
              <XAxis dataKey="name" />
              <YAxis />
              <ReTooltip />
              <Bar dataKey="count" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
