import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEmployeeStore } from "./store/employeeStore";
import { Employee } from "../types/employeeTypes";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface EditEmployeeDialogProps {
  employee: Employee;
  onClose: () => void;
}

export const EditEmployeeDialog = ({ 
  employee,
  onClose 
}: EditEmployeeDialogProps) => {
  const [formData, setFormData] = useState({
    id: employee.id,
    name: employee.name,
    location: employee.location,
    office: employee.office,
    department: employee.department,
    manager: employee.manager,
    role: employee.role,
    level: employee.level || '',
    startDate: employee.startDate,
    termDate: employee.termDate,
    sex: employee.sex,
    category: employee.category,
    team: employee.team,
    type: employee.type || 'On-site'
  });

  const updateEmployee = useEmployeeStore((state) => state.updateEmployee);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const updatedEmployee = {
      ...employee,
      ...formData
    };

    updateEmployee(updatedEmployee);
    
    toast({
      title: "Employee Updated",
      description: "Employee information has been successfully updated.",
    });
    
    onClose();
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Employee</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="role">Role</Label>
              <Input
                id="role"
                name="role"
                value={formData.role}
                onChange={handleInputChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="department">Department</Label>
              <Input
                id="department"
                name="department"
                value={formData.department}
                onChange={handleInputChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="manager">Manager</Label>
              <Input
                id="manager"
                name="manager"
                value={formData.manager}
                onChange={handleInputChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="startDate">Start Date</Label>
              <Input
                id="startDate"
                name="startDate"
                type="date"
                value={formData.startDate}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Save Changes</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};