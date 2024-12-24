export type SkillRequirement = 'required' | 'preferred' | 'not_interested' | 'unknown' | 'skill_goal';

export interface EmployeeSkillState {
  level: string;
  requirement: SkillRequirement;
  lastUpdated: string;
}

export interface EmployeeSkills {
  id: string;
  skills: {
    [skillTitle: string]: EmployeeSkillState;
  };
  lastUpdated: string;
}

export interface EmployeeSkillsData {
  skills: EmployeeSkills[];
  states: Record<string, EmployeeSkillState>;
}

export interface EmployeeSkill {
  title: string;
  subcategory: string;
  level: string;
  growth: string;
  confidence: string;
  requirement?: SkillRequirement;
}

export interface EmployeeSkillUpdate {
  employeeId: string;
  skillTitle: string;
  level: string;
  requirement: SkillRequirement;
}