import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Employee } from "../../types/employeeTypes";
import { employees as defaultEmployees } from "../EmployeeData";
import { UnifiedSkill, EmployeeSkillState } from '../../../types/skillTypes';
import { getUnifiedSkillData } from '../../skills/data/skillDatabaseService';

// Initial skills for AI Engineer (Employee 123)
const initialSkills: UnifiedSkill[] = [
  "Machine Learning",
  "Deep Learning", 
  "Natural Language Processing",
  "Computer Vision",
  "TensorFlow",
  "Python",
  "Problem Solving",
  "AWS Certified Machine Learning - Specialty"
].map(skillTitle => {
  const skillData = getUnifiedSkillData(skillTitle);
  console.log('Initializing skill:', { skillTitle, skillData });
  
  if (!skillData) {
    console.warn('Skill data not found:', skillTitle);
    return {
      id: `skill_${skillTitle.toLowerCase().replace(/\s+/g, '_')}`,
      title: skillTitle,
      subcategory: 'General',
      category: 'common',
      businessCategory: 'Information Technology',
      weight: 'necessary',
      level: 'intermediate',
      growth: '0%',
      salary: 'N/A',
      confidence: 'medium',
      requirement: 'skill_goal' as const
    };
  }

  return {
    ...skillData,
    id: skillData.id || `skill_${skillTitle.toLowerCase().replace(/\s+/g, '_')}`,
    title: skillTitle,
    level: 'intermediate',
    requirement: 'skill_goal' as const
  };
});

interface EmployeeStore {
  employees: Employee[];
  employeeSkills: Record<string, UnifiedSkill[]>;
  skillStates: Record<string, Record<string, EmployeeSkillState>>;
  addEmployee: (employee: Employee) => void;
  updateEmployee: (employee: Employee) => void;
  getEmployeeById: (id: string) => Employee | undefined;
  setEmployeeSkills: (employeeId: string, skills: UnifiedSkill[]) => void;
  getEmployeeSkills: (employeeId: string) => UnifiedSkill[];
  setSkillState: (employeeId: string, skillId: string, skillName: string, level: string, requirement: 'skill_goal' | 'not_interested' | 'unknown') => void;
  getSkillState: (employeeId: string, skillName: string) => EmployeeSkillState | undefined;
  initializeEmployeeSkills: (employeeId: string) => void;
}

export const useEmployeeStore = create<EmployeeStore>()(
  persist(
    (set, get) => ({
      employees: defaultEmployees,
      employeeSkills: {
        "123": initialSkills
      },
      skillStates: {},

      initializeEmployeeSkills: (employeeId: string) => {
        console.log('Initializing skills for employee:', employeeId);
        const store = get();
        
        // Only initialize if no skills exist
        if (!store.employeeSkills[employeeId]) {
          const newSkills = employeeId === "123" ? initialSkills : [];
          console.log('Setting initial skills:', { employeeId, skillCount: newSkills.length });
          
          set((state) => ({
            employeeSkills: {
              ...state.employeeSkills,
              [employeeId]: newSkills
            }
          }));
        }

        // Initialize skill states if they don't exist
        if (!store.skillStates[employeeId]) {
          const initialStates: Record<string, EmployeeSkillState> = {};
          
          // Initialize states for employee 123's skills
          if (employeeId === "123") {
            initialSkills.forEach(skill => {
              initialStates[skill.title] = {
                employeeId: "123",
                skillId: skill.id,
                level: 'intermediate',
                requirement: 'skill_goal'
              };
            });
          }

          set((state) => ({
            skillStates: {
              ...state.skillStates,
              [employeeId]: initialStates
            }
          }));
        }
      },

      addEmployee: (employee) => {
        console.log('Adding new employee:', employee.id);
        set((state) => ({
          employees: [...state.employees, employee]
        }));
        get().initializeEmployeeSkills(employee.id);
      },

      updateEmployee: (employee) => {
        console.log('Updating employee:', employee.id);
        set((state) => ({
          employees: state.employees.map((emp) => 
            emp.id === employee.id ? { ...employee } : emp
          )
        }));
      },

      getEmployeeById: (id) => {
        return get().employees.find(emp => emp.id === id);
      },

      setEmployeeSkills: (employeeId: string, skills: UnifiedSkill[]) => {
        console.log('Setting skills for employee:', { employeeId, skills });
        set((state) => ({
          employeeSkills: {
            ...state.employeeSkills,
            [employeeId]: skills
          }
        }));
      },

      getEmployeeSkills: (employeeId: string) => {
        console.log('Getting skills for employee:', employeeId);
        const store = get();
        
        // Initialize if no skills exist
        if (!store.employeeSkills[employeeId]) {
          console.log('No skills found, initializing employee skills');
          store.initializeEmployeeSkills(employeeId);
        }
        
        const skills = store.employeeSkills[employeeId] || [];
        console.log('Retrieved skills:', skills);
        return skills;
      },

      setSkillState: (employeeId: string, skillId: string, skillName: string, level: string, requirement: 'skill_goal' | 'not_interested' | 'unknown') => {
        console.log('Setting skill state:', {
          employeeId,
          skillId,
          skillName,
          level,
          requirement
        });

        set((state) => ({
          skillStates: {
            ...state.skillStates,
            [employeeId]: {
              ...state.skillStates[employeeId],
              [skillName]: {
                employeeId,
                skillId,
                level,
                requirement
              }
            }
          }
        }));
      },

      getSkillState: (employeeId: string, skillName: string) => {
        console.log('Getting skill state:', { employeeId, skillName });
        const state = get();
        return state.skillStates[employeeId]?.[skillName];
      }
    }),
    {
      name: 'employee-store',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        employees: state.employees,
        employeeSkills: state.employeeSkills,
        skillStates: state.skillStates
      })
    }
  )
);