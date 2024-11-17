import { Card } from "@/components/ui/card";
import { useCompetencyStateReader } from "../../skills/competency/CompetencyStateReader";
import { useRoleStore } from "../RoleBenchmark";
import { useSkillsMatrixStore } from "./SkillsMatrixState";

interface CompetencyMatchWidgetProps {
  totalSkills: number;
  skills: Array<{
    title: string;
    level: string;
  }>;
}

export const CompetencyMatchWidget = ({ totalSkills, skills }: CompetencyMatchWidgetProps) => {
  const { selectedLevel } = useRoleStore();
  const { getSkillCompetencyState } = useCompetencyStateReader();
  const { currentStates } = useSkillsMatrixStore();

  const getSkillLevelPriority = (level: string) => {
    const priorities: { [key: string]: number } = {
      'advanced': 3,
      'intermediate': 2,
      'beginner': 1,
      'unspecified': 0
    };
    return priorities[level.toLowerCase()] ?? 0;
  };

  const matchingSkills = skills.filter(skill => {
    const competencyState = getSkillCompetencyState(skill.title, selectedLevel.toLowerCase());
    const roleSkillLevel = competencyState?.level || 'unspecified';
    const currentSkillLevel = currentStates[skill.title]?.level || skill.level || 'unspecified';
    
    return getSkillLevelPriority(currentSkillLevel) >= getSkillLevelPriority(roleSkillLevel);
  });

  const matchCount = matchingSkills.length;
  const matchPercentage = totalSkills > 0 ? (matchCount / totalSkills) * 100 : 0;

  return (
    <Card className="p-6 bg-white space-y-4">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">Competency Match</h3>
          <span className="text-sm font-medium text-muted-foreground">
            {matchCount} out of {totalSkills}
          </span>
        </div>

        <div className="space-y-2">
          <div className="h-2 w-full bg-[#F7F9FF] rounded-full overflow-hidden">
            <div 
              className="h-full bg-[#1F2144] rounded-full transition-all duration-300" 
              style={{ width: `${matchPercentage}%` }} 
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {matchingSkills.map((skill) => (
            <span
              key={skill.title}
              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-accent/10 text-primary-accent"
            >
              {skill.title}
            </span>
          ))}
        </div>
      </div>
    </Card>
  );
};