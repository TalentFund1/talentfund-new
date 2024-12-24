import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Employee } from "../../types/employeeTypes";
import { employees as defaultEmployees } from "../EmployeeData";
import { UnifiedSkill } from "../../skills/types/SkillTypes";
import { roleSkills } from "../../skills/data/roleSkills";
import { getSkillProfileId } from "../../EmployeeTable";
import { getUnifiedSkillData } from "../../skills/data/skillDatabaseService";
import { 
  EmployeeSkill, 
  EmployeeSkillState, 
  EmployeeSkillsData, 
  SkillLevel, 
  SkillGoalStatus 
} from "../types/employeeSkillTypes";

interface EmployeeStore {
  employees: Employee[];
  employeeSkills: Record<string, EmployeeSkillsData>;
  addEmployee: (employee: Employee) => void;
  updateEmployee: (employee: Employee) => void;
  getEmployeeById: (id: string) => Employee | undefined;
  setEmployeeSkills: (employeeId: string, skills: UnifiedSkill[]) => void;
  getEmployeeSkills: (employeeId: string) => EmployeeSkill[];
  setSkillState: (employeeId: string, skillName: string, level: string, goalStatus: string) => void;
  getSkillState: (employeeId: string, skillName: string) => EmployeeSkillState;
  initializeEmployeeSkills: (employeeId: string) => void;
}

export const useEmployeeStore = create<EmployeeStore>()(
  persist(
    (set, get) => ({
      employees: [...defaultEmployees],
      employeeSkills: {},

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
        
        const enrichedSkills: EmployeeSkill[] = skills.map(skill => ({
          id: `${employeeId}-${skill.title}`,
          employeeId,
          title: skill.title,
          subcategory: skill.subcategory,
          level: 'unspecified' as SkillLevel,
          goalStatus: 'unknown' as SkillGoalStatus,
          lastUpdated: new Date().toISOString(),
          weight: skill.weight,
          confidence: skill.confidence,
          category: skill.category,
          businessCategory: skill.businessCategory,
          growth: skill.growth,
          salary: skill.salary,
          benchmarks: skill.benchmarks
        }));

        set(state => ({
          employeeSkills: {
            ...state.employeeSkills,
            [employeeId]: {
              employeeId,
              skills: enrichedSkills,
              states: state.employeeSkills[employeeId]?.states || {},
              lastUpdated: new Date().toISOString()
            }
          }
        }));

        console.log('Updated employee skills:', {
          employeeId,
          skillCount: enrichedSkills.length,
          skills: enrichedSkills.map(s => s.title)
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

      setSkillState: (employeeId, skillName, level, goalStatus) => {
        console.log('Setting skill state:', {
          employeeId,
          skillName,
          level,
          goalStatus
        });
        
        set(state => ({
          employeeSkills: {
            ...state.employeeSkills,
            [employeeId]: {
              ...state.employeeSkills[employeeId],
              employeeId,
              states: {
                ...state.employeeSkills[employeeId]?.states,
                [skillName]: {
                  level: level as SkillLevel,
                  goalStatus: goalStatus as SkillGoalStatus,
                  lastUpdated: new Date().toISOString()
                }
              }
            }
          }
        }));
      },

      getSkillState: (employeeId: string, skillTitle: string): EmployeeSkillState => {
        const state = get();
        const skillState = state.employeeSkills[employeeId]?.states[skillTitle];
        
        if (!skillState) {
          console.log('No existing skill state found:', {
            employeeId,
            skillTitle,
            usingDefault: true
          });
          
          return {
            level: 'unspecified',
            goalStatus: 'unknown',
            lastUpdated: new Date().toISOString()
          };
        }

        console.log('Retrieved skill state:', {
          employeeId,
          skillTitle,
          state: skillState
        });
        
        return skillState;
      },

      initializeEmployeeSkills: (employeeId) => {
        console.log('Initializing skills for employee:', employeeId);
        const store = get();
        
        if (!store.employeeSkills[employeeId]) {
          set(state => ({
            employeeSkills: {
              ...state.employeeSkills,
              [employeeId]: {
                employeeId,
                skills: [],
                states: {}
              }
            }
          }));
          console.log('Initialized empty skill set for employee:', employeeId);
        }
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
