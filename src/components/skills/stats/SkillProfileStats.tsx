import { StatCard } from "@/components/StatCard";
import { Users, UserPlus, Equal, Clock } from "lucide-react";
import { useEmployeeStore } from "@/components/employee/store/employeeStore";
import { filterEmployees } from "@/components/employee/EmployeeFilters";
import { getSkillProfileId } from "@/components/EmployeeTable";

export const SkillProfileStats = () => {
  const employees = useEmployeeStore((state) => state.employees);
  
  // Filter employees based on role matching
  const filteredEmployees = employees.filter(employee => {
    const employeeRoleId = getSkillProfileId(employee.role);
    return employeeRoleId; // Only include employees with valid role IDs
  });

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

  // Calculate average tenure
  const averageTenure = (() => {
    if (filteredEmployees.length === 0) return 0;
    
    const tenures = filteredEmployees.map(emp => {
      if (!emp.startDate) return 0;
      const start = new Date(emp.startDate);
      const end = new Date();
      const diffTime = Math.abs(end.getTime() - start.getTime());
      const diffYears = diffTime / (1000 * 60 * 60 * 24 * 365.25);
      return diffYears;
    });

    const totalTenure = tenures.reduce((sum, tenure) => sum + tenure, 0);
    return Number((totalTenure / filteredEmployees.length).toFixed(2));
  })();

  console.log('Stats calculation:', {
    totalEmployees: filteredEmployees.length,
    addedLastYear,
    femalePercentage,
    averageTenure,
    employeeRoles: filteredEmployees.map(e => ({
      name: e.name,
      role: e.role,
      roleId: getSkillProfileId(e.role)
    }))
  });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        title="Total Number of Employees"
        value={filteredEmployees.length}
        icon={<Users className="h-6 w-6 text-primary-icon" />}
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