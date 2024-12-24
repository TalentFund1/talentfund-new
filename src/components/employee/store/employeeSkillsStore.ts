import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { EmployeeSkillsStore, EmployeeSkillAchievement, EmployeeSkillState, SkillLevel, SkillGoalStatus } from '../types/employeeSkillTypes';
import { getUnifiedSkillData } from '../../skills/data/skillDatabaseService';
import { SkillCategory, SkillRequirement } from '../../skills/types/SkillTypes';

const mapGoalStatusToRequirement = (status: SkillGoalStatus): SkillRequirement => {
  switch (status) {
    case 'not_interested':
      return 'not_interested';
    case 'skill_goal':
      return 'skill_goal';
    default:
      return status as SkillRequirement;
  }
};

export const useEmployeeSkillsStore = create<EmployeeSkillsStore>()(
  persist(
    (set, get) => ({
      employeeSkills: {},

      initializeEmployeeSkills: (employeeId: string) => {
        console.log('Initializing employee skills:', { employeeId });
        const currentSkills = get().employeeSkills[employeeId];
        
        if (!currentSkills) {
          console.log('No existing skills found, creating new entry for employee:', employeeId);
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
        } else {
          console.log('Found existing skills for employee:', {
            employeeId,
            skillCount: currentSkills.skills.length
          });
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

          if (skillIndex >= 0) {
            updatedSkills[skillIndex] = {
              ...updatedSkills[skillIndex],
              level,
              lastUpdated: new Date().toISOString()
            };
          } else {
            const skillData = getUnifiedSkillData(skillTitle);
            const newSkill: EmployeeSkillAchievement = {
              id: `${employeeId}-${skillTitle}`,
              employeeId,
              title: skillTitle,
              subcategory: skillData.subcategory,
              level,
              goalStatus: 'unknown',
              lastUpdated: new Date().toISOString(),
              category: skillData.category,
              weight: skillData.weight,
              confidence: 'medium'
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
