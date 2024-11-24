export type SkillLevel = "unspecified" | "beginner" | "intermediate" | "advanced";
export type RequirementType = "required" | "preferred";

export interface SkillLevelState {
  level: SkillLevel;
  required: RequirementType;
}

export interface SkillState {
  [key: string]: SkillLevelState;
}

export interface RoleSkillState {
  [key: string]: SkillState;
}

export interface RoleCompetencyState {
  [key: string]: RoleSkillState;
}

export interface CompetencyState {
  currentStates: RoleCompetencyState;
  originalStates: RoleCompetencyState;
  hasChanges: boolean;
  setSkillState: (skillTitle: string, level: SkillLevel, levelKey: string, requirement: RequirementType) => void;
  saveChanges: () => void;
  cancelChanges: () => void;
  initializeStates: (roleId: string) => void;
  resetToDefaults: () => void;
}