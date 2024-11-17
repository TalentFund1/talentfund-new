import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { useCompetencyStateReader } from "../../skills/competency/CompetencyStateReader";
import { useRoleStore } from "../RoleBenchmark";

interface SkillGoalsSectionProps {
  skills: any[];
  totalSkills: number;
}

export const SkillGoalsSection = ({ skills, totalSkills }: SkillGoalsSectionProps) => {
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

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-border bg-white p-6 w-full">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-sm font-medium">Skill Goals</span>
          <span className="bg-[#8073ec]/10 text-[#1F2144] rounded-full px-2 py-0.5 text-xs font-medium">
            {skills.length}
          </span>
        </div>
        <div className="flex flex-wrap gap-2 mb-6">
          {skills.map((skill) => (
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
        <div className="space-y-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-foreground">
              {skills.length} out of {totalSkills}
            </span>
          </div>
          <div className="h-2 w-full bg-[#F7F9FF] rounded-full overflow-hidden">
            <div 
              className="h-full bg-[#1F2144] rounded-full" 
              style={{ width: `${(skills.length / totalSkills) * 100}%` }} 
            />
          </div>
        </div>
      </div>
    </div>
  );
};