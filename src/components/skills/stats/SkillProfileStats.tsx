import { StatCard } from "@/components/StatCard";
import { Briefcase, UserPlus, Equal, Clock } from "lucide-react";
import { useEmployeeStore } from "@/components/employee/store/employeeStore";
import { filterEmployees } from "@/components/employee/EmployeeFilters";
import { getSkillProfileId } from "@/components/EmployeeTable";
import { useParams } from "react-router-dom";

export const SkillProfileStats = () => {
  const employees = useEmployeeStore((state) => state.employees);
  const { id: selectedRoleId } = useParams<{ id: string }>();
  
  // Filter employees based on role ID if selected, otherwise show all employees
  const filteredEmployees = selectedRoleId 
    ? employees.filter(employee => {
        const employeeRoleId = getSkillProfileId(employee.role);
        return employeeRoleId === selectedRoleId;
      })
    : employees;

  // Calculate employees added in the last year
  const addedLastYear = filteredEmployees.filter(employee => {
    if (!employee.startDate) return false;
    const startDate = new Date(employee.startDate);
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
    return startDate >= oneYearAgo;
  }).length;

  // Calculate female percentage
  const femaleEmployees = filteredEmployees.filter(emp => emp.sex === 'female');
  const femalePercentage = filteredEmployees.length > 0 
    ? Math.round((femaleEmployees.length / filteredEmployees.length) * 100)
    : 0;

  // Calculate average tenure using the exact tenure values from employees
  const averageTenure = (() => {
    if (filteredEmployees.length === 0) return 0;
    
    const tenures = filteredEmployees.map(emp => {
      if (!emp.startDate) return 0;
      const start = new Date(emp.startDate);
      const end = emp.termDate && emp.termDate !== "-" ? new Date(emp.termDate) : new Date();
      const diffTime = Math.abs(end.getTime() - start.getTime());
      const diffYears = diffTime / (1000 * 60 * 60 * 24 * 365.25);
      return Number(diffYears.toFixed(1));
    });

    const totalTenure = tenures.reduce((sum, tenure) => sum + tenure, 0);
    return Number((totalTenure / filteredEmployees.length).toFixed(1));
  })();

  console.log('Stats calculation:', {
    selectedRoleId,
    totalEmployees: filteredEmployees.length,
    addedLastYear,
    femalePercentage,
    averageTenure,
    employeeRoles: filteredEmployees.map(e => ({
      name: e.name,
      role: e.role,
      roleId: getSkillProfileId(e.role),
      tenure: e.startDate ? ((new Date().getTime() - new Date(e.startDate).getTime()) / (1000 * 60 * 60 * 24 * 365.25)).toFixed(1) : 0
    }))
  });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        title="Total Number of Roles"
        value={filteredEmployees.length}
        icon={<Briefcase className="h-6 w-6 text-primary-icon" />}
      />
      <StatCard
        title="Added in Past 1 Year"
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
  );
};