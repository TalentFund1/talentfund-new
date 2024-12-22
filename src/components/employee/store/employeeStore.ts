import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Employee } from "../../types/employeeTypes";
import { employees as defaultEmployees } from "../EmployeeData";
import { UnifiedSkill, EmployeeSkillState, EmployeeSkillRequirement, RoleSkillState } from "../../skills/types/SkillTypes";

interface EmployeeStore {
  employees: Employee[];
  employeeSkills: Record<string, UnifiedSkill[]>;
  skillStates: Record<string, Record<string, EmployeeSkillState>>;
  competencyStates: Record<string, Record<string, Record<string, RoleSkillState>>>;
  addEmployee: (employee: Employee) => void;
  updateEmployee: (employee: Employee) => void;
  getEmployeeById: (id: string) => Employee | undefined;
  setEmployeeSkills: (employeeId: string, skills: UnifiedSkill[]) => void;
  getEmployeeSkills: (employeeId: string) => UnifiedSkill[];
  setSkillState: (employeeId: string, skillName: string, level: string, requirement: EmployeeSkillRequirement) => void;
  getSkillState: (employeeId: string, skillName: string) => EmployeeSkillState;
  initializeEmployeeSkills: (employeeId: string) => void;
  // New competency management methods
  setCompetencyState: (roleId: string, skillName: string, level: string, levelKey: string) => void;
  getCompetencyState: (roleId: string, skillName: string, levelKey: string) => RoleSkillState;
  initializeCompetencyState: (roleId: string) => void;
}

export const useEmployeeStore = create<EmployeeStore>()(
  persist(
    (set, get) => ({
      employees: defaultEmployees,
      employeeSkills: {},
      skillStates: {},
      competencyStates: {},

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
        }
      },

      addEmployee: (employee) => {
        set((state) => ({
          employees: [...state.employees, employee]
        }));
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
        return state.skillStates[employeeId]?.[skillName] || { 
          level: 'unspecified', 
          requirement: 'unknown' 
        };
      },

      // New competency management methods
      setCompetencyState: (roleId, skillName, level, levelKey) => {
        console.log('Setting competency state:', { roleId, skillName, level, levelKey });
        set((state) => ({
          competencyStates: {
            ...state.competencyStates,
            [roleId]: {
              ...state.competencyStates[roleId],
              [skillName]: {
                ...state.competencyStates[roleId]?.[skillName],
                [levelKey]: { level }
              }
            }
          }
        }));
      },

      getCompetencyState: (roleId, skillName, levelKey) => {
        const state = get();
        return state.competencyStates[roleId]?.[skillName]?.[levelKey] || { 
          level: 'unspecified'
        };
      },

      initializeCompetencyState: (roleId) => {
        const state = get();
        if (!state.competencyStates[roleId]) {
          console.log('Initializing competency state for role:', roleId);
          set((state) => ({
            competencyStates: {
              ...state.competencyStates,
              [roleId]: {}
            }
          }));
        }
      }
    }),
    {
      name: 'employee-store',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        employees: state.employees,
        employeeSkills: state.employeeSkills,
        skillStates: state.skillStates,
        competencyStates: state.competencyStates
      })
    }
  )
);