import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Employee } from "../../types/employeeTypes";
import { employees as defaultEmployees } from "../EmployeeData";
import { UnifiedSkill, EmployeeSkillState, EmployeeSkillRequirement } from '../../skills/types/SkillTypes';
import { getUnifiedSkillData } from '../../skills/data/skillDatabaseService';

// Initial skills for employee 123 (AI Engineer)
const initialSkills = [
  "Machine Learning",
  "Deep Learning", 
  "Natural Language Processing",
  "Computer Vision",
  "TensorFlow",
  "Python",
  "Problem Solving",
  "AWS Certified Machine Learning - Specialty",
  "TensorFlow Developer Certificate"
].map(skillName => {
  const skillData = getUnifiedSkillData(skillName);
  console.log('Initializing skill:', { skillName, skillData });
  return {
    ...skillData,
    id: `skill_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    level: 'intermediate',
    requirement: 'skill_goal' as EmployeeSkillRequirement
  };
});

interface EmployeeStore {
  employees: Employee[];
  employeeSkills: Record<string, UnifiedSkill[]>;
  skillStates: Record<string, Record<string, EmployeeSkillState>>;
  addEmployee: (employee: Employee) => void;
  updateEmployee: (employee: Employee) => void;
  getEmployeeById: (id: string) => Employee | undefined;
  setEmployeeSkills: (employeeId: string, skills: UnifiedSkill[]) => void;
  getEmployeeSkills: (employeeId: string) => UnifiedSkill[];
  setSkillState: (employeeId: string, skillId: string, skillName: string, level: string, requirement: EmployeeSkillRequirement) => void;
  getSkillState: (employeeId: string, skillName: string) => EmployeeSkillState;
  initializeEmployeeSkills: (employeeId: string) => void;
}

export const useEmployeeStore = create<EmployeeStore>()(
  persist(
    (set, get) => ({
      employees: defaultEmployees,
      employeeSkills: {
        "123": initialSkills
      },
      skillStates: {},

      initializeEmployeeSkills: (employeeId: string) => {
        console.log('Initializing skills for employee:', employeeId);
        const store = get();
        
        if (!store.employeeSkills[employeeId]) {
          store.setEmployeeSkills(employeeId, employeeId === "123" ? initialSkills : []);
        }

        if (!store.skillStates[employeeId]) {
          set((state) => ({
            skillStates: {
              ...state.skillStates,
              [employeeId]: {}
            }
          }));
        }
      },

      addEmployee: (employee) => {
        console.log('Adding new employee:', employee.id);
        set((state) => ({
          employees: [...state.employees, employee]
        }));
        get().initializeEmployeeSkills(employee.id);
      },

      updateEmployee: (employee) => {
        console.log('Updating employee:', employee.id);
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
        console.log('Setting skills for employee:', employeeId, skills);
        set((state) => ({
          employeeSkills: {
            ...state.employeeSkills,
            [employeeId]: skills.map(skill => ({
              ...skill,
              id: skill.id || `skill_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
              level: skill.level || 'intermediate',
              requirement: skill.requirement || 'skill_goal'
            }))
          }
        }));

        const store = get();
        if (!store.skillStates[employeeId]) {
          store.skillStates[employeeId] = {};
        }

        skills.forEach(skill => {
          if (!store.skillStates[employeeId][skill.title]) {
            store.setSkillState(
              employeeId, 
              skill.id,
              skill.title, 
              skill.level || 'intermediate', 
              skill.requirement || 'skill_goal'
            );
          }
        });
      },

      getEmployeeSkills: (employeeId) => {
        console.log('Getting skills for employee:', employeeId);
        const state = get();
        if (!state.employeeSkills[employeeId]) {
          state.initializeEmployeeSkills(employeeId);
        }
        return state.employeeSkills[employeeId] || [];
      },

      setSkillState: (employeeId, skillId, skillName, level, requirement) => {
        console.log('Setting skill state:', { 
          employeeId, 
          skillId,
          skillName, 
          level, 
          requirement 
        });
        
        set((state) => ({
          skillStates: {
            ...state.skillStates,
            [employeeId]: {
              ...state.skillStates[employeeId],
              [skillName]: { id: skillId, level, requirement }
            }
          }
        }));
      },

      getSkillState: (employeeId, skillName) => {
        console.log('Getting skill state:', { employeeId, skillName });
        const state = get();
        return state.skillStates[employeeId]?.[skillName] || {
          id: skillName,
          level: 'intermediate',
          requirement: 'unknown' as EmployeeSkillRequirement
        };
      }
    }),
    {
      name: 'employee-store',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        employees: state.employees,
        employeeSkills: state.employeeSkills,
        skillStates: state.skillStates
      })
    }
  )
);