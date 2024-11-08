import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface CompensationStatsCardProps {
  title: string;
  value: string | number;
  subtitle: string;
  icon: LucideIcon;
}

export const CompensationStatsCard = ({ title, value, subtitle, icon: Icon }: CompensationStatsCardProps) => {
  return (
    <Card className="p-4 w-64 bg-[#F7F9FF]">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-secondary-foreground">{title}</p>
          <h3 className="text-2xl font-bold text-primary mt-2">{value}</h3>
          <p className="text-sm text-secondary-foreground mt-1">{subtitle}</p>
        </div>
        <Icon className="h-5 w-5 text-primary-accent" />
      </div>
    </Card>
  );
};