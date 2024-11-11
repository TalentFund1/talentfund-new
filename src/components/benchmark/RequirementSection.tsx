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
  const isAllCategories = title === 'All Categories';
  
  return (
    <Card className={`p-4 border rounded-lg ${
      isAllCategories ? 'bg-[#F5F3FF] border-[#E9E5FF]' : 'bg-[#F9FAFB] border-[#F3F4F6]'
    }`}>
      <div className="flex flex-col gap-1">
        <span className={`text-sm font-medium ${isAllCategories ? 'text-[#8073ec]' : 'text-foreground'}`}>
          {title}
        </span>
        <span className="text-xs text-muted-foreground">
          {count} {count === 1 ? 'skill' : 'skills'}
        </span>
      </div>
    </Card>
  );
};