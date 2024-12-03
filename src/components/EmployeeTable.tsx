import { Employee } from "./types/employeeTypes";
import { useSkillsMatrixStore } from "./benchmark/skills-matrix/SkillsMatrixState";
import { useToggledSkills } from "./skills/context/ToggledSkillsContext";
import { useCompetencyStateReader } from "./skills/competency/CompetencyStateReader";
import { filterEmployeesBySkills } from "./employee/EmployeeSkillsFilter";
import { filterEmployees } from "./employee/EmployeeFilters";
import { sortEmployeesByRoleMatch } from "./employee/EmployeeMatchSorter";
import { useEmployeeTableState } from "./employee/EmployeeTableState";
import { useEmployeeStore } from "./employee/store/employeeStore";
import { ToggledSkillsProvider } from "./skills/context/ToggledSkillsContext";
import { TrackProvider } from "./skills/context/TrackContext";
import { roleSkills } from "./skills/data/roleSkills";
import { calculateEmployeeBenchmarks } from "./employee/table/EmployeeBenchmarkCalculator";
import { EmployeeTableContent } from "./employee/table/EmployeeTableContent";
import React from "react";

interface EmployeeTableProps {
  selectedDepartment?: string[];
  selectedLevel?: string[];
  selectedOffice?: string[];
  selectedEmploymentType?: string[];
  selectedSkills?: string[];
  selectedEmployees?: string[];
  selectedManager?: string[];
  selectedRole?: string[];
}

export const getSkillProfileId = (role?: string) => {
  const validProfileIds = Object.keys(roleSkills);
  if (validProfileIds.includes(role || '')) {
    console.log('Using direct role ID:', role);
    return role;
  }

  const roleMap = Object.entries(roleSkills).reduce((acc, [id, data]) => {
    acc[data.title] = id;
    return acc;
  }, {} as { [key: string]: string });
  
  if (!role) {
    console.warn('No role provided to getSkillProfileId');
    return '';
  }

  const baseRole = role.split(":")[0].trim();
  const mappedId = roleMap[baseRole];
  
  console.log('Role mapping:', { 
    originalRole: role,
    baseRole,
    mappedId
  });
  
  return mappedId || '';
};

export const getBaseRole = (role?: string) => {
  if (!role) return "";
  return role.split(":")[0].trim();
};

const EmployeeTableContent = ({ 
  selectedDepartment = [], 
  selectedLevel = [],
  selectedOffice = [],
  selectedEmploymentType = [],
  selectedSkills = [],
  selectedEmployees = [],
  selectedManager = [],
  selectedRole = []
}: EmployeeTableProps) => {
  const { currentStates } = useSkillsMatrixStore();
  const { toggledSkills } = useToggledSkills();
  const { getSkillCompetencyState } = useCompetencyStateReader();
  const { selectedRows, handleSelectAll, handleSelectEmployee } = useEmployeeTableState();
  
  const employees = useEmployeeStore((state) => {
    console.log('Current employees in store:', state.employees);
    return state.employees;
  });

  // Calculate benchmarks immediately
  const employeesWithBenchmarks = calculateEmployeeBenchmarks(
    employees,
    currentStates,
    toggledSkills,
    getSkillCompetencyState
  );

  const preFilteredEmployees = filterEmployees(
    employeesWithBenchmarks,
    selectedEmployees,
    selectedDepartment,
    selectedLevel,
    selectedOffice,
    selectedEmploymentType,
    selectedSkills,
    selectedManager
  );

  console.log('Pre-filtered employees:', preFilteredEmployees);

  const skillFilteredEmployees = filterEmployeesBySkills(preFilteredEmployees, selectedSkills);

  console.log('Skill filtered employees:', skillFilteredEmployees);

  const filteredEmployees = sortEmployeesByRoleMatch(
    skillFilteredEmployees,
    selectedRole,
    currentStates,
    toggledSkills,
    getSkillCompetencyState
  ).filter(employee => {
    if (selectedRole.length > 0) {
      return (employee.benchmark || 0) > 0;
    }
    return true;
  });

  console.log('Final filtered and sorted employees:', filteredEmployees);

  return (
    <EmployeeTableContent
      filteredEmployees={filteredEmployees}
      selectedRows={selectedRows}
      handleSelectAll={handleSelectAll}
      handleSelectEmployee={handleSelectEmployee}
      selectedSkills={selectedSkills}
      selectedRole={selectedRole}
    />
  );
};

export const EmployeeTable = (props: EmployeeTableProps) => {
  return (
    <TrackProvider>
      <ToggledSkillsProvider>
        <EmployeeTableContent {...props} />
      </ToggledSkillsProvider>
    </TrackProvider>
  );
};
