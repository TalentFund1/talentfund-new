export interface SkillState {
  level: string;
  required: string;
}

export interface LevelState {
  [levelKey: string]: SkillState;
}

export interface RoleState {
  [skillName: string]: LevelState;
}

export interface EmployeeState {
  [employeeId: string]: RoleState;
}

export interface CompetencyState {
  roleStates: Record<string, EmployeeState>;
  currentStates: Record<string, EmployeeState>;
  originalStates: Record<string, EmployeeState>;
  hasChanges: boolean;
  setSkillState: (
    skillName: string,
    level: string,
    levelKey: string,
    required: string,
    roleId: string,
    employeeId: string
  ) => void;
  setSkillProgression: (
    skillName: string,
    progression: Record<string, SkillState>,
    roleId: string,
    employeeId: string
  ) => void;
  resetLevels: (roleId: string, employeeId: string) => void;
  saveChanges: (roleId: string, employeeId: string) => void;
  cancelChanges: (roleId: string, employeeId: string) => void;
  initializeState: (roleId: string, employeeId: string) => void;
  getRoleState: (roleId: string, employeeId: string) => RoleState;
}