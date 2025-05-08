import { Building, Home } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { TabsContent } from "../ui/tabs";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "../ui/chart";
import { ResponsiveContainer, Bar, BarChart, XAxis, YAxis } from "recharts";
import { ListingAnalytics } from "@/interface/analytics.interface";

export default function AnalyticsPropertiesTab({
  listings,
}: {
  listings: ListingAnalytics;
}) {
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
    <TabsContent value="properties" className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Bedrooms Distribution */}
        <Card className="shadow-none">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center gap-2">
              <Home className="h-5 w-5 text-primary" />
              Bedrooms Distribution
            </CardTitle>
            <CardDescription>Properties by number of bedrooms</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <ChartContainer
              className="h-[240px] w-full overflow-x-auto"
              config={{
                value: { label: "Properties", color: "hsl(280, 70%, 60%)" },
              }}
            >
              <ResponsiveContainer width="100%" height="100%">
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
                          `${value} `,
                          `bedroom${name !== "1" ? "s" : ""}`,
                        ]}
                      />
                    }
                  />
                  <Bar dataKey="value" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Property Metrics */}
        <Card className="shadow-none">
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
                <span className="text-muted-foreground">Occupancy Rate</span>
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
                <span className="text-muted-foreground">Listing Growth</span>
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

        {/* Top Locations */}
        <Card className="shadow-none">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center gap-2">
              <Building className="h-5 w-5 text-primary" />
              Top Locations
            </CardTitle>
            <CardDescription>Most popular property locations</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <ChartContainer
              className="h-[240px] w-full overflow-x-auto"
              config={{
                value: { label: "Properties", color: "hsl(180, 70%, 50%)" },
              }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={locationsData}
                  layout="vertical"
                  margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
                >
                  <XAxis type="number" />
                  <YAxis type="category" dataKey="name" width={90} />
                  <ChartTooltip
                    content={
                      <ChartTooltipContent
                        formatter={(value) => [`${value}`]}
                      />
                    }
                  />
                  <Bar dataKey="value" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </TabsContent>
  );
}
