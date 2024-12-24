import { Employee } from './employeeTypes';

export interface EmployeeStore {
  employees: Employee[];
  getEmployeeById: (id: string) => Employee | undefined;
}