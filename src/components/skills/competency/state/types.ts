export interface SkillState {
  level: string;
  required: string;
  requirement: string;
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
  setSkillProgression: (skillName: string, progression: Record<string, SkillState>, roleId: string, track: string) => void;
  resetLevels: (roleId: string) => void;
  saveChanges: (roleId: string, track: string) => void;
  cancelChanges: (roleId: string) => void;
  initializeState: (roleId: string) => void;
  getRoleState: (roleId: string) => RoleState;
}