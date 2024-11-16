import { EmployeeDetails } from "@/components/employee/EmployeeDetails";
import { EmployeeHeader } from "@/components/employee/EmployeeHeader";
import { SkillsSummary } from "@/components/skills/SkillsSummary";
import { SkillStateViewer } from "@/components/skills/SkillStateViewer";
import { Separator } from "@/components/ui/separator";
import { useParams } from "react-router-dom";

export default function EmployeeProfile() {
  const { id = "123" } = useParams();

  const employee = {
    name: "Victor Smith",
    role: "AI Engineer: P4",
    location: "Toronto, ON",
    image: "photo-1488590528505-98d2b5aba04b",
    department: "Engineering",
    office: "HQ",
    category: "Full-time",
    manager: "Jane Cooper",
    startDate: "2021-01-15",
    termDate: "-",
    tenure: "3"
  };

  return (
    <div className="space-y-6">
      <EmployeeHeader id={id} employee={employee} />
      <Separator />
      <EmployeeDetails employee={employee} />
      <Separator />
      <SkillStateViewer />
      <Separator />
      <SkillsSummary />
    </div>
  );
}