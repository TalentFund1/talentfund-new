import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Employee } from "../../types/employeeTypes";
import { employees as defaultEmployees } from "../EmployeeData";
import { UnifiedSkill, EmployeeSkillState, EmployeeSkillRequirement } from '../../../types/skillTypes';
import { generateSkillId } from '../../skills/data/skillDatabaseService';

interface EmployeeSkillsState {
  [employeeId: string]: {
    skills: UnifiedSkill[];
    skillStates: {
      [skillId: string]: EmployeeSkillState;
    };
  };
}

interface EmployeeStore {
  employees: Employee[];
  employeeSkills: EmployeeSkillsState;
  addEmployee: (employee: Employee) => void;
  updateEmployee: (employee: Employee) => void;
  getEmployeeById: (id: string) => Employee | undefined;
  setEmployeeSkills: (employeeId: string, skills: UnifiedSkill[]) => void;
  getEmployeeSkills: (employeeId: string) => UnifiedSkill[];
  setSkillState: (
    employeeId: string, 
    skillId: string, 
    level: string, 
    requirement: EmployeeSkillRequirement
  ) => void;
  getSkillState: (employeeId: string, skillId: string) => EmployeeSkillState | undefined;
  initializeEmployeeSkills: (employeeId: string) => void;
}

export const useEmployeeStore = create<EmployeeStore>()(
  persist(
    (set, get) => ({
      employees: defaultEmployees,
      employeeSkills: {},

      initializeEmployeeSkills: (employeeId: string) => {
        console.log('Initializing skills for employee:', employeeId);
        set((state) => {
          if (!state.employeeSkills[employeeId]) {
            return {
              employeeSkills: {
                ...state.employeeSkills,
                [employeeId]: {
                  skills: [],
                  skillStates: {}
                }
              }
            };
          }
          return state;
        });
      },

      addEmployee: (employee: Employee) => {
        console.log('Adding new employee:', employee.id);
        set((state) => ({
          employees: [...state.employees, employee]
        }));
        get().initializeEmployeeSkills(employee.id);
      },

      updateEmployee: (employee: Employee) => {
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
            [employeeId]: {
              skills,
              skillStates: state.employeeSkills[employeeId]?.skillStates || {}
            }
          }
        }));

        // Initialize skill states for new skills
        skills.forEach(skill => {
          const skillId = generateSkillId(skill.title);
          if (!get().getSkillState(employeeId, skillId)) {
            get().setSkillState(
              employeeId,
              skillId,
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
        return state.employeeSkills[employeeId]?.skills || [];
      },

      setSkillState: (employeeId, skillId, level, requirement) => {
        console.log('Setting skill state:', {
          employeeId,
          skillId,
          level,
          requirement
        });

        set((state) => ({
          employeeSkills: {
            ...state.employeeSkills,
            [employeeId]: {
              ...state.employeeSkills[employeeId],
              skillStates: {
                ...state.employeeSkills[employeeId]?.skillStates,
                [skillId]: {
                  skillId,
                  level,
                  requirement
                }
              }
            }
          }
        }));
      },

      getSkillState: (employeeId, skillId) => {
        console.log('Getting skill state:', { employeeId, skillId });
        const state = get();
        return state.employeeSkills[employeeId]?.skillStates[skillId];
      }
    }),
    {
      name: 'employee-store',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        employees: state.employees,
        employeeSkills: state.employeeSkills
      })
    }
  )
);