import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { useEmployeeSkillsStore } from "./store/employeeSkillsStore";
import { useEmployeeStore } from "./store/employeeStore";
import { Building2, Briefcase, Users, Calendar, MapPin, UserCircle2, Blocks, Building } from "lucide-react";

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

  const DetailItem = ({ icon: Icon, label, value, isLink = false }: { 
    icon: React.ElementType; 
    label: string; 
    value: string | number;
    isLink?: boolean;
  }) => (
    <div className="group">
      <div className="flex items-center gap-2 mb-1">
        <Icon className="h-4 w-4 text-primary-accent" />
        <span className="text-sm text-gray-500">{label}</span>
      </div>
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <DetailItem icon={Building2} label="Department" value={employee.department} />
        <DetailItem icon={Building} label="Office" value={employee.office} />
        <DetailItem icon={Briefcase} label="Category" value={employee.category} />
        <DetailItem icon={Users} label="Team" value={employee.team} />
        <DetailItem icon={UserCircle2} label="Manager" value={employee.manager} isLink={true} />
        <DetailItem icon={Calendar} label="Tenure (Years)" value={tenure} />
        <DetailItem icon={MapPin} label="Type" value={employee.type} />
        <DetailItem icon={Blocks} label="Skill Count" value={skillCount} />
      </div>
    </>
  );
};