import { StatCard } from "@/components/StatCard";
import { Users, UserPlus, Equal, Clock } from "lucide-react";

export const SkillProfileStats = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        title="Total number of Profiles"
        value="56"
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