import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

interface SavedSkillsBadgesProps {
  toggledSkills: Set<string>;
  onRemoveSkill: (skill: string) => void;
}

export const SavedSkillsBadges = ({ toggledSkills, onRemoveSkill }: SavedSkillsBadgesProps) => {
  if (toggledSkills.size === 0) return null;

  return (
    <div className="flex flex-wrap gap-2 mb-4 p-4 bg-muted/30 rounded-lg">
      {Array.from(toggledSkills).map((skill) => (
        <Badge 
          key={skill} 
          variant="secondary"
          className="flex items-center gap-1 py-1 px-3"
        >
          {skill}
          <X 
            className="h-3 w-3 cursor-pointer hover:text-destructive" 
            onClick={() => onRemoveSkill(skill)}
          />
        </Badge>
      ))}
    </div>
  );
};