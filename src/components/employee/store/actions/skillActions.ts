import { SkillLevel, SkillGoalStatus } from '../types/skillStoreTypes';
import { initializeEmployeeSkills as initializeSkills } from '../utils/skillInitializer';
import { EmployeeStore } from '../../../types/storeTypes';

export const createSkillActions = (set: any, get: any) => ({
  initializeEmployeeSkills: (employeeId: string, employeeStore?: EmployeeStore) => {
    console.log('Starting initialization check for employee:', employeeId);
    
    // First check - see if we already have skills
    const currentState = get();
    const existingSkills = currentState.employeeSkills[employeeId]?.skills;
    
    if (existingSkills?.length > 0) {
      console.log('Skills already exist for employee:', {
        employeeId,
        skillCount: existingSkills.length
      });
      return;
    }

    // Get employee from store state
    const employee = employeeStore?.getEmployeeById(employeeId);
    if (!employee) {
      console.warn('No employee found for initialization:', employeeId);
      return;
    }

    console.log('Proceeding with initialization for employee:', {
      employeeId,
      role: employee.role
    });

    // Initialize skills based on role
    const initialSkills = initializeSkills(employeeId, employee.role);

    set(state => {
      // Final safety check before setting state
      if (state.employeeSkills[employeeId]?.skills?.length > 0) {
        console.log('Skills were initialized by another process:', {
          employeeId,
          existingSkillCount: state.employeeSkills[employeeId].skills.length
        });
        return state;
      }

      const newState = {
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
      };

      console.log('Successfully initialized employee skills:', {
        employeeId,
        skillCount: initialSkills.length,
        timestamp: new Date().toISOString()
      });

      return newState;
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
