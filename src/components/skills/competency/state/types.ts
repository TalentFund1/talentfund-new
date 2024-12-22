export interface SkillState {
  level: string;
  required: string;
}

export interface LevelState {
  [levelKey: string]: SkillState;
}

export interface EmployeeSkillState {
  [skillName: string]: LevelState;
}

export interface RoleState {
  [employeeId: string]: EmployeeSkillState;
}

export interface CompetencyState {
  roleStates: Record<string, RoleState>;
  currentStates: Record<string, RoleState>;
  originalStates: Record<string, RoleState>;
  hasChanges: boolean;
  setSkillState: (skillName: string, level: string, levelKey: string, required: string, roleId: string, employeeId: string) => void;
  setSkillProgression: (skillName: string, progression: Record<string, SkillState>, roleId: string, employeeId: string) => void;
  resetLevels: (roleId: string, employeeId: string) => void;
  saveChanges: (roleId: string) => void;
  cancelChanges: (roleId: string) => void;
  initializeState: (roleId: string, employeeId: string) => void;
  getRoleState: (roleId: string, employeeId: string) => EmployeeSkillState;
}