import { create } from 'zustand';
import { Employee } from '../../types/employeeTypes';
import { employees as initialEmployees } from '../EmployeeData';

const STORAGE_KEY = 'employee-store';

interface EmployeeStore {
  employees: Employee[];
  initialized: boolean;
  addEmployee: (employee: Employee) => void;
  updateEmployee: (updatedEmployee: Employee) => void;
  getEmployeeById: (id: string) => Employee | undefined;
  initialize: () => void;
}

const loadFromStorage = (): Employee[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      console.log('Loading employees from localStorage');
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Error loading from localStorage:', error);
  }
  console.log('No stored employees found, using initial data');
  return initialEmployees;
};

const saveToStorage = (employees: Employee[]) => {
  try {
    console.log('Saving employees to localStorage:', employees);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(employees));
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