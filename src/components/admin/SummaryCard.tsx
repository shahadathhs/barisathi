import { Card, CardContent } from "../ui/card";

interface SummaryCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  description: string;
  trend: string;
  color: string;
  iconColor: string;
}

export default function SummaryCard({
  title,
  value,
  icon,
  description,
  trend,
  color,
  iconColor,
}: SummaryCardProps) {
  return (
    <Card className={`${color} border-none shadow-sm`}>
      <CardContent>
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <div className="flex items-baseline gap-2">
              <h2 className="text-3xl font-bold">{value.toLocaleString()}</h2>
              <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400 flex items-center">
                {trend}
              </span>
            </div>
            <p className="text-xs text-muted-foreground">{description}</p>
          </div>
          <div className={`p-2 rounded-full ${iconColor} bg-background/80`}>
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
