import { Card } from "@/components/ui/card";

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: React.ReactNode;
}

export const StatCard = ({ title, value, description, icon }: StatCardProps) => {
  return (
    <Card className="stat-card animate-fade-in">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-secondary-foreground">{title}</p>
          <h3 className="text-2xl font-bold text-primary mt-2">{value}</h3>
          {description && (
            <p className="text-sm text-secondary-foreground mt-1">{description}</p>
          )}
        </div>
        {icon && <div className="text-primary-accent">{icon}</div>}
      </div>
    </Card>
  );
};