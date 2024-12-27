import { StateCreator } from 'zustand';
import { EmployeeSkillsStore } from '../types/storeTypes';
import { getUnifiedSkillData } from '../../../skills/data/skillDatabaseService';

export const createSkillActions = (set: any, get: any) => ({
  addSkill: (employeeId: string, skillTitle: string) => {
    console.log('Adding new skill:', { employeeId, skillTitle });
    
    set((state: EmployeeSkillsStore) => {
      const currentState = state.skillStates[employeeId] || {
        skills: {},
        lastUpdated: new Date().toISOString()
      };

      const unifiedData = getUnifiedSkillData(skillTitle);
      const newSkill = {
        id: `${employeeId}-${skillTitle}`,
        employeeId,
        skillId: `${employeeId}-${skillTitle}`,
        title: skillTitle,
        level: 'unspecified',
        goalStatus: 'unknown',
        lastUpdated: new Date().toISOString(),
        confidence: 'medium',
        subcategory: unifiedData.subcategory || 'General',
        category: unifiedData.category || 'specialized',
        businessCategory: unifiedData.businessCategory || 'Technical Skills',
        weight: unifiedData.weight || 'technical',
        growth: unifiedData.growth || '0%',
        salary: unifiedData.salary || 'market',
        benchmarks: {
          B: false,
          R: false,
          M: false,
          O: false
        }
      };

      // Create a new skills object with the added skill
      const updatedSkills = {
        ...currentState.skills,
        [skillTitle]: newSkill
      };

      console.log('Updated skills state:', {
        employeeId,
        skillTitle,
        totalSkills: Object.keys(updatedSkills).length
      });

      // Return new state with updated skills
      return {
        skillStates: {
          ...state.skillStates,
          [employeeId]: {
            ...currentState,
            skills: updatedSkills,
            lastUpdated: new Date().toISOString()
          }
        }
      };
    });
  }
});