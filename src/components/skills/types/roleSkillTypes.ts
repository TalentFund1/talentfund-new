import { 
  SkillLevel, 
  SkillGoalStatus, 
  SkillCategory, 
  SkillWeight,
  BaseSkill,
  SkillState,
  SkillBenchmark,
  SkillMetrics
} from './sharedSkillTypes';

export interface RoleSkillRequirement extends BaseSkill {
  minimumLevel: SkillLevel;
  requirementLevel: 'required' | 'preferred' | 'optional';
  benchmarks: SkillBenchmark;
  metrics: SkillMetrics;
}

export interface RoleSkillData {
  roleId: string;
  title: string;
  track: "Professional" | "Managerial";
  specialized: RoleSkillRequirement[];
  common: RoleSkillRequirement[];
  certifications: RoleSkillRequirement[];
}

export interface RoleSkillsStore {
  roleSkills: Record<string, RoleSkillData>;
  getRoleSkills: (roleId: string) => RoleSkillData | undefined;
  getSkillRequirement: (roleId: string, skillTitle: string) => RoleSkillRequirement | undefined;
  initializeRoleSkills: (roleId: string) => void;
}

console.log('Role skill types updated to use shared interfaces');