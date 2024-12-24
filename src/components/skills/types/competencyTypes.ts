import { SkillLevel, SkillGoalStatus, SkillCategory, SkillRequirementLevel } from './sharedSkillTypes';

// Mapping between employee skills and role requirements
export interface SkillCompetencyMapping {
  skillTitle: string;
  category: SkillCategory;
  employeeLevel: SkillLevel;
  requiredLevel: SkillLevel;
  goalStatus: SkillGoalStatus;
  requirementLevel: SkillRequirementLevel;
  gap: number; // Numerical representation of skill gap
  lastUpdated: string;
}

// Store interface for competency tracking
export interface CompetencyStore {
  competencyMappings: Record<string, Record<string, SkillCompetencyMapping>>;  // employeeId -> skillTitle -> mapping
  calculateCompetencyGap: (employeeId: string, roleId: string, skillTitle: string) => number;
  updateCompetencyMapping: (employeeId: string, roleId: string, mapping: SkillCompetencyMapping) => void;
  getCompetencyMapping: (employeeId: string, roleId: string, skillTitle: string) => SkillCompetencyMapping | undefined;
}