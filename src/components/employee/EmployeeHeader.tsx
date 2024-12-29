import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";
import { useState } from "react";
import { EditEmployeeDialog } from "./EditEmployeeDialog";
import { useEmployeeStore } from "./store/employeeStore";

interface EmployeeHeaderProps {
  id: string;
  employee: {
    name: string;
    role: string;
    location: string;
    image: string;
  };
}

export const EmployeeHeader = ({ id, employee }: EmployeeHeaderProps) => {
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const fullEmployee = useEmployeeStore(state => state.getEmployeeById(id));

  if (!fullEmployee) return null;

  return (
    <div className="flex items-start justify-between">
      <div className="flex gap-6">
        <Avatar className="h-20 w-20 rounded-full">
          <img 
            src={`https://images.unsplash.com/${employee.image}?auto=format&fit=crop&w=80&h=80`}
            alt={employee.name}
            className="object-cover"
          />
        </Avatar>
        <div className="space-y-2">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-semibold text-gray-900">{employee.name}</h1>
              <span className="text-sm text-muted-foreground bg-gray-50 px-2 py-1 rounded">ID: {id}</span>
            </div>
            <h2 className="text-lg text-gray-600">{employee.role}</h2>
          </div>
          <div className="flex items-center gap-2 text-gray-500">
            <MapPin className="h-4 w-4" />
            <span>{employee.location}</span>
          </div>
        </div>
      </div>
      <div className="flex gap-3">
        <Button variant="outline" className="bg-white hover:bg-gray-50">Export</Button>
        <Button 
          className="bg-[#1F2144] hover:bg-[#1F2144]/90"
          onClick={() => setEditDialogOpen(true)}
        >
          Edit
        </Button>
      </div>

      <EditEmployeeDialog 
        employee={fullEmployee}
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
      />
    </div>
  );
};