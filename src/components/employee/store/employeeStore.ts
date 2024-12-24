import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Employee } from "../../types/employeeTypes";
import { employees as defaultEmployees } from "../EmployeeData";
import { UnifiedSkill } from "../../skills/types/SkillTypes";
import { roleSkills } from "../../skills/data/roleSkills";
import { getSkillProfileId } from "../../EmployeeTable";
import { getUnifiedSkillData } from "../../skills/data/skillDatabaseService";
import { benchmarkingService } from "../../../services/benchmarking";
import { 
  EmployeeSkillData, 
  EmployeeSkillState, 
  EmployeeSkillsData, 
  SkillLevel, 
  SkillGoalStatus,
  EmployeeSkillAchievement
} from "../types/employeeSkillTypes";

interface EmployeeStore {
  employees: Employee[];
  employeeSkills: Record<string, EmployeeSkillsData>;
  addEmployee: (employee: Employee) => void;
  updateEmployee: (employee: Employee) => void;
  getEmployeeById: (id: string) => Employee | undefined;
  setEmployeeSkills: (employeeId: string, skills: UnifiedSkill[]) => void;
  getEmployeeSkills: (employeeId: string) => EmployeeSkillData[];
  setSkillState: (employeeId: string, skillName: string, level: SkillLevel, goalStatus: SkillGoalStatus) => void;
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
        
        const enrichedSkills = skills.map(skill => {
          const skillData = getUnifiedSkillData(skill.title);
          return benchmarkingService.enrichSkillData(employeeId, skill, skillData);
        });

        const skillsRecord: Record<string, EmployeeSkillData> = {};
        enrichedSkills.forEach(skill => {
          skillsRecord[skill.title] = skill as EmployeeSkillData;
        });

        set(state => ({
          employeeSkills: {
            ...state.employeeSkills,
            [employeeId]: {
              employeeId,
              skills: skillsRecord,
              lastUpdated: new Date().toISOString()
            }
          }
        }));

        console.log('Updated employee skills:', {
          employeeId,
          skillCount: Object.keys(skillsRecord).length,
          skills: Object.keys(skillsRecord)
        });
      },

      getEmployeeSkills: (employeeId) => {
        console.log('Getting skills for employee:', employeeId);
        const state = get();
        if (!state.employeeSkills[employeeId]) {
          state.initializeEmployeeSkills(employeeId);
        }
        return Object.values(state.employeeSkills[employeeId]?.skills || {});
      },

      setSkillState: (employeeId, skillTitle, level, goalStatus) => {
        console.log('Setting skill state:', {
          employeeId,
          skillTitle,
          level,
          goalStatus
        });
        
        set(state => ({
          employeeSkills: {
            ...state.employeeSkills,
            [employeeId]: {
              ...state.employeeSkills[employeeId],
              skills: {
                ...state.employeeSkills[employeeId]?.skills,
                [skillTitle]: {
                  ...state.employeeSkills[employeeId]?.skills[skillTitle],
                  level,
                  goalStatus,
                  lastUpdated: new Date().toISOString()
                }
              },
              lastUpdated: new Date().toISOString()
            }
          }
        }));
      },

      getSkillState: (employeeId: string, skillTitle: string): EmployeeSkillState => {
        const state = get();
        const skillData = state.employeeSkills[employeeId]?.skills[skillTitle];
        
        if (!skillData) {
          console.log('No existing skill state found:', {
            employeeId,
            skillTitle,
            usingDefault: true
          });
          
          return {
            level: 'unspecified',
            goalStatus: 'unknown',
            lastUpdated: new Date().toISOString(),
            confidence: 'medium'
          };
        }

        console.log('Retrieved employee skill state:', {
          employeeId,
          skillTitle,
          state: skillData
        });
        
        return {
          level: skillData.level,
          goalStatus: skillData.goalStatus,
          lastUpdated: skillData.lastUpdated,
          confidence: skillData.confidence
        };
      },

      initializeEmployeeSkills: (employeeId) => {
        console.log('Initializing skills for employee:', employeeId);
        const store = get();
        
        if (!store.employeeSkills[employeeId]) {
          const employee = store.getEmployeeById(employeeId);
          if (employee) {
            console.log('Found employee data for initialization:', {
              employeeId,
              skillCount: employee.skills.length,
              skills: employee.skills.map(s => s.title)
            });
            
            const skillsRecord: Record<string, EmployeeSkillData> = {};
            employee.skills.forEach(skill => {
              const skillData = getUnifiedSkillData(skill.title);
              skillsRecord[skill.title] = {
                id: `${employeeId}-${skill.title}`,
                employeeId,
                skillId: `${employeeId}-${skill.title}`,
                title: skill.title,
                level: skill.level as SkillLevel,
                goalStatus: 'unknown',
                lastUpdated: new Date().toISOString(),
                confidence: 'medium',
                subcategory: skillData.subcategory || 'General',
                category: skillData.category,
                businessCategory: skillData.businessCategory,
                weight: skillData.weight,
                growth: skillData.growth,
                salary: skillData.salary,
                benchmarks: skillData.benchmarks || {
                  B: false,
                  R: false,
                  M: false,
                  O: false
                }
              };
            });
            
            set(state => ({
              employeeSkills: {
                ...state.employeeSkills,
                [employeeId]: {
                  employeeId,
                  skills: skillsRecord,
                  lastUpdated: new Date().toISOString()
                }
              }
            }));
          } else {
            console.log('No employee found for initialization:', employeeId);
            set(state => ({
              employeeSkills: {
                ...state.employeeSkills,
                [employeeId]: {
                  employeeId,
                  skills: {},
                  lastUpdated: new Date().toISOString()
                }
              }
            }));
          }
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