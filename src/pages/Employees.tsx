import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatCard } from "@/components/StatCard";
import { Users, UserPlus, Equal, Clock } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Sidebar } from "@/components/Sidebar";
import { EmployeeFilters } from "@/components/EmployeeFilters";
import { EmployeeTable } from "@/components/EmployeeTable";
import { TablePagination } from "@/components/TablePagination";
import { useState, useEffect } from "react";
import { filterEmployees } from "@/components/employee/EmployeeFilters";
import { filterEmployeesBySkills } from "@/components/employee/EmployeeSkillsFilter";
import { AddEmployeeDialog } from "@/components/employee/AddEmployeeDialog";
import { useEmployeeStore } from "@/components/employee/store/employeeStore";
import { ToggledSkillsProvider } from "@/components/skills/context/ToggledSkillsContext";
import { getSkillProfileId, getBaseRole } from "@/components/EmployeeTable";
import { useSearchParams, useNavigate } from "react-router-dom";

const Employees = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  // Initialize state from URL parameters
  const [selectedDepartment, setSelectedDepartment] = useState<string[]>(
    searchParams.get('department')?.split(',').filter(Boolean) || []
  );
  const [selectedLevel, setSelectedLevel] = useState<string[]>(
    searchParams.get('level')?.split(',').filter(Boolean) || []
  );
  const [selectedOffice, setSelectedOffice] = useState<string[]>(
    searchParams.get('office')?.split(',').filter(Boolean) || []
  );
  const [selectedEmploymentType, setSelectedEmploymentType] = useState<string[]>(
    searchParams.get('employmentType')?.split(',').filter(Boolean) || []
  );
  const [selectedSkills, setSelectedSkills] = useState<string[]>(
    searchParams.get('skills')?.split(',').filter(Boolean) || []
  );
  const [selectedEmployees, setSelectedEmployees] = useState<string[]>(
    searchParams.get('employees')?.split(',').filter(Boolean) || []
  );
  const [selectedManager, setSelectedManager] = useState<string[]>(
    searchParams.get('manager')?.split(',').filter(Boolean) || []
  );
  const [selectedRole, setSelectedRole] = useState<string[]>(
    searchParams.get('role')?.split(',').filter(Boolean) || []
  );
  
  const employees = useEmployeeStore((state) => state.employees);

  // Update URL parameters when filters change
  useEffect(() => {
    const params = new URLSearchParams();

    if (selectedDepartment.length) params.set('department', selectedDepartment.join(','));
    if (selectedLevel.length) params.set('level', selectedLevel.join(','));
    if (selectedOffice.length) params.set('office', selectedOffice.join(','));
    if (selectedEmploymentType.length) params.set('employmentType', selectedEmploymentType.join(','));
    if (selectedSkills.length) params.set('skills', selectedSkills.join(','));
    if (selectedEmployees.length) params.set('employees', selectedEmployees.join(','));
    if (selectedManager.length) params.set('manager', selectedManager.join(','));
    if (selectedRole.length) params.set('role', selectedRole.join(','));

    setSearchParams(params);
  }, [
    selectedDepartment,
    selectedLevel,
    selectedOffice,
    selectedEmploymentType,
    selectedSkills,
    selectedEmployees,
    selectedManager,
    selectedRole,
    setSearchParams
  ]);

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

  console.log('Filtered employees with URL params:', {
    filters: {
      department: selectedDepartment,
      level: selectedLevel,
      office: selectedOffice,
      employmentType: selectedEmploymentType,
      skills: selectedSkills,
      employees: selectedEmployees,
      manager: selectedManager,
      role: selectedRole
    },
    totalMatches: exactMatchEmployees.length
  });

  const totalEmployees = exactMatchEmployees.length;

  const calculateFemalePercentage = () => {
    if (exactMatchEmployees.length === 0) return 0;
    const femaleCount = exactMatchEmployees.filter(emp => emp.sex === 'female').length;
    return Math.round((femaleCount / exactMatchEmployees.length) * 100);
  };

  // Calculate average tenure for filtered employees
  const calculateAverageTenure = (employeeList: any[]) => {
    if (employeeList.length === 0) return 0;

    const tenures = employeeList.map(emp => {
      if (!emp.startDate) return 0;
      const start = new Date(emp.startDate);
      const end = emp.termDate && emp.termDate !== "-" ? new Date(emp.termDate) : new Date();
      if (isNaN(start.getTime())) return 0;
      const diffTime = Math.abs(end.getTime() - start.getTime());
      const diffYears = diffTime / (1000 * 60 * 60 * 24 * 365.25);
      return diffYears;
    });

    const totalTenure = tenures.reduce((sum, tenure) => sum + tenure, 0);
    return Number((totalTenure / employeeList.length).toFixed(1));
  };

  const averageTenure = calculateAverageTenure(exactMatchEmployees);

  // Calculate employees added in the last year based on filtered results
  const calculateAddedLastYear = () => {
    const today = new Date();
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(today.getFullYear() - 1);
    
    return exactMatchEmployees.filter(employee => {
      if (!employee.startDate) return false;
      const startDate = new Date(employee.startDate);
      return startDate >= oneYearAgo;
    }).length;
  };

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

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard
                title="Total Number of Employees"
                value={totalEmployees}
                icon={<Users className="h-6 w-6 text-primary-icon" />}
              />
              <StatCard
                title="Added in Past 1 year"
                value={calculateAddedLastYear()}
                icon={<UserPlus className="h-6 w-6 text-primary-icon" />}
              />
              <StatCard
                title="Share of Female Employees"
                value={`${calculateFemalePercentage()}%`}
                icon={<Equal className="h-6 w-6 text-primary-icon" />}
              />
              <StatCard
                title="Average Tenure (Years)"
                value={averageTenure}
                icon={<Clock className="h-6 w-6 text-primary-icon" />}
              />
            </div>

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