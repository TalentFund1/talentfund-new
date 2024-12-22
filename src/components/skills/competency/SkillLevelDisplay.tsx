import { useCompetencyStateReader } from "./CompetencyStateReader";
import { useRoleStore } from "../../benchmark/RoleBenchmark";
import { RoleSkillState } from "../types/SkillTypes";

export const SkillLevelDisplay = ({ roleId, level = "p3" }: { roleId: string; level?: string }) => {
  const { getSkillCompetencyState } = useCompetencyStateReader();
  const skillStates: Record<string, RoleSkillState> = {};

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Skills for Level {level.toUpperCase()}</h3>
      <div className="space-y-2">
        {Object.entries(skillStates).map(([skillName, state]) => (
          <div key={skillName} className="flex justify-between items-center p-2 bg-background rounded-lg">
            <span className="font-medium">{skillName}</span>
            <div className="flex gap-4">
              <span className="text-sm text-muted-foreground">Level: {state.level}</span>
              <span className="text-sm text-muted-foreground">Required: {state.requirement}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};