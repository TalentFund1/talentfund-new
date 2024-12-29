export interface SkillState {
  level: string;
  required: string;
}

export interface RoleState {
  [skillName: string]: {
    [levelKey: string]: SkillState;
  };
}

export interface CompetencyState {
  roleStates: Record<string, RoleState>;
  currentStates: Record<string, RoleState>;
  originalStates: Record<string, RoleState>;
  hasChanges: boolean;
  setSkillState: (skillName: string, level: string, levelKey: string, required: string, roleId: string) => void;
  setSkillProgression: (skillName: string, progression: Record<string, SkillState>, roleId: string) => void;
  resetLevels: (roleId: string) => void;
  saveChanges: (roleId: string) => void;
  cancelChanges: (roleId: string) => void;
  initializeState: (roleId: string) => void;
  getRoleState: (roleId: string) => RoleState;
}