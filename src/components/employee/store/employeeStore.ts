import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Employee } from "../../types/employeeTypes";
import { employees as defaultEmployees } from "../EmployeeData";
import { UnifiedSkill } from "../../skills/types/SkillTypes";

interface EmployeeSkillState {
  level: string;
  requirement: string;
}

interface EmployeeStore {
  employees: Employee[];
  employeeSkills: Record<string, UnifiedSkill[]>;
  skillStates: Record<string, Record<string, EmployeeSkillState>>;
  addEmployee: (employee: Employee) => void;
  updateEmployee: (employee: Employee) => void;
  getEmployeeById: (id: string) => Employee | undefined;
  setEmployeeSkills: (employeeId: string, skills: UnifiedSkill[]) => void;
  getEmployeeSkills: (employeeId: string) => UnifiedSkill[];
  setSkillState: (employeeId: string, skillName: string, level: string, requirement: string) => void;
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
          
          // Force an update to localStorage
          localStorage.setItem('employee-store', JSON.stringify({
            state: {
              employees: updatedEmployees,
              employeeSkills: state.employeeSkills,
              skillStates: state.skillStates
            },
            version: 1
          }));
          
          return { employees: updatedEmployees };
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