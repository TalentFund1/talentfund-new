import { 
  SkillCategory, 
  SkillWeight,
  SkillBenchmark,
  SkillMetrics,
  BaseSkill
} from './sharedSkillTypes';

// Role-specific skill requirement level
export type SkillRequirementLevel = 'required' | 'preferred' | 'optional';

// Role skill requirement definition
export interface RoleSkillRequirement extends BaseSkill {
  minimumLevel: 'beginner' | 'intermediate' | 'advanced';
  requirementLevel: SkillRequirementLevel;
  benchmarks: SkillBenchmark;
  metrics: SkillMetrics;
}

// Complete role skill data structure
export interface RoleSkillData {
  roleId: string;
  title: string;
  track: "Professional" | "Managerial";
  specialized: RoleSkillRequirement[];
  common: RoleSkillRequirement[];
  certifications: RoleSkillRequirement[];
}

// Role skills store interface
export interface RoleSkillsStore {
  roleSkills: Record<string, RoleSkillData>;
  getRoleSkills: (roleId: string) => RoleSkillData | undefined;
  getSkillRequirement: (roleId: string, skillTitle: string) => RoleSkillRequirement | undefined;
  initializeRoleSkills: (roleId: string) => void;
}

// Shared types between roles and skills
export interface SkillComparison {
  skillTitle: string;
  employeeLevel: string;
  requiredLevel: string;
  matchPercentage: number;
  gapLevel: number;
}

console.log('Role skill types updated with clear separation from employee skills');