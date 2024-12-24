import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Employee } from "../../types/employeeTypes";
import { employees as defaultEmployees } from "../EmployeeData";
import { UnifiedSkill } from "../../skills/types/SkillTypes";
import { roleSkills } from "../../skills/data/roleSkills";
import { getSkillProfileId } from "../../EmployeeTable";
import { EmployeeSkillState, EmployeeSkills, SkillRequirement } from "../types/employeeSkillTypes";

interface EmployeeStore {
  employees: Employee[];
  employeeSkills: Record<string, EmployeeSkills>;
  addEmployee: (employee: Employee) => void;
  updateEmployee: (employee: Employee) => void;
  getEmployeeById: (id: string) => Employee | undefined;
  setEmployeeSkills: (employeeId: string, skills: UnifiedSkill[]) => void;
  getEmployeeSkills: (employeeId: string) => UnifiedSkill[];
  setSkillState: (employeeId: string, skillName: string, level: string, requirement: SkillRequirement) => void;
  getSkillState: (employeeId: string, skillName: string) => EmployeeSkillState;
  initializeEmployeeSkills: (employeeId: string) => void;
}

export const useEmployeeStore = create<EmployeeStore>()(
  persist(
    (set, get) => ({
      employees: defaultEmployees,
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
        const state = get();
        return state.employees.find(emp => emp.id === id);
      },

      setEmployeeSkills: (employeeId, skills) => {
        console.log('Setting skills for employee:', { employeeId, skillCount: skills.length });
        
        const timestamp = new Date().toISOString();
        const skillStates: Record<string, EmployeeSkillState> = {};
        
        skills.forEach(skill => {
          skillStates[skill.title] = {
            level: skill.level || 'beginner',
            requirement: (skill.requirement as SkillRequirement) || 'unknown',
            lastUpdated: timestamp
          };
        });

        set((state) => ({
          employeeSkills: {
            ...state.employeeSkills,
            [employeeId]: {
              id: employeeId,
              skills: skillStates,
              lastUpdated: timestamp
            }
          }
        }));

        console.log('Updated employee skills:', {
          employeeId,
          skillCount: Object.keys(skillStates).length,
          timestamp
        });
      },

      getEmployeeSkills: (employeeId) => {
        console.log('Getting skills for employee:', employeeId);
        const state = get();
        const employee = state.employees.find(emp => emp.id === employeeId);
        
        if (!employee) {
          console.warn('Employee not found:', employeeId);
          return [];
        }

        const roleId = getSkillProfileId(employee.role);
        const employeeSkillsData = state.employeeSkills[employeeId];

        if (!employeeSkillsData) {
          console.log('No skills found for employee, initializing:', employeeId);
          state.initializeEmployeeSkills(employeeId);
          return [];
        }

        const role = roleSkills[roleId as keyof typeof roleSkills];
        if (!role) {
          console.warn('No role found for ID:', roleId);
          return [];
        }

        const allRoleSkills = [
          ...(role.specialized || []),
          ...(role.common || []),
          ...(role.certifications || [])
        ];

        const skills = allRoleSkills.map(roleSkill => {
          const skillState = employeeSkillsData.skills[roleSkill.title];
          return {
            ...roleSkill,
            level: skillState?.level || 'beginner',
            requirement: skillState?.requirement || 'unknown'
          } as UnifiedSkill;
        });

        console.log('Retrieved employee skills:', {
          employeeId,
          skillCount: skills.length,
          lastUpdated: employeeSkillsData.lastUpdated
        });

        return skills;
      },

      setSkillState: (employeeId, skillName, level, requirement) => {
        console.log('Setting skill state:', {
          employeeId,
          skillName,
          level,
          requirement
        });

        set((state) => {
          const currentSkills = state.employeeSkills[employeeId]?.skills || {};
          const timestamp = new Date().toISOString();

          return {
            employeeSkills: {
              ...state.employeeSkills,
              [employeeId]: {
                id: employeeId,
                skills: {
                  ...currentSkills,
                  [skillName]: {
                    level,
                    requirement,
                    lastUpdated: timestamp
                  }
                },
                lastUpdated: timestamp
              }
            }
          };
        });
      },

      getSkillState: (employeeId, skillName) => {
        const state = get();
        const skillState = state.employeeSkills[employeeId]?.skills[skillName];
        
        console.log('Getting skill state:', {
          employeeId,
          skillName,
          state: skillState || 'default'
        });

        return skillState || {
          level: 'beginner',
          requirement: 'unknown' as SkillRequirement,
          lastUpdated: new Date().toISOString()
        };
      },

      initializeEmployeeSkills: (employeeId) => {
        console.log('Initializing skills for employee:', employeeId);
        const state = get();
        const employee = state.employees.find(emp => emp.id === employeeId);
        
        if (!employee) {
          console.warn('Cannot initialize skills - Employee not found:', employeeId);
          return;
        }

        const roleId = getSkillProfileId(employee.role);
        const role = roleSkills[roleId as keyof typeof roleSkills];
        
        if (!role) {
          console.warn('Cannot initialize skills - Role not found:', roleId);
          return;
        }

        const allRoleSkills = [
          ...(role.specialized || []),
          ...(role.common || []),
          ...(role.certifications || [])
        ];

        const timestamp = new Date().toISOString();
        const skillStates: Record<string, EmployeeSkillState> = {};

        allRoleSkills.forEach(skill => {
          skillStates[skill.title] = {
            level: 'beginner',
            requirement: 'unknown',
            lastUpdated: timestamp
          };
        });

        set((state) => ({
          employeeSkills: {
            ...state.employeeSkills,
            [employeeId]: {
              id: employeeId,
              skills: skillStates,
              lastUpdated: timestamp
            }
          }
        }));

        console.log('Initialized employee skills:', {
          employeeId,
          skillCount: Object.keys(skillStates).length,
          timestamp
        });
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