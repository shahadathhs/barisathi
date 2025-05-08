"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAdminAnalytics } from "@/services/analytics.service";
import { getToken } from "@/services/auth.service";
import { BarChart, Bar, PieChart, Pie, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowUpCircle,
  BarChart3,
  Building,
  Home,
  Loader2,
  Users,
} from "lucide-react";
import { toast } from "sonner";
import {
  AdminAnalytics,
  BookingAnalytics,
  TotalCountAnalytics,
  UserAnalytics,
} from "@/interface/analytics.interface";
import AnalyticsSummary from "@/components/admin/AnalyticsSummary";
import AnalyticsOverviewTab from "@/components/admin/AnalyticsOverviewTab";

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

  const bedroomsData =
    listings?.bedroomsDistribution.map((item) => ({
      name: item._id,
      value: item.count,
    })) || [];

  const locationsData =
    listings?.locationDistribution
      .map((item) => ({
        name: item._id,
        value: item.count,
      }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 10) || [];

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
        <TabsContent value="users" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  User Activity
                </CardTitle>
                <CardDescription>Active vs. Inactive users</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  className="h-[300px]"
                  config={{
                    active: { label: "Active", color: "hsl(120, 70%, 60%)" },
                    inactive: { label: "Inactive", color: "hsl(0, 70%, 60%)" },
                  }}
                >
                  <PieChart>
                    <Pie
                      data={[
                        {
                          name: "Active",
                          value: users?.activeCount || 0,
                          fill: "hsl(120, 70%, 60%)",
                        },
                        {
                          name: "Inactive",
                          value: users?.inactiveCount || 0,
                          fill: "hsl(0, 70%, 60%)",
                        },
                      ]}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      innerRadius={60}
                      paddingAngle={2}
                      label
                    />
                    <ChartTooltip
                      content={
                        <ChartTooltipContent
                          formatter={(value, name) => [`${value} users`, name]}
                        />
                      }
                    />
                    <ChartLegend
                      content={<ChartLegendContent />}
                      verticalAlign="bottom"
                      align="center"
                    />
                  </PieChart>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium flex items-center gap-2">
                  <ArrowUpCircle className="h-5 w-5 text-primary" />
                  User Growth
                </CardTitle>
                <CardDescription>
                  Monthly user registration trend
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  className="h-[300px]"
                  config={{
                    value: { label: "New Users", color: "hsl(220, 70%, 60%)" },
                  }}
                >
                  <BarChart
                    data={[
                      { name: "Jan", value: 65 },
                      { name: "Feb", value: 78 },
                      { name: "Mar", value: 92 },
                      { name: "Apr", value: 105 },
                      { name: "May", value: 120 },
                      { name: "Jun", value: 135 },
                    ]}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <XAxis dataKey="name" />
                    <YAxis />
                    <ChartTooltip
                      content={
                        <ChartTooltipContent
                          formatter={(value, name) => [
                            `${value} new users`,
                            name,
                          ]}
                        />
                      }
                    />
                    <Bar dataKey="value" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Properties Tab */}
        <TabsContent value="properties" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium flex items-center gap-2">
                  <Home className="h-5 w-5 text-primary" />
                  Bedrooms Distribution
                </CardTitle>
                <CardDescription>
                  Properties by number of bedrooms
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  className="h-[300px]"
                  config={{
                    value: { label: "Properties", color: "hsl(280, 70%, 60%)" },
                  }}
                >
                  <BarChart
                    data={bedroomsData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <XAxis dataKey="name" />
                    <YAxis />
                    <ChartTooltip
                      content={
                        <ChartTooltipContent
                          formatter={(value, name) => [
                            `${value} properties`,
                            `${name} bedroom${name !== "1" ? "s" : ""}`,
                          ]}
                        />
                      }
                    />
                    <Bar dataKey="value" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium flex items-center gap-2">
                  <Building className="h-5 w-5 text-primary" />
                  Property Metrics
                </CardTitle>
                <CardDescription>Key property statistics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Average Rent</span>
                    <span className="text-xl font-semibold">
                      ${listings?.averageRent.toFixed(2)}
                    </span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full"
                      style={{ width: "75%" }}
                    ></div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">
                      Occupancy Rate
                    </span>
                    <span className="text-xl font-semibold">78%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full"
                      style={{ width: "78%" }}
                    ></div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">
                      Listing Growth
                    </span>
                    <span className="text-xl font-semibold">+12%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full"
                      style={{ width: "62%" }}
                    ></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium flex items-center gap-2">
                <Building className="h-5 w-5 text-primary" />
                Top Locations
              </CardTitle>
              <CardDescription>Most popular property locations</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                className="h-[300px]"
                config={{
                  value: { label: "Properties", color: "hsl(180, 70%, 50%)" },
                }}
              >
                <BarChart
                  data={locationsData}
                  layout="vertical"
                  margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
                >
                  <XAxis type="number" />
                  <YAxis type="category" dataKey="name" width={90} />
                  <ChartTooltip
                    content={
                      <ChartTooltipContent
                        formatter={(value, name) => [
                          `${value} properties`,
                          name,
                        ]}
                      />
                    }
                  />
                  <Bar dataKey="value" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
