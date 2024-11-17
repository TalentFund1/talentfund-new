import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface SkillGoalsWidgetProps {
  totalSkills: number;
  skillGoalsCount: number;
}

export const SkillGoalsWidget = ({ totalSkills, skillGoalsCount }: SkillGoalsWidgetProps) => {
  const progress = totalSkills > 0 ? (skillGoalsCount / totalSkills) * 100 : 0;

  return (
    <Card className="p-4 space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">Skill Goals</span>
        <span className="text-sm text-muted-foreground">
          {skillGoalsCount} out of {totalSkills}
        </span>
      </div>
      <Progress value={progress} className="h-2" />
    </Card>
  );
};