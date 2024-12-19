import { create } from "zustand";
import { Employee } from "../../types/employeeTypes";
import { employees as defaultEmployees } from "../EmployeeData";
import { UnifiedSkill } from "../../skills/types/SkillTypes";

interface EmployeeSkillState {
  level: string;
  requirement: string;
}

interface EmployeeStore {
  employees: Employee[];
  employeeSkills: Record<string, UnifiedSkill[]>;
  skillStates: Record<string, Record<string, EmployeeSkillState>>;
  addEmployee: (employee: Employee) => void;
  getEmployeeById: (id: string) => Employee | undefined;
  setEmployeeSkills: (employeeId: string, skills: UnifiedSkill[]) => void;
  getEmployeeSkills: (employeeId: string) => UnifiedSkill[];
  setSkillState: (employeeId: string, skillName: string, level: string, requirement: string) => void;
  getSkillState: (employeeId: string, skillName: string) => EmployeeSkillState;
}

export const useEmployeeStore = create<EmployeeStore>((set, get) => ({
  employees: defaultEmployees,
  employeeSkills: {},
  skillStates: {},

  addEmployee: (employee) => {
    console.log('Adding employee to store:', employee);
    set((state) => {
      const newEmployees = [...state.employees, employee];
      console.log('Updated employees list:', newEmployees);
      return { employees: newEmployees };
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
    return state.skillStates[employeeId]?.[skillName] || { level: 'unspecified', requirement: 'preferred' };
  }
}));