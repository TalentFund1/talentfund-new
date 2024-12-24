import { SkillLevel, SkillGoalStatus, EmployeeSkillAchievement } from '../../types/employeeSkillTypes';
import { getUnifiedSkillData } from '../../../skills/data/skillDatabaseService';

export const createSkillStateActions = (
  set: (fn: (state: any) => Partial<any>) => void,
  get: () => any
) => ({
  setSkillLevel: (employeeId: string, skillTitle: string, level: SkillLevel) => {
    console.log('Setting employee skill level:', { employeeId, skillTitle, level });
    set((state) => {
      const employeeData = state.employeeSkills[employeeId] || {
        employeeId,
        skills: [],
        states: {}
      };

      const updatedSkills = [...employeeData.skills];
      const skillIndex = updatedSkills.findIndex(s => s.title === skillTitle);

      if (skillIndex >= 0) {
        console.log('Updating existing skill:', skillTitle);
        updatedSkills[skillIndex] = {
          ...updatedSkills[skillIndex],
          level,
          lastUpdated: new Date().toISOString()
        };
      } else {
        console.log('Creating new skill:', skillTitle);
        const skillData = getUnifiedSkillData(skillTitle);
        const newSkill: EmployeeSkillAchievement = {
          id: `${employeeId}-${skillTitle}`,
          employeeId,
          title: skillTitle,
          subcategory: skillData.subcategory,
          level,
          goalStatus: 'unknown',
          lastUpdated: new Date().toISOString(),
          weight: skillData.weight,
          confidence: 'medium',
          category: skillData.category,
          businessCategory: skillData.businessCategory,
          growth: skillData.growth,
          salary: skillData.salary,
          benchmarks: skillData.benchmarks
        };
        updatedSkills.push(newSkill);
      }

      console.log('Updated skills array:', updatedSkills);

      return {
        employeeSkills: {
          ...state.employeeSkills,
          [employeeId]: {
            ...employeeData,
            skills: updatedSkills,
            states: {
              ...employeeData.states,
              [skillTitle]: {
                level,
                requirement: employeeData.states[skillTitle]?.requirement || 'unknown',
                lastUpdated: new Date().toISOString()
              }
            }
          }
        }
      };
    });
  },

  setSkillGoalStatus: (employeeId: string, skillTitle: string, status: SkillGoalStatus) => {
    console.log('Setting employee skill goal status:', { employeeId, skillTitle, status });
    set((state) => {
      const employeeData = state.employeeSkills[employeeId] || {
        employeeId,
        skills: [],
        states: {}
      };

      const updatedSkills = [...employeeData.skills];
      const skillIndex = updatedSkills.findIndex(s => s.title === skillTitle);

      if (skillIndex >= 0) {
        console.log('Updating existing skill goal status:', skillTitle);
        const existingSkill = updatedSkills[skillIndex];
        updatedSkills[skillIndex] = {
          ...existingSkill,
          goalStatus: status,
          lastUpdated: new Date().toISOString()
        };
      } else {
        console.log('Creating new skill with goal status:', skillTitle);
        const skillData = getUnifiedSkillData(skillTitle);
        const newSkill: EmployeeSkillAchievement = {
          id: `${employeeId}-${skillTitle}`,
          employeeId,
          title: skillTitle,
          subcategory: skillData.subcategory,
          level: 'unspecified',
          goalStatus: status,
          lastUpdated: new Date().toISOString(),
          weight: skillData.weight,
          confidence: 'medium',
          category: skillData.category,
          businessCategory: skillData.businessCategory,
          growth: skillData.growth,
          salary: skillData.salary,
          benchmarks: skillData.benchmarks
        };
        updatedSkills.push(newSkill);
      }

      console.log('Updated skills array with new goal status:', updatedSkills);

      return {
        employeeSkills: {
          ...state.employeeSkills,
          [employeeId]: {
            ...employeeData,
            skills: updatedSkills,
            states: {
              ...employeeData.states,
              [skillTitle]: {
                level: employeeData.states[skillTitle]?.level || 'unspecified',
                requirement: status,
                lastUpdated: new Date().toISOString()
              }
            }
          }
        }
      };
    });
  }
});