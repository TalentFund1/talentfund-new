import { useState } from "react";
import { Employee } from "./types/employeeTypes";
import { EmployeeTableHeader } from "./employee/EmployeeTableHeader";
import { EmployeeTableRow } from "./employee/EmployeeTableRow";
import { useSkillsMatrixStore } from "./benchmark/skills-matrix/SkillsMatrixState";
import { useToggledSkills } from "./skills/context/ToggledSkillsContext";
import { useCompetencyStateReader } from "./skills/competency/CompetencyStateReader";
import { calculateBenchmarkPercentage } from "./employee/BenchmarkCalculator";
import { filterEmployeesBySkills } from "./employee/EmployeeSkillsFilter";

const EMPLOYEE_IMAGES = [
  "photo-1488590528505-98d2b5aba04b",
  "photo-1518770660439-4636190af475",
  "photo-1461749280684-dccba630e2f6",
  "photo-1486312338219-ce68d2c6f44d"
];

export const employees: Employee[] = [
  {
    id: "123",
    name: "Victor Smith",
    role: "AI Engineer: P4",
    department: "Engineering",
    skillCount: getEmployeeSkills("123").length,
    benchmark: 0, // Will be calculated dynamically
    lastUpdated: "10/20/24",
    location: "Toronto, ON",
    sex: "male",
    category: "Full-time"
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
    category: "Contract"
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
    category: "Part-time"
  },
  {
    id: "126",
    name: "Suz Manu",
    role: "Engineering Manager: M3",
    department: "Engineering",
    skillCount: getEmployeeSkills("126").length,
    benchmark: 0,
    lastUpdated: "10/20/24",
    location: "Toronto, ON",
    sex: "male",
    category: "Contract"
  }
];

export const getSkillProfileId = (role: string) => {
  const roleMap: { [key: string]: string } = {
    "AI Engineer": "123",
    "Backend Engineer": "124",
    "Frontend Engineer": "125",
    "Engineering Manager": "126"
  };
  
  const baseRole = role.split(":")[0].trim();
  return roleMap[baseRole] || "123"; // Default to AI Engineer if not found
};

// Helper function to get base role without level
export const getBaseRole = (role: string) => {
  return role.split(":")[0].trim();
};

// Helper function to get level from role
export const getLevel = (role: string) => {
  const parts = role.split(":");
  return parts.length > 1 ? parts[1].trim() : "";
};

interface EmployeeTableProps {
  selectedDepartment: string[];
  selectedJobTitle: string[];
  selectedLevel?: string[];
  selectedOffice?: string[];
  selectedEmploymentType?: string[];
  selectedSkills?: string[];
}

export const EmployeeTable = ({ 
  selectedDepartment = [], 
  selectedJobTitle = [],
  selectedLevel = [],
  selectedOffice = [],
  selectedEmploymentType = [],
  selectedSkills = []
}: EmployeeTableProps) => {
  const [selectedEmployees, setSelectedEmployees] = useState<string[]>([]);
  const { currentStates } = useSkillsMatrixStore();
  const { toggledSkills } = useToggledSkills();
  const { getSkillCompetencyState } = useCompetencyStateReader();

  // Calculate benchmark percentages for each employee
  const employeesWithBenchmarks = employees.map(employee => {
    const roleId = getSkillProfileId(employee.role);
    const level = getLevel(employee.role);
    const benchmark = calculateBenchmarkPercentage(
      employee.id,
      roleId,
      level,
      currentStates,
      toggledSkills,
      getSkillCompetencyState
    );
    return { ...employee, benchmark };
  });

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedEmployees(filteredEmployees.map(emp => emp.name));
    } else {
      setSelectedEmployees([]);
    }
  };

  const handleSelectEmployee = (name: string) => {
    setSelectedEmployees(prev => {
      if (prev.includes(name)) {
        return prev.filter(n => n !== name);
      }
      return [...prev, name];
    });
  };

  // Filter employees based on all criteria including skills
  const filteredEmployees = filterEmployeesBySkills(
    employeesWithBenchmarks.filter(employee => {
      const matchesDepartment = selectedDepartment.length === 0 || 
        selectedDepartment.includes(employee.department);
      
      const matchesJobTitle = selectedJobTitle.length === 0 || 
        selectedJobTitle.includes(getBaseRole(employee.role));
      
      const matchesLevel = selectedLevel.length === 0 || 
        selectedLevel.includes(getLevel(employee.role));

      const matchesOffice = selectedOffice.length === 0 || 
        selectedOffice.includes(employee.location.split(',')[0].trim());

      const matchesEmploymentType = selectedEmploymentType.length === 0 ||
        selectedEmploymentType.includes(employee.category);

      return matchesDepartment && matchesJobTitle && matchesLevel && 
             matchesOffice && matchesEmploymentType;
    }),
    selectedSkills
  );

  console.log('Filtered employees with benchmarks:', filteredEmployees);

  return (
    <div className="bg-white rounded-lg">
      <div className="relative">
        <table className="w-full">
          <thead>
            <EmployeeTableHeader 
              onSelectAll={handleSelectAll}
              isAllSelected={filteredEmployees.length > 0 && selectedEmployees.length === filteredEmployees.length}
              hasEmployees={filteredEmployees.length > 0}
            />
          </thead>
          <tbody>
            {filteredEmployees.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-4 text-muted-foreground">
                  No employees found
                </td>
              </tr>
            ) : (
              filteredEmployees.map((employee, index) => (
                <EmployeeTableRow
                  key={employee.id}
                  employee={employee}
                  isSelected={selectedEmployees.includes(employee.name)}
                  onSelect={handleSelectEmployee}
                  imageUrl={`https://images.unsplash.com/${EMPLOYEE_IMAGES[index % EMPLOYEE_IMAGES.length]}?auto=format&fit=crop&w=24&h=24`}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
