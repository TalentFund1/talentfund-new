export interface BaseSkill {
  name: string;
}

export interface DetailedSkill extends BaseSkill {
  level: string;
  isSkillGoal: boolean;
}

export interface Certification extends BaseSkill {
  name: string;
  level: string;
  isSkillGoal: boolean;
}

export interface SkillProfileRow {
  id: string;
  name: string;
  function: string;
  skillCount: string;
  employees: string;
  matches: string;
  lastUpdated: string;
  occupation?: string;  // Added occupation as optional property
}

export interface EmployeeSkill {
  title: string;
  subcategory: string;
  level: string;
  growth: string;
  confidence: string;
  requirement?: 'required' | 'preferred' | 'skill_goal';
}

export interface RoleSkill {
  title: string;
  subcategory: string;
  level?: string;
  growth: string;
  confidence?: string;
  requirement?: string;
  salary?: string;
  benchmarks?: { [key: string]: boolean };
}

export interface ConsolidatedSkill {
  title: string;
  category: 'critical' | 'technical' | 'necessary';
  subcategory: string;
  type: 'specialized' | 'common' | 'certification';
  growth: string;
  level?: string;
  requirement?: string;
  salary?: string;
  benchmarks?: { [key: string]: boolean };
}
