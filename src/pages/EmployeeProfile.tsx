import { EmployeeDetails } from "@/components/employee/EmployeeDetails";
import { EmployeeHeader } from "@/components/employee/EmployeeHeader";
import { SkillsSummary } from "@/components/skills/SkillsSummary";
import { SkillStateViewer } from "@/components/skills/SkillStateViewer";
import { Separator } from "@/components/ui/separator";

export default function EmployeeProfile() {
  return (
    <div className="space-y-6">
      <EmployeeHeader />
      <Separator />
      <EmployeeDetails />
      <Separator />
      <SkillStateViewer />
      <Separator />
      <SkillsSummary />
    </div>
  );
}