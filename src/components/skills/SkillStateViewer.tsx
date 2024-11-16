import { useSkillsMatrixStore } from "../benchmark/skills-matrix/SkillsMatrixState";
import { useCompetencyStore } from "./competency/CompetencyState";
import { Card } from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";

export const SkillStateViewer = () => {
  const { currentStates } = useSkillsMatrixStore();
  const competencyStates = useCompetencyStore(state => state.currentStates);

  return (
    <Card className="p-6 space-y-4">
      <h3 className="text-lg font-semibold">Current Skill States</h3>
      <ScrollArea className="h-[400px] rounded-md border p-4">
        <div className="space-y-4">
          {Object.entries(currentStates).map(([skillName, state]) => (
            <div key={skillName}>
              <h4 className="font-medium">{skillName}</h4>
              <div className="pl-4 text-sm text-muted-foreground">
                <p>Level: {state.level}</p>
                <p>Requirement: {state.requirement}</p>
              </div>
              {competencyStates[skillName] && (
                <div className="pl-4 mt-2">
                  <p className="text-sm font-medium">Competency Levels:</p>
                  {Object.entries(competencyStates[skillName]).map(([level, competency]) => (
                    <div key={level} className="pl-4 text-sm text-muted-foreground">
                      <p>{level}: {competency.level} ({competency.required})</p>
                    </div>
                  ))}
                </div>
              )}
              <Separator className="my-2" />
            </div>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
};