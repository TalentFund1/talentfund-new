import { StatCard } from "@/components/StatCard";
import { Users, UserPlus, Equal, Clock } from "lucide-react";
import { useEmployeeStore } from "@/components/employee/store/employeeStore";

export const SkillProfileStats = () => {
  const employees = useEmployeeStore((state) => state.employees);
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        title="Total Number of Employees"
        value={employees.length}
        icon={<Users className="h-6 w-6 text-primary-icon" />}
      />
      <StatCard
        title="Added in Past 1 Year"
        value="2"
        icon={<UserPlus className="h-6 w-6 text-primary-icon" />}
      />
      <StatCard
        title="Share of Female Employees"
        value="50%"
        icon={<Equal className="h-6 w-6 text-primary-icon" />}
      />
      <StatCard
        title="Average Tenure (Years)"
        value="1.09"
        icon={<Clock className="h-6 w-6 text-primary-icon" />}
      />
    </div>
  );
};