import { useState } from "react";
import { Employee } from "./types/employeeTypes";
import { EmployeeTableHeader } from "./employee/EmployeeTableHeader";
import { EmployeeTableRow } from "./employee/EmployeeTableRow";
import { useSkillsMatrixStore } from "./benchmark/skills-matrix/SkillsMatrixState";
import { useToggledSkills } from "./skills/context/ToggledSkillsContext";
import { useCompetencyStateReader } from "./skills/competency/CompetencyStateReader";
import { filterEmployeesBySkills } from "./employee/EmployeeSkillsFilter";
import { filterEmployees } from "./employee/EmployeeFilters";
import { sortEmployeesByRoleMatch } from "./employee/EmployeeMatchSorter";
import { useEmployeeTableState } from "./employee/EmployeeTableState";
import { calculateEmployeeBenchmarks } from "./employee/EmployeeBenchmarkCalculator";
import { getEmployeeSkills } from "./benchmark/skills-matrix/initialSkills";
import { StatCard } from "./StatCard";
import { Users, UserPlus, Equal, Clock } from "lucide-react";

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
    benchmark: 0,
    lastUpdated: "10/20/24",
    location: "Toronto, ON",
    sex: "male",
    category: "Full-time",
    manager: "Sus Manu",
    startDate: "2024-01-01"
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
    startDate: "2023-06-15"
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
    startDate: "2023-09-01"
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
    startDate: "2022-11-15"
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
  return roleMap[baseRole] || "123";
};

export const getBaseRole = (role: string) => {
  return role.split(":")[0].trim();
};

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
  selectedEmployees?: string[];
  selectedManager?: string[];
}

export const EmployeeTable = ({ 
  selectedDepartment = [], 
  selectedJobTitle = [],
  selectedLevel = [],
  selectedOffice = [],
  selectedEmploymentType = [],
  selectedSkills = [],
  selectedEmployees = [],
  selectedManager = []
}: EmployeeTableProps) => {
  const { currentStates } = useSkillsMatrixStore();
  const { toggledSkills } = useToggledSkills();
  const { getSkillCompetencyState } = useCompetencyStateReader();
  const { selectedRows, handleSelectAll, handleSelectEmployee } = useEmployeeTableState();

  // Calculate employees added in the past year
  const getEmployeesAddedLastYear = () => {
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
    
    return employees.filter(employee => {
      const startDate = new Date(employee.startDate);
      return startDate >= oneYearAgo;
    }).length;
  };

  // Calculate female percentage
  const calculateFemalePercentage = () => {
    if (employees.length === 0) return 0;
    const femaleCount = employees.filter(emp => emp.sex === 'female').length;
    return Math.round((femaleCount / employees.length) * 100);
  };

  // Calculate average tenure in years
  const calculateAverageTenure = () => {
    if (employees.length === 0) return 0;
    
    const totalTenure = employees.reduce((acc, emp) => {
      const startDate = new Date(emp.startDate);
      const now = new Date();
      const tenureInYears = (now.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24 * 365);
      return acc + tenureInYears;
    }, 0);
    
    return Number((totalTenure / employees.length).toFixed(1));
  };

  // Calculate benchmark percentages for each employee
  const employeesWithBenchmarks = calculateEmployeeBenchmarks(
    employees,
    selectedJobTitle,
    currentStates,
    toggledSkills,
    getSkillCompetencyState
  );

  // Filter employees based on all criteria including skills and employee search
  const preFilteredEmployees = filterEmployees(
    employeesWithBenchmarks,
    selectedEmployees,
    selectedDepartment,
    selectedJobTitle,
    selectedLevel,
    selectedOffice,
    selectedEmploymentType,
    selectedSkills,
    selectedManager
  );

  // Apply skills filter
  const skillFilteredEmployees = filterEmployeesBySkills(preFilteredEmployees, selectedSkills);

  // Sort employees by role match and benchmark percentage
  const filteredEmployees = sortEmployeesByRoleMatch(
    skillFilteredEmployees,
    selectedJobTitle,
    currentStates,
    toggledSkills,
    getSkillCompetencyState
  );

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Number of Employees"
          value={employees.length}
          icon={<Users className="h-6 w-6 text-primary-icon" />}
        />
        <StatCard
          title="Added in Past 1 year"
          value={getEmployeesAddedLastYear()}
          icon={<UserPlus className="h-6 w-6 text-primary-icon" />}
        />
        <StatCard
          title="Share of Female Employees"
          value={`${calculateFemalePercentage()}%`}
          icon={<Equal className="h-6 w-6 text-primary-icon" />}
        />
        <StatCard
          title="Average Tenure (Years)"
          value={calculateAverageTenure()}
          icon={<Clock className="h-6 w-6 text-primary-icon" />}
        />
      </div>

      <div className="bg-white rounded-lg">
        <div className="relative">
          <table className="w-full">
            <thead>
              <EmployeeTableHeader 
                onSelectAll={(e) => handleSelectAll(filteredEmployees, e)}
                isAllSelected={filteredEmployees.length > 0 && selectedRows.length === filteredEmployees.length}
                hasEmployees={filteredEmployees.length > 0}
                hasSelectedSkills={selectedSkills.length > 0}
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
                    isSelected={selectedRows.includes(employee.name)}
                    onSelect={handleSelectEmployee}
                    imageUrl={`https://images.unsplash.com/${EMPLOYEE_IMAGES[index % EMPLOYEE_IMAGES.length]}?auto=format&fit=crop&w=24&h=24`}
                    selectedSkills={selectedSkills}
                    selectedJobTitle={selectedJobTitle}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};