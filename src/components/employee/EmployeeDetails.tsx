import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { getEmployeeSkills } from "../benchmark/skills-matrix/initialSkills";
import { Link } from "react-router-dom";

interface EmployeeDetailsProps {
  employee: {
    department: string;
    office: string;
    category: string;
    manager: string;
    startDate: string;
    termDate: string;
    tenure: string;
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

const isAddedLastYear = (startDate: string): boolean => {
  if (!startDate) return false;
  
  const start = new Date(startDate);
  const now = new Date();
  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(now.getFullYear() - 1);
  
  return start > oneYearAgo;
};

export const EmployeeDetails = ({ employee, id }: EmployeeDetailsProps) => {
  const tenure = calculateTenure(employee.startDate, employee.termDate === "-" ? null : employee.termDate);
  const employeeSkills = getEmployeeSkills(id);
  const totalSkills = employeeSkills.length;
  const addedLastYear = isAddedLastYear(employee.startDate);

  console.log(`Employee ${id} has ${totalSkills} skills:`, employeeSkills);
  console.log('Added last year:', addedLastYear);

  return (
    <>
      <Separator className="my-6" />
      <div className="grid grid-cols-4 gap-x-8 gap-y-6">
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
          <span className="text-sm text-gray-500">Tenure (Years)</span>
          <p className="font-medium text-gray-900">{tenure}</p>
        </div>
        <div className="space-y-1">
          <span className="text-sm text-gray-500">Skill Count</span>
          <p className="font-medium text-gray-900">{totalSkills}</p>
        </div>
        <div className="space-y-1">
          <span className="text-sm text-gray-500">Added Past Year</span>
          <p className="font-medium text-gray-900">{addedLastYear ? "YES" : "NO"}</p>
        </div>
      </div>
    </>
  );
};