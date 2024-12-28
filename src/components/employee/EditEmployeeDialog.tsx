import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { EmployeeFormFields } from "./form/EmployeeFormFields";
import { useEmployeeStore } from "./store/employeeStore";
import { validateFormData, processEmployeeData } from "./form/employeeFormSubmission";
import { Employee } from "../types/employeeTypes";
import { ToggledSkillsProvider } from "../skills/context/ToggledSkillsContext";
import { roleMapping } from "./form/RoleLevelFields";
import { useNavigate } from "react-router-dom";
import { getRoleDefaultTrack } from "../skills/data/roles/roleDefinitions";

interface EditEmployeeDialogProps {
  employee: Employee;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const EditEmployeeDialog = ({ employee, open, onOpenChange }: EditEmployeeDialogProps) => {
  const { toast } = useToast();
  const updateEmployee = useEmployeeStore((state) => state.updateEmployee);
  const employees = useEmployeeStore((state) => state.employees);
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    id: employee.id,
    name: employee.name,
    location: employee.location,
    office: employee.office,
    department: employee.department,
    manager: employee.manager || "",
    role: employee.role.split(':')[0].trim(),
    level: employee.role.split(':')[1]?.trim().toLowerCase() || "",
    startDate: employee.startDate || "",
    termDate: employee.termDate === "-" ? "" : employee.termDate,
    sex: employee.sex,
    category: employee.category,
  });

  console.log('EditEmployeeDialog - Initial form data:', {
    employeeRole: employee.role,
    parsedLevel: employee.role.split(':')[1]?.trim(),
    formData,
    roleTrack: getRoleDefaultTrack(roleMapping[formData.role])
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log('Edit form submission started - Form data:', formData);

    // Validate form data
    const validation = validateFormData(formData, employees.filter(emp => emp.id !== employee.id));
    if (!validation.isValid) {
      console.log('Validation failed:', validation.error);
      toast({
        title: "Validation Error",
        description: validation.error,
        variant: "destructive"
      });
      return;
    }

    try {
      // Process and update employee data
      const updatedEmployee = processEmployeeData({
        ...formData,
        id: employee.id // Ensure we keep the original ID
      });

      // Preserve existing values that shouldn't change during edit
      updatedEmployee.skillCount = employee.skillCount;
      updatedEmployee.benchmark = employee.benchmark;
      updatedEmployee.skills = employee.skills;

      console.log('Updating employee with:', updatedEmployee);
      
      // Update employee in store
      updateEmployee(updatedEmployee);

      // Clear cached context data
      const keysToRemove = [
        `toggled-skills-${employee.id}`,
        `track-${employee.id}`,
        `matrix-search-${employee.id}`,
        `benchmark-search-${employee.id}`
      ];
      
      keysToRemove.forEach(key => {
        console.log('Removing cached data:', key);
        localStorage.removeItem(key);
      });

      toast({
        title: "Success",
        description: "Employee profile updated successfully",
      });
      
      onOpenChange(false);
      
      // Navigate to trigger a re-render without reload
      navigate(`/employee/${employee.id}`, { replace: true });
      
    } catch (error) {
      console.error('Error updating employee:', error);
      toast({
        title: "Error",
        description: "Failed to update employee profile. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit Employee Profile</DialogTitle>
        </DialogHeader>
        
        <ToggledSkillsProvider>
          <form onSubmit={handleSubmit} className="space-y-4">
            <EmployeeFormFields 
              formData={formData}
              handleInputChange={handleInputChange}
            />

            <div className="flex justify-end">
              <Button type="submit">Save Changes</Button>
            </div>
          </form>
        </ToggledSkillsProvider>
      </DialogContent>
    </Dialog>
  );
};