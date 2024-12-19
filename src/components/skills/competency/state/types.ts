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
  roleCompetencies: Record<string, RoleCompetencies>;
  roleStates: Record<string, RoleState>;
  currentStates: Record<string, RoleState>;
  originalStates: Record<string, RoleState>;
  hasChanges: boolean;
  setCompetencyRequirement: (
    roleId: string,
    skillName: string,
    levelKey: string,
    level: string,
    required: string
  ) => void;
  getRoleCompetencies: (roleId: string) => RoleCompetencies;
  setSkillState: (
    skillName: string,
    level: string,
    levelKey: string,
    required: string,
    roleId: string
  ) => void;
  setSkillProgression: (
    skillName: string,
    progression: Record<string, SkillState>,
    roleId: string
  ) => void;
  resetLevels: (roleId: string) => void;
  saveChanges: (roleId: string) => void;
  cancelChanges: (roleId: string) => void;
  initializeState: (roleId: string) => void;
  getRoleState: (roleId: string) => RoleState;
}

export interface RoleCompetencies {
  [skillName: string]: {
    [levelKey: string]: CompetencyRequirement;
  };
}

export interface CompetencyRequirement {
  level: string;
  required: string;
}

export interface EmployeeSkillState {
  [skillTitle: string]: SkillState;
}

export type SkillRequirement = 'required' | 'preferred' | 'skill_goal' | 'not_interested' | 'unknown';

// Helper function to get level string safely
export const getSkillLevel = (state: SkillState | string): string => {
  if (typeof state === 'string') return state;
  return state.level || 'unspecified';
};

// Helper function to get requirement string safely
export const getSkillRequirement = (state: SkillState | SkillRequirement): string => {
  if (typeof state === 'string') return state;
  return state.required || 'preferred';
};