import { create } from 'zustand';
import { Employee } from '../../types/employeeTypes';
import { employees as initialEmployees } from '../EmployeeData';

interface EmployeeStore {
  employees: Employee[];
  addEmployee: (employee: Employee) => void;
  updateEmployee: (updatedEmployee: Employee) => void;
}

export const useEmployeeStore = create<EmployeeStore>((set) => ({
  // Initialize with data immediately
  employees: initialEmployees,
  
  addEmployee: (employee) => {
    console.log('Adding employee to store:', employee);
    set((state) => ({
      employees: [...state.employees, employee]
    }));
  },
  
  updateEmployee: (updatedEmployee) => {
    console.log('Updating employee in store:', updatedEmployee);
    set((state) => ({
      employees: state.employees.map(emp => 
        emp.id === updatedEmployee.id ? updatedEmployee : emp
      )
    }));
  }
}));