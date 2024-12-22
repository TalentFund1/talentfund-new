import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Employee } from "../../types/employeeTypes";
import { employees as defaultEmployees } from "../EmployeeData";
import { UnifiedSkill, SkillState, LevelState } from "../../skills/types/SkillTypes";

interface EmployeeSkillState {
  level: string;
  requirement: string;
}

interface CompetencyState {
  [skillName: string]: {
    [levelKey: string]: EmployeeSkillState;
  };
}

interface EmployeeStore {
  employees: Employee[];
  employeeSkills: Record<string, UnifiedSkill[]>;
  skillStates: Record<string, Record<string, EmployeeSkillState>>;
  competencyStates: Record<string, CompetencyState>;
  originalCompetencyStates: Record<string, CompetencyState>;
  hasCompetencyChanges: boolean;
  
  // Existing methods
  addEmployee: (employee: Employee) => void;
  updateEmployee: (employee: Employee) => void;
  getEmployeeById: (id: string) => Employee | undefined;
  setEmployeeSkills: (employeeId: string, skills: UnifiedSkill[]) => void;
  getEmployeeSkills: (employeeId: string) => UnifiedSkill[];
  setSkillState: (employeeId: string, skillName: string, level: string, requirement: string) => void;
  getSkillState: (employeeId: string, skillName: string) => EmployeeSkillState;
  initializeEmployeeSkills: (employeeId: string) => void;

  // New competency methods
  setCompetencyState: (
    employeeId: string,
    skillName: string,
    level: string,
    levelKey: string,
    required: string
  ) => void;
  getCompetencyState: (
    employeeId: string,
    skillName: string,
    levelKey: string
  ) => EmployeeSkillState;
  saveCompetencyChanges: (employeeId: string) => void;
  cancelCompetencyChanges: (employeeId: string) => void;
  resetCompetencyLevels: (employeeId: string) => void;
}

export const useEmployeeStore = create<EmployeeStore>()(
  persist(
    (set, get) => ({
      employees: defaultEmployees,
      employeeSkills: {},
      skillStates: {},
      competencyStates: {},
      originalCompetencyStates: {},
      hasCompetencyChanges: false,

      addEmployee: (employee) => {
        console.log('Adding employee to store:', employee);
        set((state) => {
          const newEmployees = [...state.employees, employee];
          console.log('Updated employees list:', newEmployees);
          return { employees: newEmployees };
        });
      },

      updateEmployee: (employee) => {
        console.log('Updating employee in store:', employee);
        set((state) => {
          const updatedEmployees = state.employees.map((emp) => 
            emp.id === employee.id ? { ...employee } : emp
          );
          console.log('Updated employees list:', updatedEmployees);
          return { 
            employees: updatedEmployees,
            skillStates: {
              ...state.skillStates,
              [employee.id]: state.skillStates[employee.id] || {}
            }
          };
        });
      },

      getEmployeeById: (id) => {
        const state = get();
        return state.employees.find(emp => emp.id === id);
      },

      setEmployeeSkills: (employeeId, skills) => {
        console.log('Setting skills for employee:', { employeeId, skills });
        set((state) => ({
          employeeSkills: {
            ...state.employeeSkills,
            [employeeId]: skills
          }
        }));
      },

      getEmployeeSkills: (employeeId) => {
        const state = get();
        if (!state.employeeSkills[employeeId]) {
          state.initializeEmployeeSkills(employeeId);
        }
        return state.employeeSkills[employeeId] || [];
      },

      setSkillState: (employeeId, skillName, level, requirement) => {
        console.log('Setting skill state:', { employeeId, skillName, level, requirement });
        set((state) => ({
          skillStates: {
            ...state.skillStates,
            [employeeId]: {
              ...state.skillStates[employeeId],
              [skillName]: { level, requirement }
            }
          }
        }));
      },

      getSkillState: (employeeId, skillName) => {
        const state = get();
        return state.skillStates[employeeId]?.[skillName] || { level: 'unspecified', requirement: 'preferred' };
      },

      initializeEmployeeSkills: (employeeId: string) => {
        console.log('Initializing empty skills array for employee:', employeeId);
        const store = get();
        
        if (!store.employeeSkills[employeeId]) {
          store.setEmployeeSkills(employeeId, []);
          
          set((state) => ({
            employees: state.employees.map(emp => 
              emp.id === employeeId 
                ? { ...emp, skillCount: 0 }
                : emp
            )
          }));

          console.log('Initialized empty skills for employee:', {
            employeeId,
            skillCount: 0
          });
        }
      },

      setCompetencyState: (employeeId, skillName, level, levelKey, required) => {
        console.log('Setting competency state:', {
          employeeId,
          skillName,
          level,
          levelKey,
          required
        });

        set((state) => {
          const newCompetencyStates = {
            ...state.competencyStates,
            [employeeId]: {
              ...state.competencyStates[employeeId],
              [skillName]: {
                ...state.competencyStates[employeeId]?.[skillName],
                [levelKey]: { level, required }
              }
            }
          };

          return {
            competencyStates: newCompetencyStates,
            hasCompetencyChanges: true
          };
        });
      },

      getCompetencyState: (employeeId, skillName, levelKey) => {
        const state = get();
        return (
          state.competencyStates[employeeId]?.[skillName]?.[levelKey] || {
            level: 'unspecified',
            required: 'preferred'
          }
        );
      },

      saveCompetencyChanges: (employeeId) => {
        console.log('Saving competency changes for employee:', employeeId);
        set((state) => ({
          originalCompetencyStates: {
            ...state.originalCompetencyStates,
            [employeeId]: state.competencyStates[employeeId]
          },
          hasCompetencyChanges: false
        }));
      },

      cancelCompetencyChanges: (employeeId) => {
        console.log('Canceling competency changes for employee:', employeeId);
        set((state) => ({
          competencyStates: {
            ...state.competencyStates,
            [employeeId]: state.originalCompetencyStates[employeeId] || {}
          },
          hasCompetencyChanges: false
        }));
      },

      resetCompetencyLevels: (employeeId) => {
        console.log('Resetting competency levels for employee:', employeeId);
        set((state) => {
          const freshState = {};
          return {
            competencyStates: {
              ...state.competencyStates,
              [employeeId]: freshState
            },
            hasCompetencyChanges: true
          };
        });
      }
    }),
    {
      name: 'employee-store',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        employees: state.employees,
        employeeSkills: state.employeeSkills,
        skillStates: state.skillStates,
        competencyStates: state.competencyStates,
        originalCompetencyStates: state.originalCompetencyStates
      })
    }
  )
);
