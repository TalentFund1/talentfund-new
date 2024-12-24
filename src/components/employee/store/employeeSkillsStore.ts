import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { EmployeeSkillsStore, EmployeeSkillAchievement, EmployeeSkillState, SkillLevel, SkillGoalStatus } from '../types/employeeSkillTypes';
import { getUnifiedSkillData } from '../../skills/data/skillDatabaseService';
import { roleSkills } from '../../skills/data/roleSkills';
import { getSkillProfileId, getBaseRole } from '../../EmployeeTable';
import { useEmployeeStore } from './employeeStore';

export const useEmployeeSkillsStore = create<EmployeeSkillsStore>()(
  persist(
    (set, get) => ({
      employeeSkills: {},

      initializeEmployeeSkills: (employeeId: string) => {
        console.log('Initializing employee skills:', { employeeId });
        
        // Get employee's role from employee store
        const employee = useEmployeeStore.getState().getEmployeeById(employeeId);
        if (!employee) {
          console.warn('Employee not found during skill initialization:', employeeId);
          return;
        }

        const roleId = getSkillProfileId(employee.role);
        const baseRole = getBaseRole(employee.role);
        
        console.log('Initializing skills for role:', { roleId, baseRole, originalRole: employee.role });

        // Get role skills from roleSkills
        const roleData = roleSkills[roleId];
        if (!roleData) {
          console.warn('Role skills not found:', roleId);
          return;
        }

        // Combine all skills from role
        const allRoleSkills = [
          ...(roleData.specialized || []),
          ...(roleData.common || []),
          ...(roleData.certifications || [])
        ];

        // Create initial skill achievements
        const initialSkills: EmployeeSkillAchievement[] = allRoleSkills.map(skill => {
          const unifiedData = getUnifiedSkillData(skill.title);
          return {
            id: `${employeeId}-${skill.title}`,
            employeeId,
            title: skill.title,
            subcategory: unifiedData.subcategory,
            level: 'unspecified',
            goalStatus: 'unknown',
            lastUpdated: new Date().toISOString(),
            category: unifiedData.category,
            businessCategory: unifiedData.businessCategory,
            weight: unifiedData.weight,
            growth: unifiedData.growth,
            salary: unifiedData.salary,
            confidence: 'medium',
            benchmarks: unifiedData.benchmarks
          };
        });

        console.log('Created initial skills:', {
          employeeId,
          skillCount: initialSkills.length,
          skills: initialSkills.map(s => s.title)
        });

        // Only initialize if not already initialized
        const currentSkills = get().employeeSkills[employeeId];
        if (!currentSkills || currentSkills.skills.length === 0) {
          set(state => ({
            employeeSkills: {
              ...state.employeeSkills,
              [employeeId]: {
                employeeId,
                skills: initialSkills,
                states: initialSkills.reduce((acc, skill) => ({
                  ...acc,
                  [skill.title]: {
                    level: 'unspecified',
                    requirement: 'unknown',
                    lastUpdated: new Date().toISOString()
                  }
                }), {})
              }
            }
          }));
        }
      },

      setSkillLevel: (employeeId: string, skillTitle: string, level: SkillLevel) => {
        console.log('Setting employee skill level:', { employeeId, skillTitle, level });
        set((state) => {
          const employeeData = state.employeeSkills[employeeId] || {
            employeeId,
            skills: [],
            states: {}
          };

          const updatedSkills = [...employeeData.skills];
          const skillIndex = updatedSkills.findIndex(s => s.title === skillTitle);
          const unifiedData = getUnifiedSkillData(skillTitle);

          if (skillIndex >= 0) {
            updatedSkills[skillIndex] = {
              ...updatedSkills[skillIndex],
              level,
              lastUpdated: new Date().toISOString()
            };
          } else {
            const newSkill: EmployeeSkillAchievement = {
              id: `${employeeId}-${skillTitle}`,
              employeeId,
              title: skillTitle,
              subcategory: unifiedData.subcategory,
              level,
              goalStatus: 'unknown',
              lastUpdated: new Date().toISOString(),
              category: unifiedData.category,
              businessCategory: unifiedData.businessCategory,
              weight: unifiedData.weight,
              growth: unifiedData.growth,
              salary: unifiedData.salary,
              confidence: 'medium',
              benchmarks: unifiedData.benchmarks
            };
            updatedSkills.push(newSkill);
          }

          return {
            employeeSkills: {
              ...state.employeeSkills,
              [employeeId]: {
                ...employeeData,
                skills: updatedSkills,
                states: {
                  ...employeeData.states,
                  [skillTitle]: {
                    level,
                    requirement: employeeData.states[skillTitle]?.requirement || 'unknown',
                    lastUpdated: new Date().toISOString()
                  }
                }
              }
            }
          };
        });
      },

      setSkillGoalStatus: (employeeId: string, skillTitle: string, status: SkillGoalStatus) => {
        console.log('Setting employee skill goal status:', { employeeId, skillTitle, status });
        set((state) => {
          const employeeData = state.employeeSkills[employeeId] || {
            employeeId,
            skills: [],
            states: {}
          };

          const updatedSkills = [...employeeData.skills];
          const skillIndex = updatedSkills.findIndex(s => s.title === skillTitle);

          if (skillIndex >= 0) {
            updatedSkills[skillIndex] = {
              ...updatedSkills[skillIndex],
              goalStatus: status,
              lastUpdated: new Date().toISOString()
            };
          }

          return {
            employeeSkills: {
              ...state.employeeSkills,
              [employeeId]: {
                ...employeeData,
                skills: updatedSkills,
                states: {
                  ...employeeData.states,
                  [skillTitle]: {
                    level: employeeData.states[skillTitle]?.level || 'unspecified',
                    requirement: status,
                    lastUpdated: new Date().toISOString()
                  }
                }
              }
            }
          };
        });
      },

      getEmployeeSkills: (employeeId: string) => {
        console.log('Getting skills for employee:', employeeId);
        const state = get();
        if (!state.employeeSkills[employeeId]) {
          state.initializeEmployeeSkills(employeeId);
        }
        const skills = state.employeeSkills[employeeId]?.skills || [];
        console.log('Retrieved employee skills:', {
          employeeId,
          skillCount: skills.length,
          skills: skills.map(s => ({ title: s.title, level: s.level }))
        });
        return skills;
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
            requirement: 'unknown',
            lastUpdated: new Date().toISOString()
          };
        }

        console.log('Retrieved employee skill state:', {
          employeeId,
          skillTitle,
          state: skillState
        });
        
        return skillState;
      }
    }),
    {
      name: 'employee-skills-storage',
      version: 5,
      partialize: (state) => ({
        employeeSkills: state.employeeSkills
      })
    }
  )
);