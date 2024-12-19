export interface SkillState {
  level: string;
  requirement: string;
}

export interface EmployeeSkillState {
  [skillTitle: string]: SkillState;
}

export interface SkillsMatrixState {
  currentStates: Record<string, EmployeeSkillState>;
  originalStates: Record<string, EmployeeSkillState>;
  hasChanges: boolean;
  setSkillState: (employeeId: string, skillTitle: string, level: string, requirement: string) => void;
  saveChanges: (employeeId: string) => void;
  cancelChanges: (employeeId: string) => void;
  resetSkills: (employeeId: string) => void;
}

export const getSkillLevel = (state: SkillState | string): string => {
  if (typeof state === 'string') return state;
  return state.level || 'unspecified';
};

export const getSkillRequirement = (state: SkillState | string): string => {
  if (typeof state === 'string') return 'preferred';
  return state.requirement || 'preferred';
};