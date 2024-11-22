import { Separator } from "@/components/ui/separator";
import { differenceInYears, differenceInMonths, parseISO } from "date-fns";

interface EmployeeDetailsProps {
  employee: {
    department: string;
    office: string;
    category: string;
    manager: string;
    startDate: string;
    termDate: string;
  };
}

export const EmployeeDetails = ({ employee }: EmployeeDetailsProps) => {
  const calculateTenure = (startDate: string, termDate: string) => {
    const start = parseISO(startDate);
    const end = termDate === "-" ? new Date() : parseISO(termDate);
    
    const years = differenceInYears(end, start);
    const months = differenceInMonths(end, start) % 12;
    
    console.log('Calculating tenure:', { startDate, termDate, years, months });
    
    if (years === 0) {
      return `${months} months`;
    } else if (months === 0) {
      return `${years} years`;
    } else {
      return `${years}.${Math.floor((months / 12) * 10)} years`;
    }
  };

  const tenure = calculateTenure(employee.startDate, employee.termDate);

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
          <p className="font-medium text-gray-900">{employee.manager}</p>
        </div>
        <div className="space-y-1">
          <span className="text-sm text-gray-500">Start Date</span>
          <p className="font-medium text-gray-900">{employee.startDate}</p>
        </div>
        <div className="space-y-1">
          <span className="text-sm text-gray-500">Term Date</span>
          <p className="font-medium text-gray-900">{employee.termDate}</p>
        </div>
        <div className="space-y-1">
          <span className="text-sm text-gray-500">Tenure</span>
          <p className="font-medium text-gray-900">{tenure}</p>
        </div>
      </div>
    </>
  );
};