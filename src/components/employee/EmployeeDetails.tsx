import { Separator } from "@/components/ui/separator";

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
}

export const EmployeeDetails = ({ employee }: EmployeeDetailsProps) => {
  return (
    <>
      <Separator className="my-8" />
      <div className="grid grid-cols-4 gap-8">
        <div className="space-y-1.5">
          <span className="text-sm text-muted-foreground">Department</span>
          <p className="font-medium">{employee.department}</p>
        </div>
        <div className="space-y-1.5">
          <span className="text-sm text-muted-foreground">Office</span>
          <p className="font-medium">{employee.office}</p>
        </div>
        <div className="space-y-1.5">
          <span className="text-sm text-muted-foreground">Category</span>
          <p className="font-medium">{employee.category}</p>
        </div>
        <div className="space-y-1.5">
          <span className="text-sm text-muted-foreground">Manager</span>
          <p className="font-medium">{employee.manager}</p>
        </div>
        <div className="space-y-1.5">
          <span className="text-sm text-muted-foreground">Start Date</span>
          <p className="font-medium">{employee.startDate}</p>
        </div>
        <div className="space-y-1.5">
          <span className="text-sm text-muted-foreground">Term Date</span>
          <p className="font-medium">{employee.termDate}</p>
        </div>
        <div className="space-y-1.5">
          <span className="text-sm text-muted-foreground">Tenure (Years)</span>
          <p className="font-medium">{employee.tenure}</p>
        </div>
      </div>
    </>
  );
};