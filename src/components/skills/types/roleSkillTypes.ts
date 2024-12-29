import { SkillLevel, SkillGoalStatus } from '../../employee/types/employeeSkillTypes';
import { UnifiedSkill } from './SkillTypes';

export interface RoleSkillRequirement extends UnifiedSkill {
  minimumLevel: SkillLevel;
  requirementLevel: 'required' | 'preferred' | 'optional';
  metrics: {
    growth: string;
    salary: string;
    confidence: 'low' | 'medium' | 'high';
    skillScore: number;
  };
}

export interface RoleSkillData {
  roleId: string;
  title: string;
  soc?: string;
  function?: string;
  mappedTitle?: string;
  occupation?: string;
  description?: string;
  roleTrack?: "Professional" | "Managerial";
  track: "Professional" | "Managerial";
  specialized: RoleSkillRequirement[];
  common: RoleSkillRequirement[];
  certifications: RoleSkillRequirement[];
  skills: RoleSkillRequirement[];
}