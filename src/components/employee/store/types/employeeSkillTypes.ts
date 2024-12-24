export type SkillLevel = 'beginner' | 'intermediate' | 'advanced' | 'unspecified';
export type SkillGoalStatus = 'required' | 'preferred' | 'not-interested' | 'unknown' | 'skill_goal';

export interface EmployeeSkillState {
  level: SkillLevel;
  requirement: SkillGoalStatus;
  lastUpdated: string;
}

export interface EmployeeSkill {
  id: string;
  employeeId: string;
  title: string;
  level: SkillLevel;
  goalStatus: SkillGoalStatus;
  lastUpdated: string;
}

export interface EmployeeSkillsData {
  employeeId: string;
  skills: EmployeeSkill[];
  states: Record<string, EmployeeSkillState>;
}

export interface EmployeeSkillsStore {
  employeeSkills: Record<string, EmployeeSkillsData>;
  initializeEmployeeSkills: (employeeId: string) => void;
  setSkillLevel: (employeeId: string, skillTitle: string, level: SkillLevel) => void;
  setSkillGoalStatus: (employeeId: string, skillTitle: string, status: SkillGoalStatus) => void;
  getEmployeeSkills: (employeeId: string) => EmployeeSkill[];
  getSkillState: (employeeId: string, skillTitle: string) => EmployeeSkillState;
}