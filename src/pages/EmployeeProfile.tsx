import { useNavigate, useParams } from "react-router-dom";
import { Sidebar } from "@/components/Sidebar";
import { SelectedSkillsProvider } from "@/components/skills/context/SelectedSkillsContext";
import { TrackProvider } from "@/components/skills/context/TrackContext";
import { EmployeeHeader } from "@/components/employee/EmployeeHeader";
import { EmployeeInfo } from "@/components/employee/EmployeeInfo";
import { EmployeeProfileContent } from "@/components/employee/EmployeeProfileContent";

const employees = {
  "123": {
    name: "Victor Smith",
    role: "AI Engineer: P4",
    location: "Toronto, ON",
    department: "Engineering",
    office: "Toronto",
    category: "Full-time",
    manager: "Sarah Chen",
    startDate: "2024-01-01",
    termDate: "-",
    tenure: "1.9",
    image: "photo-1488590528505-98d2b5aba04b"
  },
  "124": {
    name: "Jennie Richards",
    role: "Backend Engineer: P4",
    location: "Toronto, ON",
    department: "Engineering",
    office: "Toronto",
    category: "Full-time",
    manager: "Sarah Chen",
    startDate: "2024-01-01",
    termDate: "-",
    tenure: "1.9",
    image: "photo-1518770660439-4636190af475"
  },
  "125": {
    name: "Anna Vyselva",
    role: "Frontend Developer: P4",
    location: "Toronto, ON",
    department: "Engineering",
    office: "Toronto",
    category: "Full-time",
    manager: "Sarah Chen",
    startDate: "2024-01-01",
    termDate: "-",
    tenure: "1.9",
    image: "photo-1461749280684-dccba630e2f6"
  },
  "126": {
    name: "Suz Manu",
    role: "Engineering Manager: M3",
    location: "Toronto, ON",
    department: "Engineering",
    office: "Toronto",
    category: "Full-time",
    manager: "Sarah Chen",
    startDate: "2024-01-01",
    termDate: "-",
    tenure: "1.9",
    image: "photo-1486312338219-ce68d2c6f44d"
  }
};

const EmployeeProfile = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const employee = employees[id as keyof typeof employees];

  if (!employee) {
    return <div>Employee not found</div>;
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 p-6 ml-16 transition-all duration-300">
        <div className="max-w-7xl mx-auto space-y-6">
          <SelectedSkillsProvider>
            <TrackProvider>
              <EmployeeHeader onBack={() => navigate('/employees')} />
              <EmployeeInfo employee={employee} />
              <EmployeeProfileContent employee={employee} id={id || ""} />
            </TrackProvider>
          </SelectedSkillsProvider>
        </div>
      </div>
    </div>
  );
};

export default EmployeeProfile;