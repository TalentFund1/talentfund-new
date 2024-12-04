import { create } from 'zustand';
import { Employee } from '../../types/employeeTypes';
import { employees as initialEmployees } from '../EmployeeData';
import { calculateBenchmarkPercentage } from '../BenchmarkCalculator';
import { getSkillProfileId } from '../../EmployeeTable';

const STORAGE_KEY = 'employee-store';
const ROLES_STORAGE_KEY = 'employee-roles';

interface EmployeeStore {
  employees: Employee[];
  initialized: boolean;
  addEmployee: (employee: Employee) => void;
  updateEmployee: (updatedEmployee: Employee) => void;
  getEmployeeById: (id: string) => Employee | undefined;
  initialize: () => void;
}

const initializeBenchmarks = (employees: Employee[]) => {
  console.log('Initializing benchmarks for employees');
  return employees.map(employee => {
    const roleId = getSkillProfileId(employee.role);
    if (!roleId) {
      console.log(`No role ID found for employee ${employee.id}`);
      return employee;
    }

    // Initialize with 0 benchmark, it will be calculated properly when needed
    return {
      ...employee,
      benchmark: 0
    };
  });
};

const loadFromStorage = (): Employee[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    const storedRoles = localStorage.getItem(ROLES_STORAGE_KEY);
    
    if (stored) {
      console.log('Loading employees from localStorage');
      const employees = JSON.parse(stored);
      
      if (storedRoles) {
        console.log('Loading roles from localStorage');
        const roles = JSON.parse(storedRoles);
        employees.forEach((emp: Employee) => {
          if (roles[emp.id]) {
            emp.role = roles[emp.id];
          }
        });
      }
      
      return initializeBenchmarks(employees);
    }
  } catch (error) {
    console.error('Error loading from localStorage:', error);
  }
  console.log('No stored employees found, initializing with default data');
  return initializeBenchmarks(initialEmployees);
};

const saveToStorage = (employees: Employee[]) => {
  try {
    console.log('Saving employees to localStorage:', employees);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(employees));
    
    // Save roles separately
    const roles = employees.reduce((acc, emp) => ({
      ...acc,
      [emp.id]: emp.role
    }), {});
    
    console.log('Saving roles to localStorage:', roles);
    localStorage.setItem(ROLES_STORAGE_KEY, JSON.stringify(roles));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

export const useEmployeeStore = create<EmployeeStore>((set, get) => ({
  employees: loadFromStorage(),
  initialized: true,
  
  initialize: () => {
    console.log('Initializing employee store');
    const storedEmployees = loadFromStorage();
    set({ 
      employees: storedEmployees,
      initialized: true 
    });
    saveToStorage(storedEmployees);
  },
  
  addEmployee: (employee) => {
    console.log('Adding employee to store:', employee);
    set((state) => {
      const newEmployees = [...state.employees, employee];
      saveToStorage(newEmployees);
      return { employees: newEmployees };
    });
  },
  
  updateEmployee: (updatedEmployee) => {
    console.log('Updating employee in store:', updatedEmployee);
    set((state) => {
      const newEmployees = state.employees.map(emp => 
        emp.id === updatedEmployee.id ? updatedEmployee : emp
      );
      saveToStorage(newEmployees);
      return { employees: newEmployees };
    });
  },

  getEmployeeById: (id) => {
    console.log('Getting employee by ID:', id);
    const state = get();
    const employee = state.employees.find(emp => emp.id === id);
    console.log('Found employee:', employee);
    return employee;
  }
}));

// Initialize the store immediately
useEmployeeStore.getState().initialize();