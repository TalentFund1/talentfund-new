export type SkillCategory = 'specialized' | 'common' | 'certification';
export type SkillWeight = 'critical' | 'technical' | 'necessary';

// Employee-specific types
export type EmployeeSkillRequirement = 'skill_goal' | 'not_interested' | 'unknown';

export interface EmployeeSkillState {
  level: string;
  requirement: EmployeeSkillRequirement;
}

export interface EmployeeState {
  [skillName: string]: EmployeeSkillState;
}

// Role-specific types
export type RoleSkillRequirement = 'required' | 'preferred';

export interface RoleSkillState {
  level: string;
  requirement: RoleSkillRequirement;
}

export interface RoleState {
  [skillName: string]: {
    [levelKey: string]: RoleSkillState;
  };
}

// Shared skill types
export interface UnifiedSkill {
  id: string;
  title: string;
  subcategory: string;
  category: SkillCategory;
  businessCategory: string;
  weight: SkillWeight;
  level: string;
  growth: string;
  salary: string;
  confidence: string;
  requirement?: RoleSkillRequirement;
  benchmarks: { [key: string]: boolean };
}

export interface RoleSkillData {
  title: string;
  roleTrack: "Professional" | "Managerial";
  specialized: UnifiedSkill[];
  common: UnifiedSkill[];
  certifications: UnifiedSkill[];
  skills: UnifiedSkill[];
  soc?: string;
  function?: string;
  mappedTitle?: string;
  occupation?: string;
  description?: string;
}

// Component-specific types
export interface DetailedSkill {
  name: string;
  level: string;
  isSkillGoal: boolean;
}

export interface EmployeeSkill {
  title: string;
  subcategory: string;
  level: string;
  growth: string;
  confidence: string;
  requirement?: EmployeeSkillRequirement;
}

export interface RoleSkill {
  title: string;
  subcategory: string;
  level?: string;
  growth: string;
  confidence?: string;
  requirement?: RoleSkillRequirement;
  salary?: string;
  benchmarks?: { [key: string]: boolean };
}

// Helper functions to convert between requirement types
export const convertToEmployeeRequirement = (roleReq: RoleSkillRequirement): EmployeeSkillRequirement => {
  switch (roleReq) {
    case 'required':
      return 'skill_goal';
    case 'preferred':
      return 'unknown';
    default:
      return 'unknown';
  }
};

export const convertToRoleRequirement = (empReq: EmployeeSkillRequirement): RoleSkillRequirement => {
  switch (empReq) {
    case 'skill_goal':
      return 'required';
    case 'not_interested':
    case 'unknown':
    default:
      return 'preferred';
  }
};

export interface SkillsMatrixFiltersProps {
  selectedLevel: string;
  setSelectedLevel: (level: string) => void;
  selectedInterest: string;
  setSelectedInterest: (interest: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  isRoleBenchmark?: boolean;
  selectedRoleRequirement?: string;
  setSelectedRoleRequirement?: (requirement: string) => void;
}