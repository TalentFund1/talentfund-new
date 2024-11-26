import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";
import { Employee } from "../types/employeeTypes";

interface EmployeeHeaderProps {
  id: string;
  employee: Employee & { image: string };
}

export const EmployeeHeader = ({ id, employee }: EmployeeHeaderProps) => {
  return (
    <div className="flex items-start justify-between mb-8">
      <div className="flex gap-6">
        <Avatar className="h-24 w-24 rounded-full">
          <img 
            src={`https://images.unsplash.com/${employee.image}?auto=format&fit=crop&w=96&h=96`}
            alt={employee.name}
            className="object-cover"
          />
        </Avatar>
        <div className="space-y-2">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-semibold">{employee.name}</h1>
              <span className="text-sm text-muted-foreground bg-gray-50 px-2 py-1 rounded">ID: {id}</span>
            </div>
            <h2 className="text-lg text-gray-700">{employee.role}</h2>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <MapPin className="h-4 w-4" />
            <span>{employee.location}</span>
          </div>
        </div>
      </div>
      <div className="flex gap-3">
        <Button variant="outline" className="bg-white hover:bg-gray-50">Export</Button>
        <Button className="bg-[#1F2144] hover:bg-[#1F2144]/90">Edit</Button>
      </div>
    </div>
  );
};