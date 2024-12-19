import { Employee } from '../types/employeeTypes';
import { ROLE_DEFINITIONS } from '../skills/data/roleSkills';

export const EMPLOYEE_IMAGES = [
  "photo-1488590528505-98d2b5aba04b",
  "photo-1518770660439-4636190af475",
  "photo-1461749280684-dccba630e2f6",
  "photo-1486312338219-ce68d2c6f44d"
];

// Generate initial employee data dynamically
export const generateInitialEmployees = (): Employee[] => {
  const defaultEmployees: Employee[] = [
    {
      id: "123",
      name: generateRandomName(),
      role: `${ROLE_DEFINITIONS["123"].title}: P4`,
      department: "Engineering",
      skillCount: 0,
      benchmark: 0,
      lastUpdated: new Date().toLocaleDateString(),
      location: "Toronto, ON",
      sex: "male" as const,
      category: "Full-time",
      manager: generateRandomName(),
      startDate: "2023-05-15",
      office: "Toronto",
      termDate: "-"
    },
    {
      id: "124",
      name: generateRandomName(),
      role: `${ROLE_DEFINITIONS["124"].title}: P4`,
      department: "Engineering",
      skillCount: 0,
      benchmark: 0,
      lastUpdated: new Date().toLocaleDateString(),
      location: "Toronto, ON",
      sex: "female" as const,
      category: "Contract",
      manager: generateRandomName(),
      startDate: "2024-01-10",
      office: "Toronto",
      termDate: "-"
    },
    {
      id: "125",
      name: generateRandomName(),
      role: `${ROLE_DEFINITIONS["125"].title}: P5`,
      department: "Engineering",
      skillCount: 0,
      benchmark: 0,
      lastUpdated: new Date().toLocaleDateString(),
      location: "Toronto, ON",
      sex: "female" as const,
      category: "Part-time",
      manager: generateRandomName(),
      startDate: "2024-06-01",
      office: "Toronto",
      termDate: "-"
    },
    {
      id: "126",
      name: generateRandomName(),
      role: `${ROLE_DEFINITIONS["126"].title}: M3`,
      department: "Engineering",
      skillCount: 0,
      benchmark: 0,
      lastUpdated: new Date().toLocaleDateString(),
      location: "Toronto, ON",
      sex: "male" as const,
      category: "Contract",
      manager: "",
      startDate: "2022-11-01",
      office: "Toronto",
      termDate: "-"
    }
  ];

  return defaultEmployees;
};

// Helper function to generate random names
function generateRandomName(): string {
  const firstNames = [
    "James", "Mary", "John", "Patricia", "Robert", "Jennifer", "Michael", 
    "Linda", "William", "Elizabeth", "David", "Barbara", "Richard", "Susan", 
    "Joseph", "Jessica", "Thomas", "Sarah", "Charles", "Karen"
  ];
  
  const lastNames = [
    "Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", 
    "Davis", "Rodriguez", "Martinez", "Hernandez", "Lopez", "Gonzalez", 
    "Wilson", "Anderson", "Thomas", "Taylor", "Moore", "Jackson", "Martin"
  ];

  const randomFirst = firstNames[Math.floor(Math.random() * firstNames.length)];
  const randomLast = lastNames[Math.floor(Math.random() * lastNames.length)];

  return `${randomFirst} ${randomLast}`;
}

export const employees = generateInitialEmployees();