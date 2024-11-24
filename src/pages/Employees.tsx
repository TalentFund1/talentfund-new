import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatCard } from "@/components/StatCard";
import { Users, UserPlus, Equal, Clock } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Sidebar } from "@/components/Sidebar";
import { EmployeeFilters } from "@/components/EmployeeFilters";
import { EmployeeTable, employees, getBaseRole } from "@/components/EmployeeTable";
import { TablePagination } from "@/components/TablePagination";
import { useState } from "react";
import { filterEmployees } from "@/components/employee/EmployeeFilters";
import { getEmployeesAddedLastYear } from "@/components/employee/EmployeeUtils";
import { filterEmployeesBySkills } from "@/components/employee/EmployeeSkillsFilter";

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

const Employees = () => {
  const [selectedDepartment, setSelectedDepartment] = useState<string[]>([]);
  const [selectedJobTitle, setSelectedJobTitle] = useState<string[]>([]);
  const [selectedLevel, setSelectedLevel] = useState<string[]>([]);
  const [selectedOffice, setSelectedOffice] = useState<string[]>([]);
  const [selectedEmploymentType, setSelectedEmploymentType] = useState<string[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedEmployees, setSelectedEmployees] = useState<string[]>([]);
  const [selectedManager, setSelectedManager] = useState<string[]>([]);

  // Get filtered employees based on all criteria
  const filteredEmployees = filterEmployees(
    employees,
    selectedEmployees,
    selectedDepartment,
    selectedJobTitle,
    selectedLevel,
    selectedOffice,
    selectedEmploymentType,
    selectedSkills,
    selectedManager
  );

  // Apply skills filter to get exact matches
  const skillFilteredEmployees = filterEmployeesBySkills(filteredEmployees, selectedSkills);

  // Get relevant employees based on job title and skills
  const relevantEmployees = selectedJobTitle.length > 0
    ? skillFilteredEmployees.filter(emp => getBaseRole(emp.role) === selectedJobTitle[0])
    : skillFilteredEmployees;

  console.log('Calculating stats for employees:', {
    totalFiltered: filteredEmployees.length,
    skillFiltered: skillFilteredEmployees.length,
    relevantCount: relevantEmployees.length,
    jobTitleFilter: selectedJobTitle,
    skillsFilter: selectedSkills,
    employeeDetails: relevantEmployees.map(emp => ({
      name: emp.name,
      role: emp.role,
      startDate: emp.startDate,
      sex: emp.sex
    }))
  });

  // Calculate stats using the relevant employees list
  const totalEmployees = relevantEmployees.length;
  const addedLastYear = getEmployeesAddedLastYear(relevantEmployees);

  // Calculate female percentage from the relevant employees
  const calculateFemalePercentage = () => {
    if (relevantEmployees.length === 0) return 0;
    const femaleCount = relevantEmployees.filter(emp => emp.sex === 'female').length;
    return Math.round((femaleCount / relevantEmployees.length) * 100);
  };

  const femalePercentage = calculateFemalePercentage();
  const averageTenure = calculateAverageTenure(relevantEmployees);

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 p-6 ml-16 transition-all duration-300">
        <div className="max-w-7xl mx-auto space-y-6 bg-white rounded-lg p-6 shadow-sm">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-foreground">Employees</h1>
            <div className="space-x-2">
              <Button variant="outline">Export Data</Button>
              <Button>Add Employee</Button>
            </div>
          </div>

          <Card className="p-6">
            <EmployeeFilters 
              onDepartmentChange={setSelectedDepartment}
              selectedDepartment={selectedDepartment}
              onJobTitleChange={setSelectedJobTitle}
              selectedJobTitle={selectedJobTitle}
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
              value={addedLastYear}
              icon={<UserPlus className="h-6 w-6 text-primary-icon" />}
            />
            <StatCard
              title="Share of Female Employees"
              value={`${femalePercentage}%`}
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
              selectedJobTitle={selectedJobTitle}
              selectedLevel={selectedLevel}
              selectedOffice={selectedOffice}
              selectedEmploymentType={selectedEmploymentType}
              selectedSkills={selectedSkills}
              selectedEmployees={selectedEmployees}
              selectedManager={selectedManager}
            />
            <Separator className="my-4" />
            <TablePagination />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Employees;
