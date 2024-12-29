import { 
  SkillLevel, 
  SkillGoalStatus, 
  SkillCategory, 
  SkillRequirementLevel 
} from './sharedSkillTypes';

// Mapping between employee skills and role requirements
export interface SkillCompetencyMapping {
  skillTitle: string;
  category: SkillCategory;
  employeeLevel: SkillLevel;
  requiredLevel: SkillLevel;
  goalStatus: SkillGoalStatus;
  requirementLevel: SkillRequirementLevel;
  gap: number;
  lastUpdated: string;
}

// Store interface for competency tracking
export interface CompetencyStore {
  competencyMappings: Record<string, Record<string, SkillCompetencyMapping>>;
  calculateCompetencyGap: (employeeId: string, roleId: string, skillTitle: string) => number;
  updateCompetencyMapping: (employeeId: string, roleId: string, mapping: SkillCompetencyMapping) => void;
  getCompetencyMapping: (employeeId: string, roleId: string, skillTitle: string) => SkillCompetencyMapping | undefined;
}

console.log('Competency types updated with proper type imports');