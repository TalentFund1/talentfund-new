import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { EmployeeFormFields } from "./form/EmployeeFormFields";
import { employees } from "../employee/EmployeeData";
import { getEmployeeSkills } from "../benchmark/skills-matrix/initialSkills";
import { create } from "zustand";

interface EmployeeStore {
  employees: typeof employees;
  addEmployee: (employee: typeof employees[0]) => void;
}

export const useEmployeeStore = create<EmployeeStore>((set) => ({
  employees: employees,
  addEmployee: (employee) => set((state) => {
    console.log('Adding new employee to store:', employee);
    
    // Initialize skills for the new employee based on their role
    const skillProfileId = employee.id;
    const initialSkills = getEmployeeSkills(skillProfileId);
    
    // Create complete employee object with all required properties
    const completeEmployee = {
      ...employee,
      skillCount: initialSkills.length || 0,
      benchmark: 0, // Will be calculated by EmployeeBenchmarkCalculator
      lastUpdated: new Date().toLocaleDateString(),
    };

    console.log('Complete employee object with initialized data:', completeEmployee);
    
    // Update both the imported array and store
    employees.push(completeEmployee);
    const newEmployees = [...state.employees, completeEmployee];
    console.log('Updated store employees:', newEmployees);
    
    return { employees: newEmployees };
  }),
}));

export const AddEmployeeDialog = () => {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const addEmployee = useEmployeeStore((state) => state.addEmployee);
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
    
    console.log('Form submission - Form data:', formData);
    
    // Enhanced validation for required fields
    if (!formData.id || !formData.name || !formData.department || !formData.role || !formData.office || !formData.startDate) {
      console.log('Form validation failed - Missing required fields');
      toast({
        title: "Error",
        description: "Please fill in all required fields: ID, Name, Department, Role, Office, and Start Date",
        variant: "destructive"
      });
      return;
    }

    // Format dates properly
    const formattedStartDate = new Date(formData.startDate).toISOString().split('T')[0];
    const formattedTermDate = formData.termDate ? new Date(formData.termDate).toISOString().split('T')[0] : "-";

    // Create new employee object with proper field mapping
    const newEmployee = {
      id: formData.id,
      name: formData.name,
      role: `${formData.role}${formData.level ? ': ' + formData.level.toUpperCase() : ''}`,
      department: formData.department,
      skillCount: 0, // This will be updated by the store with actual skills
      benchmark: 0,
      lastUpdated: new Date().toLocaleDateString(),
      location: formData.location,
      sex: formData.sex as 'male' | 'female',
      category: formData.category,
      manager: formData.manager,
      startDate: formattedStartDate,
      office: formData.office,
      termDate: formattedTermDate
    };

    console.log('Creating new employee:', newEmployee);

    try {
      // Add new employee using the store
      addEmployee(newEmployee);
      
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
    } catch (error) {
      console.error('Error adding employee:', error);
      toast({
        title: "Error",
        description: "Failed to create employee profile. Please try again.",
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

      // Reset level when role changes to ensure compatibility
      if (field === 'role') {
        newData.level = '';
      }

      console.log(`Field ${field} updated to:`, value);
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