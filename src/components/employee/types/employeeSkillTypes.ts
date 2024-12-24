export type SkillRequirement = 'required' | 'not-interested' | 'unknown' | 'skill_goal';

export interface EmployeeSkillState {
  level: string;
  requirement: SkillRequirement;
  lastUpdated: string;
}

export interface BaseEmployeeSkill {
  title: string;
  subcategory: string;
  level: string;
  growth: string;
  confidence: string;
  requirement?: SkillRequirement;
  category?: string;
  weight?: string;
}

export interface EmployeeSkill extends BaseEmployeeSkill {
  id: string;
  businessCategory: string;
  salary: string;
  benchmarks: {
    B: boolean;
    R: boolean;
    M: boolean;
    O: boolean;
  };
}

export interface EmployeeSkills {
  id: string;
  skills: {
    [skillTitle: string]: EmployeeSkillState;
  };
  lastUpdated: string;
}

export interface EmployeeSkillsData {
  skills: EmployeeSkill[];
  states: Record<string, EmployeeSkillState>;
}

export interface EmployeeSkillUpdate {
  employeeId: string;
  skillTitle: string;
  level: string;
  requirement: SkillRequirement;
}