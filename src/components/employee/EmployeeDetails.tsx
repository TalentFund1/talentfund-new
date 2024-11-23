import { Separator } from "@/components/ui/separator";

interface EmployeeDetailsProps {
  employee: {
    id: string;
    name: string;
    role: string;
    department: string;
    manager: string;
    startDate: string;
    termDate: string;
    tenure: string;
  };
}

export const EmployeeDetails = ({ employee }: EmployeeDetailsProps) => {
  return (
    <>
      <Separator className="my-6" />
      <div className="grid grid-cols-4 gap-6">
        <div className="space-y-1">
          <span className="text-sm text-gray-500">Department</span>
          <p className="font-medium text-gray-900">{employee.department}</p>
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
          <span className="text-sm text-gray-500">Tenure (Years)</span>
          <p className="font-medium text-gray-900">{employee.tenure}</p>
        </div>
      </div>
    </>
  );
};