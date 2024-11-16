import { SkillsSummary } from "@/components/skills/SkillsSummary";
import { EmployeeHeader } from "@/components/employee/EmployeeHeader";
import { EmployeeDetails } from "@/components/employee/EmployeeDetails";
import { CurrentSkillsDisplay } from "@/components/skills/CurrentSkillsDisplay";

export const EmployeeProfile = () => {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <EmployeeHeader />
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        <EmployeeDetails />
        <CurrentSkillsDisplay />
      </div>
      <SkillsSummary />
    </div>
  );
};