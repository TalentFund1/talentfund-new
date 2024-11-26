import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import { EmployeeFormFields } from "./form/EmployeeFormFields";
import { useEmployeeStore } from "./store/employeeStore";
import { UserPlus } from "lucide-react";

export const AddEmployeeDialog = () => {
  const [open, setOpen] = useState(false);
  const addEmployee = useEmployeeStore((state) => state.addEmployee);

  // Initialize form data
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    location: '',
    office: '',
    department: '',
    manager: '',
    role: '',
    level: '',
    startDate: '',
    termDate: '',
    sex: '',
    category: '',
    skills: ''
  });

  const handleInputChange = (field: string, value: string) => {
    console.log('Input changed:', field, value);
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = () => {
    console.log('Submitting employee data:', formData);
    addEmployee(formData);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <UserPlus className="mr-2 h-4 w-4" />
          Add Employee
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add New Employee</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <EmployeeFormFields 
            formData={formData}
            handleInputChange={handleInputChange}
          />
          <Button onClick={handleSubmit} className="w-full">
            Add Employee
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};