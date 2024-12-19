import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { EmployeeFormFields } from "./form/EmployeeFormFields";
import { useEmployeeStore } from "./store/employeeStore";
import { validateFormData } from "./form/employeeFormSubmission";
import { Employee } from "../types/employeeTypes";
import { ToggledSkillsProvider } from "../skills/context/ToggledSkillsContext";

interface EditEmployeeDialogProps {
  employee: Employee;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const EditEmployeeDialog = ({ employee, open, onOpenChange }: EditEmployeeDialogProps) => {
  const { toast } = useToast();
  const updateEmployee = useEmployeeStore((state) => state.updateEmployee);
  const employees = useEmployeeStore((state) => state.employees);
  
  const [formData, setFormData] = useState({
    id: employee.id,
    name: employee.name,
    location: employee.location,
    office: employee.office,
    department: employee.department,
    manager: employee.manager || "",
    role: employee.role.split(':')[0].trim(),
    level: employee.role.split(':')[1]?.trim() || "",
    startDate: employee.startDate || "",
    termDate: employee.termDate === "-" ? "" : employee.termDate,
    sex: employee.sex,
    category: employee.category,
  });

  console.log('EditEmployeeDialog - Initial form data:', {
    employeeRole: employee.role,
    parsedLevel: employee.role.split(':')[1]?.trim(),
    formData
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
      // Update employee with all form fields
      const updatedEmployee: Employee = {
        ...employee,
        name: formData.name,
        department: formData.department,
        office: formData.office,
        category: formData.category,
        manager: formData.manager,
        startDate: formData.startDate,
        termDate: formData.termDate || "-",
        role: `${formData.role}: ${formData.level}`,
        location: formData.location,
        sex: formData.sex as 'male' | 'female',
        // Preserve existing values that shouldn't change during edit
        skillCount: employee.skillCount,
        benchmark: employee.benchmark,
        lastUpdated: new Date().toLocaleDateString()
      };

      console.log('Updating employee with:', updatedEmployee);
      updateEmployee(updatedEmployee);

      toast({
        title: "Success",
        description: "Employee profile updated successfully",
      });
      
      onOpenChange(false);
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
    setFormData(prev => {
      const newData = {
        ...prev,
        [field]: value
      };

      // Reset level when role changes
      if (field === 'role') {
        newData.level = '';
        console.log('Role changed, reset level');
      }

      console.log(`Field ${field} updated to:`, value);
      return newData;
    });
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