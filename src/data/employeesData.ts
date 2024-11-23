export interface Employee {
  id: string;
  name: string;
  role: string;
  department: string;
  skillCount: number;
  benchmark: number;
  lastUpdated: string;
  location: string;
  sex: 'male' | 'female';
}

export const employees: Employee[] = [
  {
    id: "123",
    name: "Victor Smith",
    role: "AI Engineer: P4",
    department: "Engineering",
    skillCount: 16,
    benchmark: 89,
    lastUpdated: "10/20/24",
    location: "Toronto, ON",
    sex: "male"
  },
  {
    id: "124",
    name: "Jennie Richards",
    role: "Backend Engineer: P4",
    department: "Engineering",
    skillCount: 12,
    benchmark: 85,
    lastUpdated: "10/20/24",
    location: "Toronto, ON",
    sex: "female"
  },
  {
    id: "125",
    name: "Anna Vyselva",
    role: "Frontend Developer: P4",
    department: "Engineering",
    skillCount: 17,
    benchmark: 74,
    lastUpdated: "10/20/24",
    location: "Toronto, ON",
    sex: "female"
  },
  {
    id: "126",
    name: "Suz Manu",
    role: "Engineering Manager: M3",
    department: "Engineering",
    skillCount: 11,
    benchmark: 68,
    lastUpdated: "10/20/24",
    location: "Toronto, ON",
    sex: "male"
  }
];