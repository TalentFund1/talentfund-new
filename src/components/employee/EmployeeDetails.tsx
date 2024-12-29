import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { useEmployeeSkillsStore } from "./store/employeeSkillsStore";
import { useEmployeeStore } from "./store/employeeStore";

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
    team: string;
    type: string;
    skills: ReadonlyArray<{
      readonly title: string;
      readonly level: string;
    }>;
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
  const { getEmployeeSkills } = useEmployeeSkillsStore();
  const employeeSkills = getEmployeeSkills(id);
  const skillCount = employeeSkills.length;
  const employees = useEmployeeStore(state => state.employees);
  const managerId = employees.find(emp => emp.name === employee.manager)?.id || "";

  console.log(`Employee ${id} details:`, {
    role: employee.role,
    skillCount,
    skills: employeeSkills.map(s => s.title),
    manager: employee.manager,
    managerId,
    team: employee.team
  });

  const DetailItem = ({ label, value, isLink = false }: { 
    label: string; 
    value: string | number;
    isLink?: boolean;
  }) => (
    <div className="group">
      <span className="text-sm text-gray-500 block mb-1">{label}</span>
      {isLink && employee.manager ? (
        <Link 
          to={`/employee/${managerId}`}
          className="font-medium text-primary hover:text-primary-accent transition-colors block"
        >
          {value}
        </Link>
      ) : (
        <p className="font-medium text-gray-900">{value || "—"}</p>
      )}
    </div>
  );

  return (
    <>
      <Separator className="my-8" />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-x-12 gap-y-6">
        <DetailItem label="Department" value={employee.department} />
        <DetailItem label="Office" value={employee.office} />
        <DetailItem label="Category" value={employee.category} />
        <DetailItem label="Team" value={employee.team} />
        <DetailItem label="Manager" value={employee.manager} isLink={true} />
        <DetailItem label="Tenure (Years)" value={tenure} />
        <DetailItem label="Type" value={employee.type} />
        <DetailItem label="Skill Count" value={skillCount} />
      </div>
    </>
  );
};
