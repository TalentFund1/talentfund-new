export interface EmployeeTableRowProps {
  employee: {
    id: string;
    name: string;
    role: string;
    department: string;
    skillCount: number;
    benchmark: number;
    lastUpdated: string;
    skills: ReadonlyArray<{
      title: string;
      level: string;
    }>;
  };
  isSelected: boolean;
  onSelect: (name: string) => void;
  imageUrl: string;
  selectedSkills: ReadonlyArray<string>;
  selectedJobTitle: ReadonlyArray<string>;
}

export interface EmployeeBasicInfoProps {
  id: string;
  name: string;
  role: string;
  imageUrl: string;
  isExactMatch: boolean;
  selectedJobTitle: ReadonlyArray<string>;
}