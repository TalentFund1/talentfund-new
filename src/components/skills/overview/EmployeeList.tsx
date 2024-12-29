import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { EMPLOYEE_IMAGES } from "../../employee/EmployeeData";
import { Employee } from "../../types/employeeTypes";

interface EmployeeListProps {
  title: string;
  employees: (Employee & { benchmark: number })[];
  showViewAll?: boolean;
}

export const EmployeeList = ({ title, employees, showViewAll = true }: EmployeeListProps) => {
  const navigate = useNavigate();

  const handleEmployeeClick = (employeeId: string) => {
    navigate(`/employee/${employeeId}?tab=benchmark`);
  };

  return (
    <Card className="p-6 space-y-4 border border-border">
      <div className="flex items-center justify-between">
        <h3 className="font-medium text-sm text-muted-foreground">{title}</h3>
        {showViewAll && (
          <Button 
            variant="link" 
            className="text-sm text-primary-accent hover:text-primary-accent/80 transition-colors p-0 h-auto font-medium"
          >
            View all
          </Button>
        )}
      </div>
      <div className="space-y-3">
        {employees.map((employee, index) => (
          <div 
            key={employee.name} 
            className="flex items-center gap-4 p-3 rounded-lg hover:bg-secondary/50 transition-colors cursor-pointer group"
          >
            <Avatar className="h-10 w-10 border-2 border-border">
              <img 
                src={`https://images.unsplash.com/${EMPLOYEE_IMAGES[index % EMPLOYEE_IMAGES.length]}?auto=format&fit=crop&w=96&h=96`}
                alt={employee.name}
                className="object-cover"
              />
            </Avatar>
            <div className="flex-1 min-w-0">
              <p 
                onClick={() => handleEmployeeClick(employee.id)}
                className="font-medium text-primary truncate group-hover:text-primary-accent transition-colors cursor-pointer hover:underline"
              >
                {employee.name}
              </p>
              <p className="text-sm text-muted-foreground truncate">
                {employee.role}
              </p>
            </div>
            <span className="text-sm px-2.5 py-1 bg-green-100 text-green-800 rounded-full font-medium">
              {Math.round(employee.benchmark)}%
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
};