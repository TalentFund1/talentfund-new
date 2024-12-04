import { StatCard } from "@/components/StatCard";
import { Users, UserPlus, Equal, Clock } from "lucide-react";
import { Employee } from "../types/employeeTypes";

interface EmployeeStatsProps {
  filteredEmployees: Employee[];
}

export const EmployeeStats = ({ filteredEmployees }: EmployeeStatsProps) => {
  const calculateFemalePercentage = () => {
    if (filteredEmployees.length === 0) return 0;
    const femaleCount = filteredEmployees.filter(emp => emp.sex === 'female').length;
    return Math.round((femaleCount / filteredEmployees.length) * 100);
  };

  const calculateAverageTenure = () => {
    if (filteredEmployees.length === 0) return 0;

    const tenures = filteredEmployees.map(emp => {
      if (!emp.startDate) return 0;
      const start = new Date(emp.startDate);
      const end = emp.termDate && emp.termDate !== "-" ? new Date(emp.termDate) : new Date();
      if (isNaN(start.getTime())) return 0;
      const diffTime = Math.abs(end.getTime() - start.getTime());
      const diffYears = diffTime / (1000 * 60 * 60 * 24 * 365.25);
      return diffYears;
    });

    const totalTenure = tenures.reduce((sum, tenure) => sum + tenure, 0);
    return Number((totalTenure / filteredEmployees.length).toFixed(1));
  };

  const calculateAddedLastYear = () => {
    const today = new Date();
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(today.getFullYear() - 1);
    
    return filteredEmployees.filter(employee => {
      if (!employee.startDate) return false;
      const startDate = new Date(employee.startDate);
      return startDate >= oneYearAgo;
    }).length;
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        title="Total Number of Employees"
        value={filteredEmployees.length}
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
        value={calculateAverageTenure()}
        icon={<Clock className="h-6 w-6 text-primary-icon" />}
      />
    </div>
  );
};