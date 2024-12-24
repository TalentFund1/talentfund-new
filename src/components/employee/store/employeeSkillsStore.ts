import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { EmployeeSkill, EmployeeSkillState, EmployeeSkillsData } from '../types/employeeSkillTypes';
import { getUnifiedSkillData } from '../../skills/data/skillDatabaseService';

interface EmployeeSkillsStore {
  employeeSkills: Record<string, EmployeeSkillsData>;
  setEmployeeSkills: (employeeId: string, skills: EmployeeSkill[]) => void;
  getEmployeeSkills: (employeeId: string) => EmployeeSkill[];
  getSkillState: (employeeId: string, skillTitle: string) => EmployeeSkillState;
  initializeEmployeeSkills: (employeeId: string) => void;
}

export const useEmployeeSkillsStore = create<EmployeeSkillsStore>()(
  persist(
    (set, get) => ({
      employeeSkills: {},

      setEmployeeSkills: (employeeId, skills) => {
        console.log('Setting skills for employee:', {
          employeeId,
          skillCount: skills.length,
          skills: skills.map(s => s.title)
        });

        // Enrich skills with universal data
        const enrichedSkills = skills.map(skill => {
          const universalData = getUnifiedSkillData(skill.title);
          return {
            ...skill,
            businessCategory: universalData.businessCategory,
            weight: universalData.weight,
            category: universalData.category,
            subcategory: universalData.subcategory,
            growth: universalData.growth || '0%',
            salary: universalData.salary || 'N/A',
            confidence: universalData.confidence || 'medium',
            benchmarks: universalData.benchmarks || {
              B: false,
              R: false,
              M: false,
              O: false
            }
          };
        });

        set((state) => ({
          employeeSkills: {
            ...state.employeeSkills,
            [employeeId]: {
              skills: enrichedSkills,
              states: state.employeeSkills[employeeId]?.states || {}
            }
          }
        }));
      },

      getEmployeeSkills: (employeeId) => {
        console.log('Getting skills for employee:', employeeId);
        const employeeData = get().employeeSkills[employeeId];
        
        if (!employeeData?.skills) {
          console.log('No skills found for employee:', employeeId);
          return [];
        }
        
        console.log('Loaded employee skills:', {
          employeeId,
          skillCount: employeeData.skills.length,
          skills: employeeData.skills.map(s => s.title)
        });
        
        return employeeData.skills;
      },

      getSkillState: (employeeId, skillTitle) => {
        console.log('Getting skill state:', { employeeId, skillTitle });
        const state = get().employeeSkills[employeeId]?.states[skillTitle];
        const timestamp = new Date().toISOString();
        return state || { 
          level: 'beginner', 
          requirement: 'unknown', 
          lastUpdated: timestamp 
        };
      },

      initializeEmployeeSkills: (employeeId) => {
        console.log('Initializing skills for employee:', employeeId);
        const currentSkills = get().employeeSkills[employeeId];
        
        if (!currentSkills) {
          set((state) => ({
            employeeSkills: {
              ...state.employeeSkills,
              [employeeId]: {
                skills: [],
                states: {}
              }
            }
          }));
        }
      }
    }),
    {
      name: 'employee-skills-storage',
      version: 1
    }
  )
);