import { Card } from "@/components/ui/card";

interface SkillGoalsWidgetProps {
  totalSkills: number;
  skillGoalsCount: number;
}

export const SkillGoalsWidget = ({ totalSkills, skillGoalsCount }: SkillGoalsWidgetProps) => {
  const percentage = Math.round((skillGoalsCount / totalSkills) * 100) || 0;

  return (
    <div className="rounded-2xl border border-border bg-white p-6 w-full">
      <div className="space-y-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-foreground">Skill Goals</span>
          <span className="text-sm text-foreground">
            {skillGoalsCount} out of {totalSkills}
          </span>
        </div>
        <div className="h-2 w-full bg-[#F7F9FF] rounded-full overflow-hidden">
          <div 
            className="h-full bg-[#1F2144] rounded-full transition-all duration-300" 
            style={{ width: `${percentage}%` }} 
          />
        </div>
      </div>
    </div>
  );
};