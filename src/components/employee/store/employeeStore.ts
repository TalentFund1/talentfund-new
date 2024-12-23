import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Employee } from "../../types/employeeTypes";
import { employees as defaultEmployees } from "../EmployeeData";
import { UnifiedSkill } from "../../skills/types/SkillTypes";
import { roleSkills } from "../../skills/data/roleSkills";
import { getSkillProfileId } from "../../EmployeeTable";

interface EmployeeSkillState {
  level: string;
  requirement: string;
}

interface EmployeeStore {
  employees: Employee[];
  employeeSkills: Record<string, UnifiedSkill[]>;
  skillStates: Record<string, Record<string, EmployeeSkillState>>;
  addEmployee: (employee: Employee) => void;
  updateEmployee: (employee: Employee) => void;
  getEmployeeById: (id: string) => Employee | undefined;
  setEmployeeSkills: (employeeId: string, skills: UnifiedSkill[]) => void;
  getEmployeeSkills: (employeeId: string) => UnifiedSkill[];
  setSkillState: (employeeId: string, skillName: string, level: string, requirement: string) => void;
  getSkillState: (employeeId: string, skillName: string) => EmployeeSkillState;
  initializeEmployeeSkills: (employeeId: string) => void;
}

const getInitialSkillsForRole = (roleId: string): UnifiedSkill[] => {
  const role = roleSkills[roleId as keyof typeof roleSkills];
  if (!role) {
    console.warn('No role found for ID:', roleId);
    return [];
  }

  const allSkills = [
    ...(role.specialized || []),
    ...(role.common || []),
    ...(role.certifications || [])
  ];

  console.log('Initializing skills for role:', {
    roleId,
    skillCount: allSkills.length,
    skills: allSkills.map(s => s.title)
  });

  return allSkills;
};

export const useEmployeeStore = create<EmployeeStore>()(
  persist(
    (set, get) => ({
      employees: defaultEmployees,
      employeeSkills: {},
      skillStates: {},

      initializeEmployeeSkills: (employeeId: string) => {
        console.log('Initializing skills for employee:', employeeId);
        const store = get();
        const employee = store.employees.find(emp => emp.id === employeeId);
        
        if (!employee) {
          console.warn('Employee not found:', employeeId);
          return;
        }

        const roleId = getSkillProfileId(employee.role);
        const initialSkills = getInitialSkillsForRole(roleId);

        if (!store.employeeSkills[employeeId]) {
          store.setEmployeeSkills(employeeId, initialSkills);
          
          // Initialize skill states
          const initialStates: Record<string, EmployeeSkillState> = {};
          initialSkills.forEach(skill => {
            initialStates[skill.title] = {
              level: skill.level || 'beginner',
              requirement: skill.requirement || 'preferred'
            };
          });

          set(state => ({
            skillStates: {
              ...state.skillStates,
              [employeeId]: initialStates
            }
          }));

          console.log('Initialized skills for employee:', {
            employeeId,
            skillCount: initialSkills.length,
            states: initialStates
          });
        }
      },

      addEmployee: (employee) => {
        console.log('Adding employee to store:', employee);
        set((state) => {
          const newEmployees = [...state.employees, employee];
          return { employees: newEmployees };
        });
      },

      updateEmployee: (employee) => {
        console.log('Updating employee in store:', employee);
        set((state) => {
          const updatedEmployees = state.employees.map((emp) => 
            emp.id === employee.id ? { ...employee } : emp
          );
          return { 
            employees: updatedEmployees,
            skillStates: {
              ...state.skillStates,
              [employee.id]: state.skillStates[employee.id] || {}
            }
          };
        });
      },

      getEmployeeById: (id) => {
        const state = get();
        return state.employees.find(emp => emp.id === id);
      },

      setEmployeeSkills: (employeeId, skills) => {
        console.log('Setting skills for employee:', { employeeId, skills });
        set((state) => ({
          employeeSkills: {
            ...state.employeeSkills,
            [employeeId]: skills
          }
        }));
      },

      getEmployeeSkills: (employeeId) => {
        const state = get();
        if (!state.employeeSkills[employeeId]) {
          state.initializeEmployeeSkills(employeeId);
        }
        return state.employeeSkills[employeeId] || [];
      },

      setSkillState: (employeeId, skillName, level, requirement) => {
        console.log('Setting skill state:', { employeeId, skillName, level, requirement });
        set((state) => ({
          skillStates: {
            ...state.skillStates,
            [employeeId]: {
              ...state.skillStates[employeeId],
              [skillName]: { level, requirement }
            }
          }
        }));
      },

      getSkillState: (employeeId, skillName) => {
        const state = get();
        return state.skillStates[employeeId]?.[skillName] || { level: 'beginner', requirement: 'preferred' };
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