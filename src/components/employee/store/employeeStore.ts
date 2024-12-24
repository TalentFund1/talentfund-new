import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Employee } from "../../types/employeeTypes";
import { employees as defaultEmployees } from "../EmployeeData";
import { UnifiedSkill } from "../../skills/types/SkillTypes";
import { roleSkills } from "../../skills/data/roleSkills";
import { getSkillProfileId } from "../../EmployeeTable";

interface EmployeeSkillState {
  level: string;
  requirement: string;
  lastUpdated: string;
}

interface EmployeeSkills {
  skills: UnifiedSkill[];
  states: Record<string, EmployeeSkillState>;
}

interface EmployeeStore {
  employees: Employee[];
  employeeSkills: Record<string, EmployeeSkills>;
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

      initializeEmployeeSkills: (employeeId: string) => {
        console.log('Initializing skills for employee:', employeeId);
        const store = get();
        const employee = store.employees.find(emp => emp.id === employeeId);
        
        if (!employee) {
          console.warn('Employee not found:', employeeId);
          return;
        }

        // Only initialize if not already present
        if (!store.employeeSkills[employeeId]) {
          const roleId = getSkillProfileId(employee.role);
          const roleData = roleSkills[roleId as keyof typeof roleSkills];
          
          if (!roleData) {
            console.warn('No role data found for:', roleId);
            return;
          }

          const initialSkills = [
            ...(roleData.specialized || []),
            ...(roleData.common || []),
            ...(roleData.certifications || [])
          ];

          // Initialize with default states and timestamp
          const initialStates: Record<string, EmployeeSkillState> = {};
          initialSkills.forEach(skill => {
            initialStates[skill.title] = {
              level: skill.level || 'beginner',
              requirement: 'unknown',
              lastUpdated: new Date().toISOString()
            };
          });

          set(state => ({
            employeeSkills: {
              ...state.employeeSkills,
              [employeeId]: {
                skills: initialSkills,
                states: initialStates
              }
            }
          }));

          console.log('Initialized employee skills:', {
            employeeId,
            skillCount: initialSkills.length,
            states: initialStates
          });
        }
      },

      addEmployee: (employee) => {
        console.log('Adding employee to store:', employee);
        set((state) => ({
          employees: [...state.employees, employee]
        }));
      },

      updateEmployee: (employee) => {
        console.log('Updating employee in store:', employee);
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
        console.log('Setting skills for employee:', { employeeId, skills });
        set((state) => ({
          employeeSkills: {
            ...state.employeeSkills,
            [employeeId]: {
              ...state.employeeSkills[employeeId],
              skills,
              lastUpdated: new Date().toISOString()
            }
          }
        }));
      },

      getEmployeeSkills: (employeeId) => {
        const state = get();
        if (!state.employeeSkills[employeeId]) {
          state.initializeEmployeeSkills(employeeId);
        }
        return state.employeeSkills[employeeId]?.skills || [];
      },

      setSkillState: (employeeId, skillName, level, requirement) => {
        console.log('Setting skill state:', {
          employeeId,
          skillName,
          level,
          requirement
        });
        
        set((state) => ({
          employeeSkills: {
            ...state.employeeSkills,
            [employeeId]: {
              ...state.employeeSkills[employeeId],
              states: {
                ...state.employeeSkills[employeeId]?.states,
                [skillName]: { 
                  level, 
                  requirement,
                  lastUpdated: new Date().toISOString()
                }
              }
            }
          }
        }));
      },

      getSkillState: (employeeId, skillName) => {
        const state = get();
        return state.employeeSkills[employeeId]?.states[skillName] || { 
          level: 'beginner', 
          requirement: 'unknown',
          lastUpdated: new Date().toISOString()
        };
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