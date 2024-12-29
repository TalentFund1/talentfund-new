import { EmployeeSkillData, SkillLevel } from "../../types/employeeSkillTypes";
import { getUnifiedSkillData } from "../../../skills/data/skillDatabaseService";

export const initializeSkill = (employeeId: string, skillTitle: string): EmployeeSkillData => {
  const unifiedData = getUnifiedSkillData(skillTitle);
  
  return {
    id: `${employeeId}-${skillTitle}`,
    employeeId,
    skillId: `${employeeId}-${skillTitle}`,
    title: skillTitle,
    level: 'unspecified' as SkillLevel,
    goalStatus: 'unknown',
    lastUpdated: new Date().toISOString(),
    confidence: 'medium',
    subcategory: unifiedData.subcategory || 'General',
    category: unifiedData.category || 'specialized',
    businessCategory: unifiedData.businessCategory || 'Technical Skills',
    weight: unifiedData.weight || 'technical',
    growth: unifiedData.growth || '0%',
    salary: unifiedData.salary || 'market',
    skillScore: 0,
    inDevelopmentPlan: false,
    benchmarks: {
      B: false,
      R: false,
      M: false,
      O: false
    }
  };
};