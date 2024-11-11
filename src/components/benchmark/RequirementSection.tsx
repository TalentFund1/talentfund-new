import { Card } from "@/components/ui/card";

interface RequirementSectionProps {
  title: string;
  count: number;
  skills: Array<{
    title: string;
    level: string;
    requirement?: string;
  }>;
}

export const RequirementSection = ({ title, count, skills }: RequirementSectionProps) => {
  return (
    <Card className="p-4 bg-white hover:bg-background/80 transition-colors border border-[#E5E7EB] rounded-lg">
      <div className="flex flex-col gap-1">
        <span className={`text-sm font-medium ${title === 'All Categories' ? 'text-primary-accent' : 'text-foreground'}`}>
          {title}
        </span>
        <span className="text-xs text-muted-foreground">
          {count} {count === 1 ? 'skill' : 'skills'}
        </span>
      </div>
    </Card>
  );
};