import { SkillsSummary } from "@/components/skills/SkillsSummary";
import { EmployeeHeader } from "@/components/employee/EmployeeHeader";
import { EmployeeDetails } from "@/components/employee/EmployeeDetails";
import { CurrentSkillsDisplay } from "@/components/skills/CurrentSkillsDisplay";
import { useParams } from "react-router-dom";

// Mock data - in a real app this would come from an API
const mockEmployee = {
  name: "John Doe",
  role: "Backend Engineer",
  location: "San Francisco, CA",
  image: "photo-1472099645785-5658abf4ff4e",
  department: "Engineering",
  office: "HQ",
  category: "Technical",
  manager: "Jane Smith",
  startDate: "2021-01-15",
  termDate: "-",
  tenure: "3"
};

const EmployeeProfile = () => {
  const { id } = useParams();

  return (
    <div className="container mx-auto py-6 space-y-6">
      <EmployeeHeader 
        id={id || "0"} 
        employee={mockEmployee}
      />
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        <EmployeeDetails 
          employee={mockEmployee}
        />
        <CurrentSkillsDisplay />
      </div>
      <SkillsSummary />
    </div>
  );
};

export default EmployeeProfile;