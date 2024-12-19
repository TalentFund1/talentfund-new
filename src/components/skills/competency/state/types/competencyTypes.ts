export interface SkillState {
  level: string;
  required: string;
}

export interface RoleState {
  [skillName: string]: SkillState;
}

export interface EmployeeRoleState {
  [employeeId: string]: RoleState;
}

export interface CompetencyState {
  roleStates: Record<string, EmployeeRoleState>;
  currentStates: Record<string, EmployeeRoleState>;
  originalStates: Record<string, EmployeeRoleState>;
  hasChanges: boolean;
}

export interface CompetencyActions {
  setSkillState: (
    skillName: string,
    level: string,
    required: string,
    roleId: string,
    employeeId: string
  ) => void;
  resetLevels: (roleId: string, employeeId: string) => void;
  saveChanges: (roleId: string, employeeId: string) => void;
  cancelChanges: (roleId: string, employeeId: string) => void;
  initializeState: (roleId: string, employeeId: string) => void;
  getRoleState: (roleId: string, employeeId: string) => RoleState;
}

export type CompetencyStore = CompetencyState & CompetencyActions;