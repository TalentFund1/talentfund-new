import { SkillWeight } from './SkillTypes';

export type SkillCategory = 'specialized' | 'common' | 'certification';
export type SkillRequirementLevel = 'required' | 'preferred' | 'optional';

// Role-specific skill requirement
export interface RoleSkillRequirement {
  id: string;
  title: string;
  category: SkillCategory;
  subcategory: string;
  minimumLevel: 'beginner' | 'intermediate' | 'advanced';
  requirementLevel: SkillRequirementLevel;
  weight: SkillWeight;
  businessCategory: string;
  growth: string;
  salary: string;
  confidence: 'low' | 'medium' | 'high';
  benchmarks: {
    B: boolean;
    R: boolean;
    M: boolean;
    O: boolean;
  };
}

// Role skill data structure
export interface RoleSkillData {
  roleId: string;
  title: string;
  track: "Professional" | "Managerial";
  specialized: RoleSkillRequirement[];
  common: RoleSkillRequirement[];
  certifications: RoleSkillRequirement[];
}

// Store interface
export interface RoleSkillsStore {
  roleSkills: Record<string, RoleSkillData>;
  getRoleSkills: (roleId: string) => RoleSkillData | undefined;
  getSkillRequirement: (roleId: string, skillTitle: string) => RoleSkillRequirement | undefined;
  initializeRoleSkills: (roleId: string) => void;
}