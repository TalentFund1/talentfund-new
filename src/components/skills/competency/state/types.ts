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

export interface EmployeeSkillState {
  level: string;
  required: string;
}

export interface CompetencyState {
  roleStates: Record<string, RoleState>;
  currentStates: Record<string, RoleState>;
  originalStates: Record<string, RoleState>;
  employeeStates: Record<string, Record<string, EmployeeSkillState>>;
  hasChanges: boolean;
  setSkillState: (skillName: string, level: string, levelKey: string, required: string, roleId: string, employeeId?: string) => void;
  setSkillProgression: (skillName: string, progression: Record<string, SkillState>, roleId: string) => void;
  resetLevels: (roleId: string) => void;
  saveChanges: (roleId: string) => void;
  cancelChanges: (roleId: string) => void;
  initializeState: (roleId: string) => void;
  getRoleState: (roleId: string) => RoleState;
  getEmployeeSkillState: (employeeId: string, skillName: string) => EmployeeSkillState | null;
  initializeEmployeeState: (employeeId: string, skills: any[]) => void;
}