import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { useCompetencyStateReader } from "../skills/competency/CompetencyStateReader";
import { useSkillsMatrixStore } from "./skills-matrix/SkillsMatrixState";

interface CompetencyMatchSectionProps {
  skills: any[];
  roleLevel: string;
}

const getLevelPriority = (level: string = 'unspecified') => {
  const priorities: { [key: string]: number } = {
    'advanced': 3,
    'intermediate': 2,
    'beginner': 1,
    'unspecified': 1  // Changed from 0 to 1 to match beginner level
  };
  return priorities[level.toLowerCase()] ?? 1;
};

export const CompetencyMatchSection = ({ skills, roleLevel }: CompetencyMatchSectionProps) => {
  const { getSkillCompetencyState } = useCompetencyStateReader();
  const { currentStates } = useSkillsMatrixStore();

  const matchingSkills = skills.filter(skill => {
    const roleSkillState = getSkillCompetencyState(skill.title, roleLevel.toLowerCase());
    if (!roleSkillState) return false;

    const employeeSkillLevel = currentStates[skill.title]?.[roleLevel.toLowerCase()]?.level || skill.level || 'unspecified';
    const roleSkillLevel = roleSkillState.level;

    // If role requires advanced, don't match unspecified
    if (roleSkillLevel.toLowerCase() === 'advanced' && employeeSkillLevel.toLowerCase() === 'unspecified') {
      return false;
    }

    return getLevelPriority(employeeSkillLevel) >= getLevelPriority(roleSkillLevel);
  });

  if (matchingSkills.length === 0) return null;

  return (
    <Card className="p-6 space-y-4">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">Competency Match</span>
        <span className="bg-[#8073ec]/10 text-[#1F2144] rounded-full px-2 py-0.5 text-xs font-medium">
          {matchingSkills.length}
        </span>
      </div>
      <div className="flex flex-wrap gap-2">
        {matchingSkills.map((skill) => (
          <Badge 
            key={skill.title}
            variant="outline" 
            className="rounded-md px-4 py-2 border border-border bg-white hover:bg-background/80 transition-colors flex items-center gap-2"
          >
            {skill.title}
            <div className={`h-2 w-2 rounded-full bg-primary-accent`} />
          </Badge>
        ))}
      </div>
    </Card>
  );
};