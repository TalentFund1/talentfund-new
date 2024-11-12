import { Card } from "@/components/ui/card";
import { useToggledSkills } from "../skills/context/ToggledSkillsContext";
import { roleSkills } from "../skills/data/roleSkills";
import { useParams } from "react-router-dom";

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
  skills,
  isSelected,
  onClick 
}: RequirementSectionProps) => {
  const { id } = useParams<{ id: string }>();
  const { toggledSkills } = useToggledSkills();
  const currentRoleSkills = roleSkills[id as keyof typeof roleSkills] || roleSkills["123"];
  
  const getToggledSkillsCount = () => {
    if (title === 'All Categories') {
      const allSkills = [
        ...currentRoleSkills.specialized,
        ...currentRoleSkills.common,
        ...currentRoleSkills.certifications
      ];
      return allSkills.filter(skill => toggledSkills.has(skill.title)).length;
    }
    
    if (title === 'Specialized Skills') {
      return currentRoleSkills.specialized.filter(skill => toggledSkills.has(skill.title)).length;
    }
    
    if (title === 'Common Skills') {
      return currentRoleSkills.common.filter(skill => toggledSkills.has(skill.title)).length;
    }
    
    if (title === 'Certification') {
      return currentRoleSkills.certifications.filter(skill => toggledSkills.has(skill.title)).length;
    }
    
    return 0;
  };

  const count = getToggledSkillsCount();
  
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
            {count} {count === 1 ? 'skill' : 'skills'}
          </span>
        </div>
      </Card>
    </button>
  );
};