import { 
  BaseSkill, 
  SkillLevel,
  SkillRequirementLevel,
  SkillBenchmark,
  SkillMetrics 
} from './sharedSkillTypes';

// Role skill requirement definition
export interface RoleSkillRequirement extends BaseSkill {
  minimumLevel: SkillLevel;
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

// Skill comparison interfaces
export interface SkillComparison {
  skillTitle: string;
  employeeLevel: SkillLevel;
  requiredLevel: SkillLevel;
  matchPercentage: number;
  gapLevel: number;
}

console.log('Role skill types defined with clear separation from employee skills');