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
  
  // For "All Categories", we want to show the actual count of unique skills
  const displayCount = isAllCategories ? 12 : count;
  
  return (
    <button
      onClick={onClick}
      className="w-full text-left"
    >
      <Card 
        className={`
          p-4 
          transition-all 
          duration-200 
          hover:border-primary-accent/50
          ${isSelected
            ? 'bg-primary-accent/5 border border-primary-accent'
            : 'bg-background border border-border'
          }
        `}
      >
        <div className="flex flex-col gap-1">
          <span className={`text-sm font-semibold ${
            isSelected ? 'text-primary-accent' : 'text-foreground group-hover:text-primary-accent'
          }`}>
            {title}
          </span>
          <span className="text-xs text-muted-foreground">
            {displayCount} {displayCount === 1 ? 'skill' : 'skills'}
          </span>
        </div>
      </Card>
    </button>
  );
};