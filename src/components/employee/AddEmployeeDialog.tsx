import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { EmployeeFormFields } from "./form/EmployeeFormFields";
import { employees } from "../employee/EmployeeData";
import { getEmployeeSkills } from "../benchmark/skills-matrix/initialSkills";

export const AddEmployeeDialog = () => {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
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
    skills: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.id || !formData.name || !formData.department || !formData.role) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    // Create new employee object
    const newEmployee = {
      id: formData.id,
      name: formData.name,
      role: `${formData.role}: ${formData.level.toUpperCase()}`,
      department: formData.department,
      skillCount: formData.skills.split(',').length,
      benchmark: 0,
      lastUpdated: new Date().toLocaleDateString(),
      location: formData.location,
      sex: formData.sex as 'male' | 'female',
      category: formData.category,
      manager: formData.manager,
      startDate: formData.startDate,
      office: formData.office,
      termDate: formData.termDate || "-"
    };

    // Add new employee to the list
    employees.push(newEmployee);
    
    console.log("New employee added:", newEmployee);
    
    toast({
      title: "Success",
      description: "Employee profile created successfully",
    });
    
    setOpen(false);
    setFormData({
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
      skills: ""
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => {
      const newData = {
        ...prev,
        [field]: value
      };

      // Reset level when role changes to ensure compatibility
      if (field === 'role') {
        newData.level = '';
      }

      return newData;
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add Employee</Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Create Employee Profile</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <EmployeeFormFields 
            formData={formData}
            handleInputChange={handleInputChange}
          />

          <div className="flex justify-end">
            <Button type="submit">Create Profile</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};