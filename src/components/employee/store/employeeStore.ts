import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Employee } from "../../types/employeeTypes";
import { employees as defaultEmployees } from "../EmployeeData";
import { UnifiedSkill, EmployeeSkillState, EmployeeSkillRequirement } from "../../skills/types/SkillTypes";

interface EmployeeStore {
  employees: Employee[];
  employeeSkills: Record<string, UnifiedSkill[]>;
  skillStates: Record<string, Record<string, EmployeeSkillState>>;
  addEmployee: (employee: Employee) => void;
  updateEmployee: (employee: Employee) => void;
  getEmployeeById: (id: string) => Employee | undefined;
  setEmployeeSkills: (employeeId: string, skills: UnifiedSkill[]) => void;
  getEmployeeSkills: (employeeId: string) => UnifiedSkill[];
  setSkillState: (employeeId: string, skillName: string, level: string, requirement: EmployeeSkillRequirement) => void;
  getSkillState: (employeeId: string, skillName: string) => EmployeeSkillState;
  initializeEmployeeSkills: (employeeId: string) => void;
}

export const useEmployeeStore = create<EmployeeStore>()(
  persist(
    (set, get) => ({
      employees: defaultEmployees,
      employeeSkills: {},
      skillStates: {},

      initializeEmployeeSkills: (employeeId: string) => {
        console.log('Initializing empty skills array for employee:', employeeId);
        const store = get();
        
        if (!store.employeeSkills[employeeId]) {
          store.setEmployeeSkills(employeeId, []);
          
          // Initialize empty skill states for the employee
          if (!store.skillStates[employeeId]) {
            set((state) => ({
              skillStates: {
                ...state.skillStates,
                [employeeId]: {}
              }
            }));
          }
        }
      },

      addEmployee: (employee) => {
        set((state) => ({
          employees: [...state.employees, employee]
        }));
        // Initialize skills and states for new employee
        get().initializeEmployeeSkills(employee.id);
      },

      updateEmployee: (employee) => {
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

        // Initialize skill states for new skills if they don't exist
        const store = get();
        skills.forEach(skill => {
          if (!store.skillStates[employeeId]?.[skill.title]) {
            store.setSkillState(employeeId, skill.title, 'unspecified', 'unknown');
          }
        });
      },

      getEmployeeSkills: (employeeId) => {
        const state = get();
        if (!state.employeeSkills[employeeId]) {
          state.initializeEmployeeSkills(employeeId);
        }
        return state.employeeSkills[employeeId] || [];
      },

      setSkillState: (employeeId, skillName, level, requirement) => {
        console.log('Setting employee skill state:', { 
          employeeId, 
          skillName, 
          level, 
          requirement 
        });
        
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
        // Ensure employee skill states exist
        if (!state.skillStates[employeeId]) {
          console.log('Initializing skill states for employee:', employeeId);
          state.initializeEmployeeSkills(employeeId);
        }
        return state.skillStates[employeeId]?.[skillName] || { 
          level: 'unspecified', 
          requirement: 'unknown' 
        };
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