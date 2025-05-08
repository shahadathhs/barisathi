import { Building, Calendar, Users } from "lucide-react";
import SummaryCard from "./SummaryCard";
import { TotalCountAnalytics } from "@/interface/analytics.interface";

export default function AnalyticsSummary({
  totals,
}: {
  totals: TotalCountAnalytics;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <SummaryCard
        title="Total Users"
        value={totals?.totalUsers || 0}
        icon={<Users className="h-5 w-5" />}
        description="Registered users on the platform"
        trend={"+12% from last month"}
        color="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900"
        iconColor="text-blue-500"
      />
      <SummaryCard
        title="Total Bookings"
        value={totals?.totalBookings || 0}
        icon={<Calendar className="h-5 w-5" />}
        description="Completed and pending bookings"
        trend={"+8% from last month"}
        color="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900"
        iconColor="text-purple-500"
      />
      <SummaryCard
        title="Total Listings"
        value={totals?.totalListings || 0}
        icon={<Building className="h-5 w-5" />}
        description="Active property listings"
        trend={"+5% from last month"}
        color="bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-950 dark:to-emerald-900"
        iconColor="text-emerald-500"
      />
    </div>
  );
}
