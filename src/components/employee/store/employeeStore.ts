import { create } from "zustand";
import { Employee } from "../../types/employeeTypes";
import { employees as defaultEmployees } from "../EmployeeData";

interface EmployeeStore {
  employees: Employee[];
  addEmployee: (employee: Employee) => void;
  getEmployeeById: (id: string) => Employee | undefined;
  updateEmployeeSkills: (id: string, skills: string[]) => void;
}

export const useEmployeeStore = create<EmployeeStore>((set, get) => ({
  employees: defaultEmployees,
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
  updateEmployeeSkills: (id, skills) => {
    console.log('Updating skills for employee:', id, skills);
    set((state) => {
      const updatedEmployees = state.employees.map(emp => {
        if (emp.id === id) {
          return {
            ...emp,
            skillCount: skills.length,
            lastUpdated: new Date().toLocaleDateString()
          };
        }
        return emp;
      });
      return { employees: updatedEmployees };
    });
  }
}));

// Initialize skills for employee 130
const specializedSkills = [
  "Programming Proficiency",
  "Machine Learning",
  "Data Structures & Algorithms",
  "Statistical Analysis",
  "AI Model Deployment",
  "Big Data Handling",
  "Deep Learning",
  "Natural Language Processing (NLP)",
  "Computer Vision",
  "AI Optimization",
  "Reinforcement Learning",
  "Edge AI",
  "AI Ethics",
  "Explainable AI",
  "AI Security",
  "Cloud AI Services"
];

const commonSkills = [
  "Problem Solving",
  "API Development",
  "Collaboration",
  "Version Control"
];

const certificationSkills = [
  "Certified Machine Learning Specialist",
  "TensorFlow Developer Certification",
  "Google Professional Data Engineer",
  "Microsoft Certified: Azure AI Engineer Associate",
  "Certified Ethical AI Engineer"
];

// Initialize the skills for employee 130
const employee130 = useEmployeeStore.getState().getEmployeeById("130");
if (employee130) {
  useEmployeeStore.getState().updateEmployeeSkills("130", [
    ...specializedSkills,
    ...commonSkills,
    ...certificationSkills
  ]);
}