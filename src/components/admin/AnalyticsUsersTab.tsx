import { ArrowUpCircle, Users } from "lucide-react";
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
import { UserAnalytics } from "@/interface/analytics.interface";

export default function AnalyticsUsersTab({ users }: { users: UserAnalytics }) {
  return (
    <TabsContent value="users" className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* User Activity */}
        <Card className="shadow-none">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              User Activity
            </CardTitle>
            <CardDescription>Active vs. Inactive users</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <ChartContainer
              className="h-[200px] w-full overflow-x-auto"
              config={{
                active: { label: "Active", color: "hsl(120, 70%, 60%)" },
                inactive: { label: "Inactive", color: "hsl(0, 70%, 60%)" },
              }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={[
                      {
                        name: "active",
                        value: users?.activeCount || 0,
                        fill: "hsl(120, 70%, 60%)",
                      },
                      {
                        name: "inactive",
                        value: users?.inactiveCount || 0,
                        fill: "hsl(0, 70%, 60%)",
                      },
                    ]}
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

        {/* User Growth */}
        <Card className="shadow-none">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center gap-2">
              <ArrowUpCircle className="h-5 w-5 text-primary" />
              User Growth
            </CardTitle>
            <CardDescription>Monthly user registration trend</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <ChartContainer
              className="h-[200px] w-full overflow-x-auto"
              config={{
                value: { label: "New Users", color: "hsl(220, 70%, 60%)" },
              }}
            >
              <ResponsiveContainer width="100%" height="100%">
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
                        formatter={(value) => [`${value} new users`]}
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
