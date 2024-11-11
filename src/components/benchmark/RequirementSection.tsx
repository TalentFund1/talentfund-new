import { Card } from "@/components/ui/card";

interface RequirementSectionProps {
  title: string;
  count: number;
  skills: Array<{
    title: string;
    level: string;
    requirement?: string;
  }>;
  isSelected?: boolean;
  onClick?: () => void;
}

export const RequirementSection = ({ 
  title, 
  count, 
  skills,
  isSelected,
  onClick 
}: RequirementSectionProps) => {
  const isAllCategories = title === 'All Categories';
  
  return (
    <Card 
      className={`
        p-4 
        border 
        rounded-lg 
        cursor-pointer 
        transition-all 
        duration-200 
        ${isAllCategories ? 'bg-[#F5F3FF] border-[#E9E5FF] hover:border-primary-accent' : 
          'bg-[#F9FAFB] border-[#F3F4F6] hover:border-border'
        }
        ${isSelected ? 'ring-2 ring-primary-accent ring-offset-2' : ''}
      `}
      onClick={onClick}
    >
      <div className="flex flex-col gap-1">
        <span className={`text-sm font-medium ${
          isAllCategories ? 'text-primary-accent' : 'text-foreground'
        }`}>
          {title}
        </span>
        <span className="text-xs text-muted-foreground">
          {count} {count === 1 ? 'skill' : 'skills'}
        </span>
      </div>
    </Card>
  );
};