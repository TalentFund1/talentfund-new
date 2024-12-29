import { EmployeeSkillData, EmployeeSkillAchievement } from "../../types/employeeSkillTypes";
import { getUnifiedSkillData } from "../../../skills/data/skillDatabaseService";

export const initializeEmployeeSkills = (employeeId: string, skills: any[]): EmployeeSkillAchievement[] => {
  return skills.map(skill => {
    const unifiedData = getUnifiedSkillData(skill.title);
    return {
      id: `${employeeId}-${skill.title}`,
      employeeId,
      skillId: `${employeeId}-${skill.title}`,
      title: skill.title,
      subcategory: unifiedData.subcategory || 'General',
      level: skill.level || 'unspecified',
      goalStatus: skill.goalStatus || 'unknown',
      lastUpdated: new Date().toISOString(),
      category: unifiedData.category || 'specialized',
      weight: unifiedData.weight || 'technical',
      businessCategory: unifiedData.businessCategory || 'Technical Skills',
      growth: unifiedData.growth || '0%',
      salary: unifiedData.salary || 'market',
      confidence: 'medium',
      skillScore: 0,
      inDevelopmentPlan: false,
      benchmarks: {
        B: false,
        R: false,
        M: false,
        O: false
      }
    };
  });
};