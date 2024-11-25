import { create } from "zustand";
import { Employee } from "../../types/employeeTypes";
import { employees as defaultEmployees } from "../EmployeeData";

interface EmployeeStore {
  employees: Employee[];
  addEmployee: (employee: Employee) => void;
}

export const useEmployeeStore = create<EmployeeStore>((set) => ({
  employees: defaultEmployees,
  addEmployee: (employee) => {
    console.log('Adding employee to store:', employee);
    set((state) => {
      const newEmployees = [...state.employees, employee];
      console.log('Updated employees list:', newEmployees);
      return { employees: newEmployees };
    });
  },
}));