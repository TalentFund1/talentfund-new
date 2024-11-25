import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { EmployeeFormFields } from "./form/EmployeeFormFields";
import { useEmployeeStore } from "./store/employeeStore";
import { validateFormData, processEmployeeData } from "./form/employeeFormSubmission";
import { calculateEmployeeBenchmarks } from "./EmployeeBenchmarkCalculator";
import { useSkillsMatrixStore } from "../benchmark/skills-matrix/SkillsMatrixState";
import { useToggledSkills } from "../skills/context/ToggledSkillsContext";
import { useCompetencyStateReader } from "../skills/competency/CompetencyStateReader";
import { getEmployeeSkills } from "../benchmark/skills-matrix/initialSkills";

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
      // Process employee data
      const newEmployee = processEmployeeData(formData);
      console.log('Processed employee data:', newEmployee);

      // Initialize skills for the new employee
      const roleSkills = getEmployeeSkills(newEmployee.id);
      console.log('Initialized role skills:', roleSkills);
      
      // Add employee to store
      addEmployee(newEmployee);
      console.log('Employee added to store:', newEmployee);

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
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add Employee</Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Create Employee Profile</DialogTitle>
          <DialogDescription>
            Fill in the employee details below to create a new profile.
          </DialogDescription>
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