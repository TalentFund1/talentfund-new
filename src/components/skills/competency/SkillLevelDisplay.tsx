import { useCompetencyStateReader } from "./CompetencyStateReader";
import { useRoleStore } from "../../benchmark/RoleBenchmark";

export const SkillLevelDisplay = ({ roleId, level = "p3" }: { roleId: string; level?: string }) => {
  const { getAllSkillStatesForLevel } = useCompetencyStateReader();
  const skillStates = getAllSkillStatesForLevel(level, roleId);

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Skills for Level {level.toUpperCase()}</h3>
      <div className="space-y-2">
        {Object.entries(skillStates).map(([skillName, state]) => (
          <div key={skillName} className="flex justify-between items-center p-2 bg-background rounded-lg">
            <span className="font-medium">{skillName}</span>
            <div className="flex gap-4">
              <span className="text-sm text-muted-foreground">Level: {state.level}</span>
              <span className="text-sm text-muted-foreground">Required: {state.required}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};