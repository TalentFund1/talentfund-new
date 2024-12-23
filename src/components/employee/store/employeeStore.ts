import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Employee } from "../../types/employeeTypes";
import { employees as defaultEmployees } from "../EmployeeData";
import { UnifiedSkill, EmployeeSkillState, EmployeeSkillRequirement } from '../../../types/skillTypes';

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
  getSkillState: (employeeId: string, skillName: string) => EmployeeSkillState | undefined;
  initializeEmployeeSkills: (employeeId: string) => void;
}

export const useEmployeeStore = create<EmployeeStore>()(
  persist(
    (set, get) => ({
      employees: defaultEmployees,
      employeeSkills: {
        "123": [
          {
            id: "ai_1",
            title: "Machine Learning",
            subcategory: "AI & ML",
            category: "specialized",
            businessCategory: "Information Technology",
            weight: "critical",
            level: "advanced",
            growth: "35%",
            salary: "$185,000",
            confidence: "high",
            benchmarks: { B: true, R: true, M: true, O: true }
          },
          {
            id: "ai_2",
            title: "Deep Learning",
            subcategory: "AI & ML",
            category: "specialized", 
            businessCategory: "Information Technology",
            weight: "critical",
            level: "intermediate",
            growth: "32%",
            salary: "$180,000",
            confidence: "high",
            benchmarks: { B: true, R: true, M: true, O: true }
          },
          {
            id: "ai_3",
            title: "Natural Language Processing",
            subcategory: "AI Applications",
            category: "specialized",
            businessCategory: "Information Technology",
            weight: "critical",
            level: "advanced",
            growth: "30%",
            salary: "$175,000",
            confidence: "high",
            benchmarks: { B: true, R: true, M: true, O: true }
          },
          {
            id: "ai_4", 
            title: "Computer Vision",
            subcategory: "AI Applications",
            category: "specialized",
            businessCategory: "Information Technology",
            weight: "critical",
            level: "intermediate",
            growth: "28%",
            salary: "$170,000",
            confidence: "high",
            benchmarks: { B: true, R: true, M: true, O: true }
          },
          {
            id: "ai_5",
            title: "TensorFlow",
            subcategory: "ML Frameworks",
            category: "specialized",
            businessCategory: "Information Technology",
            weight: "critical",
            level: "advanced",
            growth: "25%",
            salary: "$165,000",
            confidence: "high",
            benchmarks: { B: true, R: true, M: true, O: true }
          },
          {
            id: "common_1",
            title: "Python",
            subcategory: "Programming Languages",
            category: "common",
            businessCategory: "Information Technology",
            weight: "necessary",
            level: "advanced",
            growth: "20%",
            salary: "$120,000",
            confidence: "high",
            benchmarks: { B: true, R: true, M: true, O: true }
          },
          {
            id: "common_2",
            title: "Problem Solving",
            subcategory: "Soft Skills",
            category: "common",
            businessCategory: "Professional Skills",
            weight: "necessary",
            level: "intermediate",
            growth: "15%",
            salary: "$100,000",
            confidence: "high",
            benchmarks: { B: true, R: true, M: true, O: true }
          },
          {
            id: "cert_1",
            title: "AWS Certified Machine Learning - Specialty",
            subcategory: "Cloud Certification",
            category: "certification",
            businessCategory: "Information Technology",
            weight: "critical",
            level: "advanced",
            growth: "30%",
            salary: "$180,000",
            confidence: "high",
            benchmarks: { B: true, R: true, M: true, O: true }
          }
        ]
      },
      skillStates: {},

      initializeEmployeeSkills: (employeeId: string) => {
        console.log('Initializing skills for employee:', employeeId);
        const store = get();
        
        if (!store.employeeSkills[employeeId]) {
          set((state) => ({
            employeeSkills: {
              ...state.employeeSkills,
              [employeeId]: []
            }
          }));
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
            [employeeId]: skills
          }
        }));
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
              [skillName]: {
                employeeId,
                skillId,
                level,
                requirement
              }
            }
          }
        }));
      },

      getSkillState: (employeeId, skillName) => {
        console.log('Getting skill state:', { employeeId, skillName });
        const state = get();
        return state.skillStates[employeeId]?.[skillName];
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