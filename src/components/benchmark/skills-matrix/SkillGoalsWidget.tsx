import { Card } from "@/components/ui/card";

interface SkillGoalsWidgetProps {
  skillGoalsCount: number;
  totalSkillsCount: number;
}

export const SkillGoalsWidget = ({ skillGoalsCount, totalSkillsCount }: SkillGoalsWidgetProps) => {
  const percentage = Math.round((skillGoalsCount / totalSkillsCount) * 100) || 0;

  return (
    <Card className="p-6 space-y-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-foreground">Skill Goals</span>
        <span className="text-sm text-foreground">
          {skillGoalsCount} out of {totalSkillsCount}
        </span>
      </div>
      <div className="h-2 w-full bg-[#F7F9FF] rounded-full overflow-hidden">
        <div 
          className="h-full bg-[#1F2144] rounded-full transition-all duration-300" 
          style={{ width: `${percentage}%` }} 
        />
      </div>
    </Card>
  );
};