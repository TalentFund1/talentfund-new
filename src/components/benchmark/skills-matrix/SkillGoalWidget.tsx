import { Card } from "@/components/ui/card";

interface SkillGoalWidgetProps {
  skillGoals: any[];
  totalSkills: number;
}

export const SkillGoalWidget = ({ skillGoals, totalSkills }: SkillGoalWidgetProps) => {
  const goalPercentage = Math.round((skillGoals.length / totalSkills) * 100) || 0;

  return (
    <Card className="p-6 space-y-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-foreground">Skill Goals</span>
        <span className="text-sm text-foreground">
          {skillGoals.length} out of {totalSkills}
        </span>
      </div>
      <div className="h-2 w-full bg-[#F7F9FF] rounded-full overflow-hidden">
        <div 
          className="h-full bg-[#1F2144] rounded-full" 
          style={{ width: `${goalPercentage}%` }} 
        />
      </div>
    </Card>
  );
};