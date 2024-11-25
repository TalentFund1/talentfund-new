import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { EmployeeFormFields } from "./form/EmployeeFormFields";
import { create } from "zustand";
import { Employee } from "../types/employeeTypes";
import { getEmployeeSkills } from "../benchmark/skills-matrix/initialSkills";
import { getSkillProfileId } from "../EmployeeTable";
import { calculateEmployeeBenchmarks } from "./EmployeeBenchmarkCalculator";
import { useSkillsMatrixStore } from "../benchmark/skills-matrix/SkillsMatrixState";
import { useToggledSkills } from "../skills/context/ToggledSkillsContext";
import { useCompetencyStateReader } from "../skills/competency/CompetencyStateReader";

interface EmployeeStore {
  employees: Employee[];
  addEmployee: (employee: Employee) => void;
}

export const useEmployeeStore = create<EmployeeStore>((set) => ({
  employees: [],
  addEmployee: (employee) => set((state) => {
    console.log('Adding new employee to store:', employee);
    return { employees: [...state.employees, employee] };
  }),
}));

export const AddEmployeeDialog = () => {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const addEmployee = useEmployeeStore((state) => state.addEmployee);
  const employees = useEmployeeStore((state) => state.employees);
  const { currentStates } = useSkillsMatrixStore();
  const { toggledSkills } = useToggledSkills();
  const { getSkillCompetencyState } = useCompetencyStateReader();
  
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

    // Check for duplicate employee ID
    const isDuplicateId = employees.some(emp => emp.id === formData.id);
    if (isDuplicateId) {
      console.log('Form validation failed - Duplicate employee ID:', formData.id);
      toast({
        title: "Error",
        description: "An employee with this ID already exists. Please use a unique ID.",
        variant: "destructive"
      });
      return;
    }

    // Get role-specific skills
    const roleId = getSkillProfileId(formData.role);
    const roleSkills = getEmployeeSkills(roleId);
    console.log('Initializing role-specific skills for new employee:', roleSkills);

    // Create new employee with all required data
    const newEmployee: Employee = {
      id: formData.id,
      name: formData.name,
      role: `${formData.role}${formData.level ? ': ' + formData.level.toUpperCase() : ''}`,
      department: formData.department,
      skillCount: roleSkills.length,
      benchmark: 0, // Will be calculated after creation
      lastUpdated: new Date().toLocaleDateString(),
      location: formData.location,
      sex: formData.sex as 'male' | 'female',
      category: formData.category,
      manager: formData.manager,
      startDate: formData.startDate,
      office: formData.office,
      termDate: formData.termDate || "-"
    };

    console.log('Creating new employee with data:', newEmployee);

    try {
      // Add employee to store
      addEmployee(newEmployee);

      // Calculate initial benchmark
      const employeesWithBenchmarks = calculateEmployeeBenchmarks(
        [newEmployee],
        [formData.role],
        currentStates,
        toggledSkills,
        getSkillCompetencyState
      );

      console.log('Initial benchmark calculation:', employeesWithBenchmarks);

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
      console.error('Error creating employee:', error);
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