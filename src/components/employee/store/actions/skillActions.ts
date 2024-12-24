import { SkillLevel, SkillGoalStatus } from '../types/skillStoreTypes';
import { initializeSkillsForEmployee } from '../utils/skillInitializer';

export const createSkillActions = (set: any, get: any) => ({
  initializeEmployeeSkills: (employeeId: string) => {
    console.log('Initializing skills store for employee:', employeeId);
    
    // Check if already initialized with skills
    const currentSkills = get().employeeSkills[employeeId];
    if (currentSkills?.skills?.length > 0) {
      console.log('Skills already initialized for employee:', employeeId);
      return;
    }

    // Initialize skills based on role
    const initialSkills = initializeSkillsForEmployee(employeeId);

    set(state => ({
      employeeSkills: {
        ...state.employeeSkills,
        [employeeId]: {
          employeeId,
          skills: initialSkills,
          states: initialSkills.reduce((acc, skill) => ({
            ...acc,
            [skill.title]: {
              level: 'unspecified',
              requirement: 'unknown',
              lastUpdated: new Date().toISOString()
            }
          }), {})
        }
      }
    }));

    console.log('Successfully initialized employee skills:', {
      employeeId,
      skillCount: initialSkills.length
    });
  },

  setSkillLevel: (employeeId: string, skillTitle: string, level: SkillLevel) => {
    console.log('Setting skill level:', { employeeId, skillTitle, level });
    
    set(state => {
      const employeeData = state.employeeSkills[employeeId];
      if (!employeeData) {
        console.warn('No employee data found for skill level update:', employeeId);
        return state;
      }

      return {
        employeeSkills: {
          ...state.employeeSkills,
          [employeeId]: {
            ...employeeData,
            skills: employeeData.skills.map(skill => 
              skill.title === skillTitle 
                ? { ...skill, level, lastUpdated: new Date().toISOString() }
                : skill
            ),
            states: {
              ...employeeData.states,
              [skillTitle]: {
                ...employeeData.states[skillTitle],
                level,
                lastUpdated: new Date().toISOString()
              }
            }
          }
        }
      };
    });
  },

  setSkillGoalStatus: (employeeId: string, skillTitle: string, status: SkillGoalStatus) => {
    console.log('Setting skill goal status:', { employeeId, skillTitle, status });
    
    set(state => {
      const employeeData = state.employeeSkills[employeeId];
      if (!employeeData) {
        console.warn('No employee data found for goal status update:', employeeId);
        return state;
      }

      return {
        employeeSkills: {
          ...state.employeeSkills,
          [employeeId]: {
            ...employeeData,
            skills: employeeData.skills.map(skill => 
              skill.title === skillTitle 
                ? { ...skill, goalStatus: status, lastUpdated: new Date().toISOString() }
                : skill
            ),
            states: {
              ...employeeData.states,
              [skillTitle]: {
                ...employeeData.states[skillTitle],
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