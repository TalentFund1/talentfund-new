import { EmployeeSkillAchievement, EmployeeSkillState } from '../../types/employeeSkillTypes';

export const createSkillSelectors = (get: any) => {
  // Memoized skills getter
  const memoizedSkills: Record<string, EmployeeSkillAchievement[]> = {};

  return {
    getEmployeeSkills: (employeeId: string): EmployeeSkillAchievement[] => {
      // Check memoized value first
      if (memoizedSkills[employeeId]) {
        console.log('Using memoized skills for employee:', employeeId);
        return memoizedSkills[employeeId];
      }

      console.log('Getting fresh skills for employee:', employeeId);
      const skills = get().employeeSkills[employeeId]?.skills || [];
      
      // Memoize the result
      memoizedSkills[employeeId] = skills;
      
      return skills;
    },

    getSkillState: (employeeId: string, skillTitle: string): EmployeeSkillState => {
      const state = get().employeeSkills[employeeId]?.states[skillTitle];
      
      if (!state) {
        console.log('No existing skill state found:', {
          employeeId,
          skillTitle,
          usingDefault: true
        });
        
        return {
          level: 'unspecified',
          goalStatus: 'unknown',
          lastUpdated: new Date().toISOString()
        };
      }

      return state;
    },

    // Add method to clear memoization if needed
    clearSkillsMemoization: (employeeId?: string) => {
      if (employeeId) {
        delete memoizedSkills[employeeId];
      } else {
        Object.keys(memoizedSkills).forEach(key => delete memoizedSkills[key]);
      }
    }
  };
};