import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { EmployeeSkill, EmployeeSkillsData, SkillLevel, SkillGoalStatus } from '../types/employeeSkillTypes';

interface EmployeeSkillsStore {
  employeeSkills: Record<string, EmployeeSkillsData>;
  getEmployeeSkills: (employeeId: string) => EmployeeSkill[];
  setSkillLevel: (employeeId: string, skillTitle: string, level: SkillLevel) => void;
  setSkillGoalStatus: (employeeId: string, skillTitle: string, status: SkillGoalStatus) => void;
  initializeEmployeeSkills: (employeeId: string) => void;
}

export const useEmployeeSkillsStore = create<EmployeeSkillsStore>()(
  persist(
    (set, get) => ({
      employeeSkills: {},

      getEmployeeSkills: (employeeId) => {
        console.log('Getting skills for employee:', employeeId);
        const employeeData = get().employeeSkills[employeeId];
        if (!employeeData) {
          console.log('No skills found for employee:', employeeId);
          return [];
        }
        return employeeData.skills;
      },

      setSkillLevel: (employeeId, skillTitle, level) => {
        console.log('Setting skill level:', { employeeId, skillTitle, level });
        set((state) => {
          const employeeData = state.employeeSkills[employeeId] || { 
            employeeId, 
            skills: [] 
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
            updatedSkills.push({
              id: `${employeeId}-${skillTitle}`,
              title: skillTitle,
              level,
              goalStatus: 'unknown',
              lastUpdated: new Date().toISOString()
            });
          }

          return {
            employeeSkills: {
              ...state.employeeSkills,
              [employeeId]: {
                employeeId,
                skills: updatedSkills
              }
            }
          };
        });
      },

      setSkillGoalStatus: (employeeId, skillTitle, status) => {
        console.log('Setting skill goal status:', { employeeId, skillTitle, status });
        set((state) => {
          const employeeData = state.employeeSkills[employeeId] || { 
            employeeId, 
            skills: [] 
          };

          const updatedSkills = [...employeeData.skills];
          const skillIndex = updatedSkills.findIndex(s => s.title === skillTitle);

          if (skillIndex >= 0) {
            updatedSkills[skillIndex] = {
              ...updatedSkills[skillIndex],
              goalStatus: status,
              lastUpdated: new Date().toISOString()
            };
          } else {
            updatedSkills.push({
              id: `${employeeId}-${skillTitle}`,
              title: skillTitle,
              level: 'unspecified',
              goalStatus: status,
              lastUpdated: new Date().toISOString()
            });
          }

          return {
            employeeSkills: {
              ...state.employeeSkills,
              [employeeId]: {
                employeeId,
                skills: updatedSkills
              }
            }
          };
        });
      },

      initializeEmployeeSkills: (employeeId) => {
        console.log('Initializing skills for employee:', employeeId);
        const currentSkills = get().employeeSkills[employeeId];
        
        if (!currentSkills) {
          set((state) => ({
            employeeSkills: {
              ...state.employeeSkills,
              [employeeId]: {
                employeeId,
                skills: []
              }
            }
          }));
          console.log('Initialized empty skill set for employee:', employeeId);
        }
      }
    }),
    {
      name: 'employee-skills-storage',
      version: 1
    }
  )
);