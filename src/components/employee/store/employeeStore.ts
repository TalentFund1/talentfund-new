import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Employee } from "../../types/employeeTypes";
import { employees as defaultEmployees } from "../EmployeeData";
import { UnifiedSkill, EmployeeSkillState, EmployeeSkillRequirement } from '../../../types/skillTypes';
import { skillDefinitions } from '../../skills/data/skills/skillDefinitions';
import { getSkillCategory } from '../../skills/data/skills/categories/skillCategories';

interface EmployeeStore {
  employees: Employee[];
  employeeSkills: Record<string, UnifiedSkill[]>;
  skillStates: Record<string, Record<string, EmployeeSkillState>>;
  addEmployee: (employee: Employee) => void;
  updateEmployee: (employee: Employee) => void;
  getEmployeeById: (id: string) => Employee | undefined;
  setEmployeeSkills: (employeeId: string, skills: UnifiedSkill[]) => void;
  getEmployeeSkills: (employeeId: string) => UnifiedSkill[];
  setSkillState: (employeeId: string, skillId: string, skillName: string, level: string, requirement: EmployeeSkillRequirement) => void;
  getSkillState: (employeeId: string, skillName: string) => EmployeeSkillState | undefined;
  initializeEmployeeSkills: (employeeId: string) => void;
}

export const useEmployeeStore = create<EmployeeStore>()(
  persist(
    (set, get) => ({
      employees: defaultEmployees,
      employeeSkills: {},
      skillStates: {},

      initializeEmployeeSkills: (employeeId: string) => {
        console.log('Initializing skills for employee:', employeeId);
        const store = get();
        
        // Initialize with all skills from universal database with default states
        if (!store.employeeSkills[employeeId]) {
          const defaultSkills = skillDefinitions.map(skill => ({
            ...skill,
            level: 'unspecified',
            requirement: 'unknown' as EmployeeSkillRequirement
          }));

          console.log('Setting default skills for employee:', {
            employeeId,
            skillCount: defaultSkills.length
          });

          set((state) => ({
            employeeSkills: {
              ...state.employeeSkills,
              [employeeId]: defaultSkills
            }
          }));
        }

        // Initialize skill states if not present
        if (!store.skillStates[employeeId]) {
          const initialStates: Record<string, EmployeeSkillState> = {};
          skillDefinitions.forEach(skill => {
            initialStates[skill.title] = {
              employeeId,
              skillId: skill.title,
              level: 'unspecified',
              requirement: 'unknown'
            };
          });

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

      setEmployeeSkills: (employeeId, skills) => {
        console.log('Setting skills for employee:', employeeId, skills);
        set((state) => ({
          employeeSkills: {
            ...state.employeeSkills,
            [employeeId]: skills
          }
        }));

        // Initialize skill states for new skills
        const store = get();
        if (!store.skillStates[employeeId]) {
          store.skillStates[employeeId] = {};
        }

        skills.forEach(skill => {
          if (!store.skillStates[employeeId][skill.title]) {
            store.setSkillState(
              employeeId,
              skill.title,
              skill.title,
              'unspecified',
              'unknown'
            );
          }
        });
      },

      getEmployeeSkills: (employeeId) => {
        console.log('Getting skills for employee:', employeeId);
        const state = get();
        if (!state.employeeSkills[employeeId]) {
          state.initializeEmployeeSkills(employeeId);
        }
        return state.employeeSkills[employeeId] || [];
      },

      setSkillState: (employeeId, skillId, skillName, level, requirement) => {
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

      getSkillState: (employeeId, skillName) => {
        console.log('Getting skill state:', { employeeId, skillName });
        const state = get();
        return state.skillStates[employeeId]?.[skillName];
      }
    }),
    {
      name: 'employee-store',
      storage: createJSONStorage(() => localStorage),
      version: 5,
      partialize: (state) => ({
        employees: state.employees,
        employeeSkills: state.employeeSkills,
        skillStates: state.skillStates
      })
    }
  )
);