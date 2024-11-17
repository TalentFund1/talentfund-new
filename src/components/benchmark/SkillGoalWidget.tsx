import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface SkillGoalWidgetProps {
  totalSkills: number;
  skillGoalsCount: number;
}

export const SkillGoalWidget = ({ totalSkills, skillGoalsCount }: SkillGoalWidgetProps) => {
  const percentage = Math.round((skillGoalsCount / totalSkills) * 100) || 0;

  return (
    <Card className="p-4 space-y-2">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium">Skill Goals Progress</h3>
        <span className="text-sm text-muted-foreground">
          {skillGoalsCount} out of {totalSkills}
        </span>
      </div>
      <Progress value={percentage} className="h-2" />
    </Card>
  );
};