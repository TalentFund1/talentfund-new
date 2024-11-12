import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar } from "@/components/ui/avatar";
import { MapPin } from "lucide-react";

interface EmployeeInfoProps {
  employee: any;
}

export const EmployeeInfo = ({ employee }: EmployeeInfoProps) => {
  return (
    <Card className="p-8 bg-white">
      <div className="flex items-start justify-between mb-8">
        <div className="flex gap-8">
          <Avatar className="h-28 w-28 rounded-full border-4 border-border">
            <img 
              src={`https://images.unsplash.com/${employee.image}?auto=format&fit=crop&w=96&h=96`}
              alt={employee.name}
              className="object-cover"
            />
          </Avatar>
          <div className="space-y-3">
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold text-foreground">{employee.name}</h1>
              </div>
              <h2 className="text-lg font-medium text-foreground/90">{employee.role}</h2>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>{employee.location}</span>
            </div>
          </div>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="bg-white">Export</Button>
          <Button>Edit</Button>
        </div>
      </div>

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
    </Card>
  );
};