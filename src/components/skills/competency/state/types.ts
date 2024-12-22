export type RoleSkillRequirement = 'required' | 'preferred';
export type EmployeeSkillRequirement = 'skill_goal' | 'not_interested' | 'unknown';

export interface RoleSkillState {
  level: string;
  requirement: RoleSkillRequirement;
}

export interface RoleState {
  [skillName: string]: {
    [levelKey: string]: RoleSkillState;
  };
}

export interface CompetencyState {
  roleStates: Record<string, RoleState>;
  currentStates: Record<string, RoleState>;
  originalStates: Record<string, RoleState>;
  hasChanges: boolean;
  setSkillState: (
    skillName: string, 
    level: string, 
    levelKey: string, 
    requirement: RoleSkillRequirement, 
    roleId: string
  ) => void;
  setSkillProgression: (
    skillName: string, 
    progression: Record<string, RoleSkillState>, 
    roleId: string, 
    track: string
  ) => void;
  resetLevels: (roleId: string) => void;
  saveChanges: (roleId: string, track: string) => void;
  cancelChanges: (roleId: string) => void;
  initializeState: (roleId: string) => void;
  getRoleState: (roleId: string) => RoleState;
}