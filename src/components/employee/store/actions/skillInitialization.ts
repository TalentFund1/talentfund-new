import { EmployeeSkillData } from '../../types/employeeSkillTypes';
import { employees } from '../../EmployeeData';
import { getUnifiedSkillData } from '../../../skills/data/skillDatabaseService';
import { SkillLevel } from '../../types/employeeSkillTypes';

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
        const normalizedLevel = normalizeSkillLevel(skill.level);
        
        updates[skill.title] = {
          id: `${employeeId}-${skill.title}`,
          employeeId,
          skillId: `${employeeId}-${skill.title}`,
          title: skill.title,
          level: normalizedLevel,
          goalStatus: 'unknown',
          lastUpdated: new Date().toISOString(),
          confidence: 'medium',
          subcategory: skillData.subcategory || 'General',
          category: skillData.category || 'specialized',
          businessCategory: skillData.businessCategory || 'Technical Skills',
          weight: skillData.weight || 'technical',
          growth: skillData.growth || '0%',
          salary: skillData.salary || 'market',
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
    } else {
      console.log('Found existing skill state:', {
        employeeId,
        skillCount: Object.keys(currentState.skills).length,
        skills: Object.keys(currentState.skills)
      });
    }
  }
});

// Helper function to normalize skill levels
const normalizeSkillLevel = (level: string): SkillLevel => {
  switch (level?.toLowerCase()) {
    case 'advanced':
      return 'advanced';
    case 'intermediate':
      return 'intermediate';
    case 'beginner':
      return 'beginner';
    default:
      return 'unspecified';
  }
};