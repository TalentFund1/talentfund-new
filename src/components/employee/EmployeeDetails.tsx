import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { getSkillProfileId } from "../EmployeeTable";
import { useTrack } from "../skills/context/TrackContext";
import { getEmployeeTrack } from "./utils/employeeTrackUtils";
import { useEmployeeSkillsStore } from "./store/employeeSkillsStore";

interface EmployeeDetailsProps {
  employee: {
    department: string;
    office: string;
    category: string;
    manager: string;
    startDate: string;
    termDate: string;
    tenure: string;
    role: string;
    skills: ReadonlyArray<{ title: string; level: string; }>;
  };
  id: string;
}

const calculateTenure = (startDate: string, termDate: string | null): string => {
  if (!startDate) return "0.0";
  
  const start = new Date(startDate);
  const end = termDate && termDate !== "-" ? new Date(termDate) : new Date();
  
  if (isNaN(start.getTime())) return "0.0";
  
  const diffTime = Math.abs(end.getTime() - start.getTime());
  const diffYears = diffTime / (1000 * 60 * 60 * 24 * 365.25);
  return diffYears.toFixed(1);
};

export const EmployeeDetails = ({ employee, id }: EmployeeDetailsProps) => {
  const tenure = calculateTenure(employee.startDate, employee.termDate === "-" ? null : employee.termDate);
  const roleId = getSkillProfileId(employee.role);
  const { getTrackForRole } = useTrack();
  const roleTrack = getTrackForRole(roleId);
  const employeeTrack = getEmployeeTrack(employee.role);
  const { getEmployeeSkills } = useEmployeeSkillsStore();
  const employeeSkills = getEmployeeSkills(id);
  const skillCount = employeeSkills.length;

  console.log(`Employee ${id} details:`, {
    roleId,
    roleTrack,
    employeeTrack,
    role: employee.role,
    skillCount,
    skills: employeeSkills.map(s => s.title)
  });

  return (
    <>
      <Separator className="my-4 sm:my-6" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
        <div className="space-y-1">
          <span className="text-sm text-gray-500">Department</span>
          <p className="font-medium text-gray-900">{employee.department}</p>
        </div>
        <div className="space-y-1">
          <span className="text-sm text-gray-500">Office</span>
          <p className="font-medium text-gray-900">{employee.office}</p>
        </div>
        <div className="space-y-1">
          <span className="text-sm text-gray-500">Category</span>
          <p className="font-medium text-gray-900">{employee.category}</p>
        </div>
        <div className="space-y-1">
          <span className="text-sm text-gray-500">Manager</span>
          <Link 
            to="/employee/126" 
            className="font-medium text-primary hover:text-primary-accent transition-colors block"
          >
            Sus Manu
          </Link>
        </div>
        <div className="space-y-1">
          <span className="text-sm text-gray-500">Start Date</span>
          <p className="font-medium text-gray-900">{employee.startDate || "—"}</p>
        </div>
        <div className="space-y-1">
          <span className="text-sm text-gray-500">Term Date</span>
          <p className="font-medium text-gray-900">
            {employee.termDate || "—"}
          </p>
        </div>
        <div className="space-y-1">
          <span className="text-sm text-gray-500">Tenure (Years)</span>
          <p className="font-medium text-gray-900">{tenure}</p>
        </div>
        <div className="space-y-1">
          <span className="text-sm text-gray-500">Skill Count</span>
          <p className="font-medium text-gray-900">{skillCount}</p>
        </div>
        <div className="space-y-1">
          <span className="text-sm text-gray-500">Role ID</span>
          <p className="font-medium text-gray-900">{roleId}</p>
        </div>
        <div className="space-y-1">
          <span className="text-sm text-gray-500">Role Track</span>
          <p className="font-medium text-gray-900">{roleTrack}</p>
        </div>
        <div className="space-y-1">
          <span className="text-sm text-gray-500">Employee Track</span>
          <p className="font-medium text-gray-900">{employeeTrack}</p>
        </div>
      </div>
    </>
  );
};