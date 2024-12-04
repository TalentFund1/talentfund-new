import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Sidebar } from "@/components/Sidebar";
import { EmployeeFilters } from "@/components/EmployeeFilters";
import { EmployeeTable } from "@/components/EmployeeTable";
import { TablePagination } from "@/components/TablePagination";
import { filterEmployees } from "@/components/employee/EmployeeFilters";
import { filterEmployeesBySkills } from "@/components/employee/EmployeeSkillsFilter";
import { AddEmployeeDialog } from "@/components/employee/AddEmployeeDialog";
import { useEmployeeStore } from "@/components/employee/store/employeeStore";
import { ToggledSkillsProvider } from "@/components/skills/context/ToggledSkillsContext";
import { getSkillProfileId } from "@/components/EmployeeTable";
import { useEmployeeFilters } from "@/components/employee/hooks/useEmployeeFilters";
import { EmployeeStats } from "@/components/employee/EmployeeStats";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { employees as initialEmployees } from "@/components/employee/EmployeeData";

const Employees = () => {
  const [searchParams] = useSearchParams();
  const [isInitialized, setIsInitialized] = useState(false);
  const {
    selectedDepartment,
    setSelectedDepartment,
    selectedLevel,
    setSelectedLevel,
    selectedOffice,
    setSelectedOffice,
    selectedEmploymentType,
    setSelectedEmploymentType,
    selectedSkills,
    setSelectedSkills,
    selectedEmployees,
    setSelectedEmployees,
    selectedManager,
    setSelectedManager,
    selectedRole,
    setSelectedRole
  } = useEmployeeFilters();

  const [isLoading, setIsLoading] = useState(true);
  const employees = useEmployeeStore((state) => state.employees);
  const addEmployee = useEmployeeStore((state) => state.addEmployee);

  // Initialize employee data on component mount
  useEffect(() => {
    console.log('Initializing employee data on component mount');
    if (employees.length === 0) {
      initialEmployees.forEach(employee => {
        console.log('Adding employee:', employee.name);
        addEmployee(employee);
      });
    }
    setIsLoading(false);
    setIsInitialized(true);
  }, []);

  // Get filtered employees
  const preFilteredEmployees = filterEmployees(
    employees,
    selectedEmployees,
    selectedDepartment,
    selectedLevel,
    selectedOffice,
    selectedEmploymentType,
    selectedSkills,
    selectedManager
  );

  // Apply skills filter
  const filteredEmployees = filterEmployeesBySkills(preFilteredEmployees, selectedSkills);

  // Get exact role matches
  const exactMatchEmployees = selectedRole.length > 0 
    ? filteredEmployees.filter(emp => {
        const employeeRoleId = getSkillProfileId(emp.role);
        const selectedRoleId = getSkillProfileId(selectedRole[0]);
        return employeeRoleId === selectedRoleId;
      })
    : filteredEmployees;

  console.log('Current employee state:', {
    isLoading,
    isInitialized,
    totalEmployees: employees.length,
    filteredCount: exactMatchEmployees.length,
    filters: {
      department: selectedDepartment,
      level: selectedLevel,
      office: selectedOffice,
      employmentType: selectedEmploymentType,
      skills: selectedSkills,
      employees: selectedEmployees,
      manager: selectedManager,
      role: selectedRole
    }
  });

  if (isLoading) {
    return (
      <div className="flex min-h-screen bg-background">
        <Sidebar />
        <div className="flex-1 p-6 ml-16 transition-all duration-300">
          <div className="max-w-7xl mx-auto space-y-6 bg-white rounded-lg p-6 shadow-sm">
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <ToggledSkillsProvider>
        <div className="flex-1 p-6 ml-16 transition-all duration-300">
          <div className="max-w-7xl mx-auto space-y-6 bg-white rounded-lg p-6 shadow-sm">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold text-foreground">Employees</h1>
              <div className="space-x-2">
                <Button variant="outline">Export Data</Button>
                <AddEmployeeDialog />
              </div>
            </div>

            <Card className="p-6">
              <EmployeeFilters 
                onDepartmentChange={setSelectedDepartment}
                selectedDepartment={selectedDepartment}
                onLevelChange={setSelectedLevel}
                selectedLevel={selectedLevel}
                onOfficeChange={setSelectedOffice}
                selectedOffice={selectedOffice}
                onEmploymentTypeChange={setSelectedEmploymentType}
                selectedEmploymentType={selectedEmploymentType}
                onSkillsChange={setSelectedSkills}
                selectedSkills={selectedSkills}
                onEmployeeSearch={setSelectedEmployees}
                selectedEmployees={selectedEmployees}
                onManagerChange={setSelectedManager}
                selectedManager={selectedManager}
                onRoleChange={setSelectedRole}
                selectedRole={selectedRole}
              />
            </Card>

            <EmployeeStats filteredEmployees={exactMatchEmployees} />

            <Card className="p-6">
              <EmployeeTable 
                selectedDepartment={selectedDepartment}
                selectedLevel={selectedLevel}
                selectedOffice={selectedOffice}
                selectedEmploymentType={selectedEmploymentType}
                selectedSkills={selectedSkills}
                selectedEmployees={selectedEmployees}
                selectedManager={selectedManager}
                selectedRole={selectedRole}
              />
              <Separator className="my-4" />
              <TablePagination />
            </Card>
          </div>
        </div>
      </ToggledSkillsProvider>
    </div>
  );
};

export default Employees;