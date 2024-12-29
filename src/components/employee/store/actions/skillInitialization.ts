import { EmployeeSkillData } from '../../types/employeeSkillTypes';
import { employees } from '../../EmployeeData';
import { getUnifiedSkillData } from '../../../skills/data/skillDatabaseService';

export const createInitializationActions = (set: any, get: any) => ({
  initializeEmployeeSkills: (employeeId: string) => {
    console.log('Initializing skills for employee:', employeeId);
    
    const employee = employees.find(emp => emp.id === employeeId);
    if (!employee) {
      console.warn('No employee found for initialization:', employeeId);
      return;
    }

    // Get current state from store
    const currentState = get().skillStates[employeeId];
    
    if (!currentState) {
      console.log('No existing state found, initializing from employee data:', {
        employeeId,
        skillCount: employee.skills.length,
        skills: employee.skills.map(s => s.title)
      });

      // Initialize each skill with default state
      const updates: Record<string, EmployeeSkillData> = {};
      
      employee.skills.forEach(skill => {
        const skillData = getUnifiedSkillData(skill.title);
        updates[skill.title] = {
          id: `${employeeId}-${skill.title}`,
          employeeId,
          skillId: `${employeeId}-${skill.title}`,
          title: skill.title,
          level: skill.level || 'unspecified',
          goalStatus: 'unknown',
          lastUpdated: new Date().toISOString(),
          skillScore: 0,
          subcategory: skillData.subcategory || 'General',
          category: skillData.category || 'specialized',
          businessCategory: skillData.businessCategory || 'Technical Skills',
          weight: skillData.weight || 'technical',
          growth: skillData.growth || '0%',
          salary: skillData.salary || 'market',
          minimumLevel: 'beginner',
          requirementLevel: 'required',
          metrics: {
            growth: skillData.growth || '0%',
            salary: skillData.salary || 'market',
            skillScore: 0
          },
          inDevelopmentPlan: false,
          benchmarks: {
            B: false,
            R: false,
            M: false,
            O: false
          }
        };
      });

      set(state => ({
        skillStates: {
          ...state.skillStates,
          [employeeId]: {
            skills: updates,
            lastUpdated: new Date().toISOString()
          }
        }
      }));

      console.log('Initialized employee skills:', {
        employeeId,
        skillCount: Object.keys(updates).length,
        skills: Object.keys(updates)
      });
    }
  }
});