import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { useSkillsMatrixStore } from "./skills-matrix/SkillsMatrixState";
import { useCompetencyStateReader } from "../skills/competency/CompetencyStateReader";
import { useRoleStore } from "./RoleBenchmark";

interface SkillGoalSectionProps {
  skills: any[];
  count: number;
}

export const SkillGoalSection = ({ skills, count }: SkillGoalSectionProps) => {
  const { currentStates } = useSkillsMatrixStore();
  const { selectedLevel } = useRoleStore();
  const { getSkillCompetencyState } = useCompetencyStateReader();

  const getLevelColor = (skillTitle: string) => {
    const competencyState = getSkillCompetencyState(skillTitle, selectedLevel.toLowerCase());
    if (!competencyState?.level) return "bg-gray-300";

    const level = String(competencyState.level).toLowerCase();
    
    switch (level) {
      case "advanced":
        return "bg-primary-accent";
      case "intermediate":
        return "bg-primary-icon";
      case "beginner":
        return "bg-[#008000]";
      default:
        return "bg-gray-300";
    }
  };

  // Filter skills based on role profile match
  const skillGoals = skills;

  return (
    <Card className="p-6 space-y-4">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">Skill Goals</span>
        <span className="bg-[#8073ec]/10 text-[#1F2144] rounded-full px-2 py-0.5 text-xs font-medium">
          {skillGoals.length}
        </span>
      </div>
      <div className="flex flex-wrap gap-2">
        {skillGoals.map((skill) => (
          <Badge 
            key={skill.title}
            variant="outline" 
            className="rounded-md px-4 py-2 border border-border bg-white hover:bg-background/80 transition-colors flex items-center gap-2"
          >
            {skill.title}
            <div className={`h-2 w-2 rounded-full ${getLevelColor(skill.title)}`} />
          </Badge>
        ))}
      </div>
    </Card>
  );
};