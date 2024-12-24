export type SkillLevel = 'beginner' | 'intermediate' | 'advanced' | 'unspecified';
export type SkillGoalStatus = 'skill_goal' | 'not_interested' | 'unknown';

export interface EmployeeSkill {
  id: string;
  title: string;
  level: SkillLevel;
  goalStatus: SkillGoalStatus;
  lastUpdated: string;
}

export interface EmployeeSkillsData {
  employeeId: string;
  skills: EmployeeSkill[];
}