import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { EmployeeSkillData, EmployeeSkillState, EmployeeSkillsData, SkillLevel, SkillGoalStatus } from "../types/employeeSkillTypes";
import { employees } from "../EmployeeData";
import { getUnifiedSkillData } from "../../skills/data/skillDatabaseService";

interface EmployeeSkillsStore {
  skillStates: Record<string, {
    skills: Record<string, EmployeeSkillData>;
    lastUpdated: string;
  }>;
  getSkillState: (employeeId: string, skillTitle: string) => EmployeeSkillData;
  getEmployeeSkills: (employeeId: string) => EmployeeSkillData[];
  setSkillLevel: (employeeId: string, skillTitle: string, level: string) => void;
  setSkillGoalStatus: (employeeId: string, skillTitle: string, status: string) => void;
  initializeEmployeeSkills: (employeeId: string) => void;
  updateSkillState: (employeeId: string, skillTitle: string, updates: Partial<EmployeeSkillData>) => void;
  batchUpdateSkills: (employeeId: string, updates: Record<string, Partial<EmployeeSkillData>>) => void;
}

export const useEmployeeSkillsStore = create<EmployeeSkillsStore>()(
  persist(
    (set, get) => ({
      skillStates: {},

      getSkillState: (employeeId, skillTitle) => {
        console.log('Getting skill state:', { employeeId, skillTitle });
        const state = get().skillStates[employeeId]?.skills[skillTitle];
        if (!state) {
          const skillData = getUnifiedSkillData(skillTitle);
          return {
            id: `${employeeId}-${skillTitle}`,
            employeeId,
            skillId: `${employeeId}-${skillTitle}`,
            title: skillTitle,
            level: 'unspecified' as SkillLevel,
            goalStatus: 'unknown' as SkillGoalStatus,
            lastUpdated: new Date().toISOString(),
            skillScore: 0,
            subcategory: skillData.subcategory || 'General',
            category: skillData.category || 'specialized',
            businessCategory: skillData.businessCategory || 'Technical Skills',
            weight: skillData.weight || 'technical',
            growth: skillData.growth || '0%',
            salary: skillData.salary || 'market',
            minimumLevel: 'beginner',
            requirementLevel: 'required',
            metrics: {
              growth: skillData.growth || '0%',
              salary: skillData.salary || 'market',
              skillScore: 0
            },
            inDevelopmentPlan: false,
            benchmarks: {
              B: false,
              R: false,
              M: false,
              O: false
            }
          };
        }
        return state;
      },

      getEmployeeSkills: (employeeId) => {
        console.log('Getting skills for employee:', employeeId);
        const employeeState = get().skillStates[employeeId];
        if (!employeeState?.skills) {
          const employee = employees.find(emp => emp.id === employeeId);
          if (employee) {
            get().initializeEmployeeSkills(employeeId);
            return employee.skills.map(skill => get().getSkillState(employeeId, skill.title));
          }
          return [];
        }
        const skills = Object.values(employeeState.skills);
        console.log('Retrieved skills:', {
          employeeId,
          skillCount: skills.length,
          skills: skills.map(s => s.title)
        });
        return skills;
      },

      setSkillLevel: (employeeId, skillTitle, level) => {
        console.log('Setting skill level:', { employeeId, skillTitle, level });
        set(state => {
          const skillState = state.skillStates[employeeId]?.skills[skillTitle];
          if (skillState) {
            skillState.level = level as SkillLevel;
            skillState.lastUpdated = new Date().toISOString();
          }
          return { skillStates: { ...state.skillStates } };
        });
      },

      setSkillGoalStatus: (employeeId, skillTitle, status) => {
        console.log('Setting skill goal status:', { employeeId, skillTitle, status });
        set(state => {
          const skillState = state.skillStates[employeeId]?.skills[skillTitle];
          if (skillState) {
            skillState.goalStatus = status as SkillGoalStatus;
            skillState.lastUpdated = new Date().toISOString();
          }
          return { skillStates: { ...state.skillStates } };
        });
      },

      initializeEmployeeSkills: (employeeId) => {
        console.log('Initializing skills for employee:', employeeId);
        const employee = employees.find(emp => emp.id === employeeId);
        
        set(state => {
          if (!state.skillStates[employeeId]) {
            const skills: Record<string, EmployeeSkillData> = {};
            
            if (employee) {
              employee.skills.forEach(skill => {
                const skillData = getUnifiedSkillData(skill.title);
                skills[skill.title] = {
                  id: `${employeeId}-${skill.title}`,
                  employeeId,
                  skillId: `${employeeId}-${skill.title}`,
                  title: skill.title,
                  level: skill.level as SkillLevel || 'unspecified',
                  goalStatus: 'unknown' as SkillGoalStatus,
                  lastUpdated: new Date().toISOString(),
                  skillScore: 0,
                  subcategory: skillData.subcategory || 'General',
                  category: skillData.category || 'specialized',
                  businessCategory: skillData.businessCategory || 'Technical Skills',
                  weight: skillData.weight || 'technical',
                  growth: skillData.growth || '0%',
                  salary: skillData.salary || 'market',
                  minimumLevel: 'beginner',
                  requirementLevel: 'required',
                  metrics: {
                    growth: skillData.growth || '0%',
                    salary: skillData.salary || 'market',
                    skillScore: 0
                  },
                  inDevelopmentPlan: false,
                  benchmarks: {
                    B: false,
                    R: false,
                    M: false,
                    O: false
                  }
                };
              });
            }

            state.skillStates[employeeId] = {
              skills,
              lastUpdated: new Date().toISOString()
            };
          }
          return { skillStates: { ...state.skillStates } };
        });
      },

      updateSkillState: (employeeId, skillTitle, updates) => {
        console.log('Updating skill state:', { employeeId, skillTitle, updates });
        set(state => {
          const skillState = state.skillStates[employeeId]?.skills[skillTitle];
          if (skillState) {
            Object.assign(skillState, updates);
            skillState.lastUpdated = new Date().toISOString();
          }
          return { skillStates: { ...state.skillStates } };
        });
      },

      batchUpdateSkills: (employeeId, updates) => {
        console.log('Batch updating skills:', { employeeId, updateCount: Object.keys(updates).length });
        set(state => {
          const skills = state.skillStates[employeeId]?.skills;
          if (skills) {
            Object.entries(updates).forEach(([skillTitle, update]) => {
              if (skills[skillTitle]) {
                Object.assign(skills[skillTitle], update);
                skills[skillTitle].lastUpdated = new Date().toISOString();
              }
            });
          }
          return { skillStates: { ...state.skillStates } };
        });
      },
    }),
    {
      name: 'employee-skills-store',
      storage: createJSONStorage(() => localStorage)
    }
  )
);