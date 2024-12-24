import { Employee } from '../../../types/employeeTypes';

export interface EmployeeStore {
  employees: Employee[];
  getEmployeeById: (id: string) => Employee | undefined;
}