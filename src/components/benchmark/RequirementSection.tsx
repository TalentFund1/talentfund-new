import { Card } from "@/components/ui/card";
import { RoleSkillRequirement } from "@/types/skillTypes";

interface RequirementSectionProps {
  title: string;
  count: number;
  skills: Array<{
    title: string;
    level: string;
    requirement?: RoleSkillRequirement;
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
  return (
    <button
      onClick={onClick}
      className="w-full text-left"
    >
      <Card 
        className={`
          p-4 
          transition-colors 
          ${isSelected
            ? 'bg-primary-accent/5 border border-primary-accent'
            : 'bg-background border border-border hover:border-primary-accent/50'
          }
        `}
      >
        <div className="flex flex-col gap-1">
          <span className={`text-sm font-semibold ${
            isSelected ? 'text-primary-accent' : 'text-foreground'
          }`}>
            {title}
          </span>
          <span className="text-xs text-muted-foreground">
            {count} {count === 1 ? 'skill' : 'skills'}
          </span>
        </div>
      </Card>
    </button>
  );
};