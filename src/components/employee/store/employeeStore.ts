import { create } from "zustand";
import { Employee } from "../../types/employeeTypes";
import { employees as defaultEmployees } from "../EmployeeData";
import { UnifiedSkill } from "../../skills/types/SkillTypes";
import { getSkillByTitle } from "../../skills/data/skills/allSkills";

// Initial employee skills mapping moved here to break circular dependency
const initialEmployeeSkills: { [key: string]: string[] } = {
  "123": [
    "Machine Learning",
    "Deep Learning"
  ],
  "124": [
    "Node.js",
    "Database Design",
    "API Development"
  ],
  "125": [
    "React"
  ],
  "126": [
    "Team Leadership"
  ]
};

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
  initializeEmployeeSkills: (employeeId: string) => void;
}

export const useEmployeeStore = create<EmployeeStore>((set, get) => ({
  employees: defaultEmployees,
  employeeSkills: {},
  skillStates: {},

  initializeEmployeeSkills: (employeeId: string) => {
    console.log('Initializing skills for employee:', employeeId);
    const store = get();
    
    if (!store.employeeSkills[employeeId]) {
      const skillTitles = initialEmployeeSkills[employeeId] || [];
      const skills = skillTitles
        .map(title => getSkillByTitle(title))
        .filter((skill): skill is UnifiedSkill => skill !== undefined);
      
      store.setEmployeeSkills(employeeId, skills);
      
      // Initialize skill states
      skills.forEach(skill => {
        if (!store.skillStates[employeeId]?.[skill.title]) {
          store.setSkillState(employeeId, skill.title, 'unspecified', 'preferred');
        }
      });

      // Update employee skill count
      set((state) => ({
        employees: state.employees.map(emp => 
          emp.id === employeeId 
            ? { ...emp, skillCount: skills.length }
            : emp
        )
      }));

      console.log('Initialized skills for employee:', {
        employeeId,
        skillCount: skills.length,
        skills: skills.map(s => s.title)
      });
    }
  },

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
    // Initialize if not already done
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
    return state.skillStates[employeeId]?.[skillName] || { level: 'unspecified', requirement: 'preferred' };
  }
}));