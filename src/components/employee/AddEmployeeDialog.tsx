import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { EmployeeFormFields } from "./form/EmployeeFormFields";
import { useEmployeeStore } from "./store/employeeStore";
import { validateFormData, processEmployeeData } from "./form/employeeFormSubmission";
import { ToggledSkillsProvider } from "@/components/skills/context/ToggledSkillsContext";
import { roleMapping } from "./form/RoleLevelFields";

interface AddEmployeeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const AddEmployeeDialog = ({ open, onOpenChange }: AddEmployeeDialogProps) => {
  const { toast } = useToast();
  const addEmployee = useEmployeeStore((state) => state.addEmployee);
  const employees = useEmployeeStore((state) => state.employees);
  
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    location: "",
    office: "",
    department: "",
    manager: "",
    role: "",
    level: "",
    startDate: "",
    termDate: "",
    sex: "",
    category: "",
    team: "RnD",
    type: "On-site" as const,
    skills: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submission started - Form data:', formData);

    // Validate form data
    const validation = validateFormData(formData, employees);
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
      // Process and add employee data
      const newEmployee = processEmployeeData(formData);
      console.log('Adding new employee:', newEmployee);
      
      addEmployee(newEmployee);

      toast({
        title: "Success",
        description: "Employee added successfully",
      });
      
      onOpenChange(false);
    } catch (error) {
      console.error('Error adding employee:', error);
      toast({
        title: "Error",
        description: "Failed to add employee. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => {
      // If changing role, check if we need to adjust the level based on track
      if (field === 'role') {
        const roleId = roleMapping[value];
        const isManagerialRole = roleId === "126" || roleId === "128";
        
        // Set default level based on track
        const newLevel = isManagerialRole ? "m3" : "p1";
        
        console.log('Adjusting level for role change:', {
          newRole: value,
          roleId,
          isManagerial: isManagerialRole,
          newLevel
        });

        return {
          ...prev,
          [field]: value,
          level: newLevel,
          type: prev.type
        };
      }

      return {
        ...prev,
        [field]: value,
        type: prev.type
      };
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Add New Employee</DialogTitle>
        </DialogHeader>
        
        <ToggledSkillsProvider>
          <form onSubmit={handleSubmit} className="space-y-4">
            <EmployeeFormFields 
              formData={formData}
              handleInputChange={handleInputChange}
            />

            <div className="flex justify-end">
              <Button type="submit">Add Employee</Button>
            </div>
          </form>
        </ToggledSkillsProvider>
      </DialogContent>
    </Dialog>
  );
};