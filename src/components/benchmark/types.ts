export interface SkillState {
  level: string;
  requirement: string;
}

export interface SkillsMatrixState {
  currentStates: Record<string, Record<string, SkillState>>;
  originalStates: Record<string, Record<string, SkillState>>;
  hasChanges: boolean;
  setSkillState: (skillTitle: string, level: string, requirement: string, employeeId: string) => void;
  saveChanges: () => void;
  cancelChanges: () => void;
  initializeState: (skillTitle: string, initialLevel: string, initialRequirement: string, employeeId: string) => void;
  cleanupState: (employeeId: string) => void;
  duplicateState: (sourceEmployeeId: string, targetEmployeeId: string) => void;
}