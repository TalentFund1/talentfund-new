import { EmployeeSkillData } from '../../types/employeeSkillTypes';
import { getUnifiedSkillData } from '../../../skills/data/skillDatabaseService';

export const createBaseSkillState = (
  employeeId: string,
  title: string
): Partial<EmployeeSkillData> => ({
  id: `${employeeId}-${title}`,
  employeeId,
  skillId: `${employeeId}-${title}`,
  title,
  level: 'unspecified',
  goalStatus: 'unknown',
  lastUpdated: new Date().toISOString(),
  confidence: 'medium',
  subcategory: 'General',
  category: 'specialized',
  businessCategory: 'Technical Skills',
  weight: 'technical',
  growth: '0%',
  salary: 'market',
  benchmarks: {
    B: false,
    R: false,
    M: false,
    O: false
  }
});

export const createSkillData = (
  employeeId: string,
  title: string,
  existingSkill: Partial<EmployeeSkillData>
): EmployeeSkillData => {
  const baseSkill = createBaseSkillState(employeeId, title);
  const unifiedData = getUnifiedSkillData(title);
  
  return {
    ...baseSkill,
    ...unifiedData,
    ...existingSkill
  } as EmployeeSkillData;
};