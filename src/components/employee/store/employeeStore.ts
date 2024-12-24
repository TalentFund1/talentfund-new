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
        console.log('Initializing skills for employee:', employeeId);
        const store = get();
        
        // Only initialize if no skills exist yet
        if (!store.employeeSkills[employeeId]) {
          store.setEmployeeSkills(employeeId, []);
          console.log('Initialized empty skills array for employee:', employeeId);
        }
      },

      addEmployee: (employee) => {
        console.log('Adding employee to store:', employee);
        set((state) => {
          const newEmployees = [...state.employees, employee];
          return { employees: newEmployees };
        });
      },

      updateEmployee: (employee) => {
        console.log('Updating employee in store:', employee);
        set((state) => {
          const updatedEmployees = state.employees.map((emp) => 
            emp.id === employee.id ? { ...employee } : emp
          );
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
        return get().employees.find(emp => emp.id === id);
      },

      setEmployeeSkills: (employeeId, skills) => {
        console.log('Setting skills for employee:', { 
          employeeId, 
          skillCount: skills.length,
          skills: skills.map(s => s.title)
        });
        
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
        const skills = state.employeeSkills[employeeId] || [];
        console.log('Retrieved skills for employee:', {
          id: employeeId,
          skillCount: skills.length,
          skills: skills.map(s => s.title)
        });
        return skills;
      },

      setSkillState: (employeeId, skillName, level, requirement) => {
        console.log('Setting skill state for employee:', {
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
        const state = get().skillStates[employeeId]?.[skillName];
        return state || { level: 'unspecified', requirement: 'unknown' };
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