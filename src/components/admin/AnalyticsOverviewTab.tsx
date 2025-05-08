import { BarChart3, PieChartIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { TabsContent } from "../ui/tabs";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "../ui/chart";
import {
  ResponsiveContainer,
  Bar,
  Pie,
  BarChart,
  PieChart,
  XAxis,
  YAxis,
} from "recharts";
import {
  BookingAnalytics,
  UserAnalytics,
} from "@/interface/analytics.interface";

export default function AnalyticsOverviewTab({
  users,
  bookings,
}: {
  users: UserAnalytics;
  bookings: BookingAnalytics;
}) {
  // Prepare data for charts
  const userRolesData =
    users?.rolesDistribution.map((item, index) => ({
      name: item._id,
      value: item.count,
      fill: `hsl(${index * 40}, 70%, 60%)`,
    })) || [];

  const bookingStatusData =
    bookings?.statusDistribution.map((item, index) => ({
      name: item._id,
      value: item.count,
      fill: `hsl(${index * 40 + 120}, 70%, 60%)`,
    })) || [];

  const monthlyBookingsData =
    bookings?.monthlyBookings.map((item) => ({
      name: item.month,
      value: item.count,
    })) || [];

  return (
    <TabsContent value="overview" className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* User Roles Distribution */}
        <Card className="shadow-none">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center gap-2">
              <PieChartIcon className="h-5 w-5 text-primary" />
              User Roles Distribution
            </CardTitle>
            <CardDescription>Breakdown of users by role</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <ChartContainer
              className="h-[200px] w-full overflow-x-auto"
              config={{
                admin: { label: "Admin", color: "hsl(0, 70%, 60%)" },
                landlord: { label: "Landlord", color: "hsl(40, 70%, 60%)" },
                tenant: { label: "Tenant", color: "hsl(80, 70%, 60%)" },
                guest: { label: "Guest", color: "hsl(120, 70%, 60%)" },
              }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={userRolesData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={60}
                    innerRadius={30}
                    paddingAngle={2}
                    label
                  />
                  <ChartTooltip
                    content={
                      <ChartTooltipContent
                        formatter={(value, name) => [`${value} `, name]}
                      />
                    }
                  />
                  <ChartLegend
                    content={<ChartLegendContent />}
                    verticalAlign="bottom"
                    align="center"
                  />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Booking Status Distribution */}
        <Card className="shadow-none">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center gap-2">
              <PieChartIcon className="h-5 w-5 text-primary" />
              Booking Status
            </CardTitle>
            <CardDescription>Distribution of booking statuses</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <ChartContainer
              className="h-[200px] w-full overflow-x-auto"
              config={{
                pending: { label: "Pending", color: "hsl(40, 70%, 60%)" },
                confirmed: { label: "Confirmed", color: "hsl(120, 70%, 60%)" },
                cancelled: { label: "Cancelled", color: "hsl(0, 70%, 60%)" },
                rejected: { label: "Rejected", color: "hsl(200, 70%, 60%)" },
              }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={bookingStatusData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={60}
                    innerRadius={30}
                    paddingAngle={2}
                    label
                  />
                  <ChartTooltip
                    content={
                      <ChartTooltipContent
                        formatter={(value, name) => [`${value} `, name]}
                      />
                    }
                  />
                  <ChartLegend
                    content={<ChartLegendContent />}
                    verticalAlign="bottom"
                    align="center"
                  />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Monthly Bookings Trend */}
        <Card className="shadow-none">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              Monthly Bookings
            </CardTitle>
            <CardDescription>
              Booking trends over the past months
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <ChartContainer
              className="h-[200px] w-full overflow-x-auto"
              config={{
                value: { label: "Bookings", color: "hsl(220, 70%, 60%)" },
              }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={monthlyBookingsData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <XAxis dataKey="name" />
                  <YAxis />
                  <ChartTooltip
                    content={
                      <ChartTooltipContent
                        formatter={(value) => [`${value} bookings`]}
                      />
                    }
                  />
                  <Bar dataKey="value" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </TabsContent>
  );
}
