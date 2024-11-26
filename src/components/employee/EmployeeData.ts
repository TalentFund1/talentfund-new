import { Employee } from "../types/employeeTypes";
import { getEmployeeSkills } from "../benchmark/skills-matrix/initialSkills";

export const EMPLOYEE_IMAGES = [
  "photo-1488590528505-98d2b5aba04b",
  "photo-1518770660439-4636190af475",
  "photo-1461749280684-dccba630e2f6",
  "photo-1486312338219-ce68d2c6f44d",
  "photo-1573496359142-b8d87734a5a2"  // Added new image for Maria
];

export const employees: Employee[] = [
  {
    id: "123",
    name: "Victor Smith",
    role: "AI Engineer: P4",
    department: "Engineering",
    skillCount: getEmployeeSkills("123").length,
    benchmark: 0,
    lastUpdated: "10/20/24",
    location: "Toronto, ON",
    sex: "male",
    category: "Full-time",
    manager: "Sus Manu",
    startDate: "2023-05-15",
    office: "Toronto",
    termDate: "-",
    image: EMPLOYEE_IMAGES[0]
  },
  {
    id: "124",
    name: "Jennie Richards",
    role: "Backend Engineer: P4",
    department: "Engineering",
    skillCount: getEmployeeSkills("124").length,
    benchmark: 0,
    lastUpdated: "10/20/24",
    location: "Toronto, ON",
    sex: "female",
    category: "Contract",
    manager: "Sus Manu",
    startDate: "2024-01-10",
    office: "Toronto",
    termDate: "-",
    image: EMPLOYEE_IMAGES[1]
  },
  {
    id: "125",
    name: "Anna Vyselva",
    role: "Frontend Engineer: P5",
    department: "Engineering",
    skillCount: getEmployeeSkills("125").length,
    benchmark: 0,
    lastUpdated: "10/20/24",
    location: "Toronto, ON",
    sex: "female",
    category: "Part-time",
    manager: "Sus Manu",
    startDate: "2024-06-01",
    office: "Toronto",
    termDate: "-",
    image: EMPLOYEE_IMAGES[2]
  },
  {
    id: "126",
    name: "Sus Manu",
    role: "Engineering Manager: M3",
    department: "Engineering",
    skillCount: getEmployeeSkills("126").length,
    benchmark: 0,
    lastUpdated: "10/20/24",
    location: "Toronto, ON",
    sex: "male",
    category: "Contract",
    manager: "Sarah Chen",
    startDate: "2022-11-01",
    office: "Toronto",
    termDate: "-",
    image: EMPLOYEE_IMAGES[3]
  },
  {
    id: "130",
    name: "Maria Chen",
    role: "AI Engineer: P5",
    department: "Engineering",
    skillCount: getEmployeeSkills("130").length,
    benchmark: 0,
    lastUpdated: "10/20/24",
    location: "Toronto, ON",
    sex: "female",
    category: "Full-time",
    manager: "Sus Manu",
    startDate: "2023-08-15",
    office: "Toronto",
    termDate: "-",
    image: EMPLOYEE_IMAGES[4]
  }
];