import { SkillLevel, SkillGoalStatus, EmployeeSkill, EmployeeSkillState } from '../../types/employeeSkillTypes';
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
        updatedSkills[skillIndex] = {
          ...updatedSkills[skillIndex],
          level,
          lastUpdated: new Date().toISOString()
        };
      } else {
        const skillData = getUnifiedSkillData(skillTitle);
        const newSkill: EmployeeSkill = {
          id: `${employeeId}-${skillTitle}`,
          employeeId,
          title: skillTitle,
          subcategory: skillData.subcategory,
          level,
          goalStatus: 'unknown',
          lastUpdated: new Date().toISOString(),
          category: skillData.category,
          weight: skillData.weight,
          businessCategory: skillData.businessCategory,
          growth: skillData.growth,
          salary: skillData.salary,
          confidence: skillData.confidence,
          benchmarks: skillData.benchmarks
        };
        updatedSkills.push(newSkill);
      }

      console.log('Updated employee skill:', { 
        employeeId, 
        skillTitle, 
        newLevel: level,
        skillsCount: updatedSkills.length 
      });

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
        updatedSkills[skillIndex] = {
          ...updatedSkills[skillIndex],
          goalStatus: status,
          lastUpdated: new Date().toISOString()
        };
      }

      console.log('Updated employee skill goal:', { 
        employeeId, 
        skillTitle, 
        newStatus: status,
        skillsCount: updatedSkills.length 
      });

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