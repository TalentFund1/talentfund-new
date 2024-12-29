import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Employee } from "../types/employeeTypes";
import { useEmployeeStore } from "./store/employeeStore";

export const AddEmployeeDialog = () => {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    location: '',
    office: '',
    department: '',
    manager: '',
    role: '',
    startDate: '',
    termDate: '',
    sex: '',
    category: '',
    team: '',
    type: 'On-site' as const,
    skills: ''
  });

  const { addEmployee } = useEmployeeStore();
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    const newEmployee: Employee = {
      ...formData,
      skillCount: 0,
      benchmark: 0,
      lastUpdated: new Date().toLocaleDateString(),
      sex: formData.sex as 'male' | 'female',
      type: formData.type,
      skills: []
    };

    addEmployee(newEmployee);
    toast({
      title: "Employee Added",
      description: `${formData.name} has been added successfully.`,
    });
    
    setFormData({
      id: '',
      name: '',
      location: '',
      office: '',
      department: '',
      manager: '',
      role: '',
      startDate: '',
      termDate: '',
      sex: '',
      category: '',
      team: '',
      type: 'On-site',
      skills: ''
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add Employee</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Add New Employee</DialogTitle>
        <DialogDescription>
          Fill in the details of the new employee.
        </DialogDescription>
        <div className="space-y-4">
          <Input name="name" placeholder="Name" value={formData.name} onChange={handleChange} />
          <Input name="role" placeholder="Role" value={formData.role} onChange={handleChange} />
          <Input name="department" placeholder="Department" value={formData.department} onChange={handleChange} />
          <Input name="location" placeholder="Location" value={formData.location} onChange={handleChange} />
          <Input name="office" placeholder="Office" value={formData.office} onChange={handleChange} />
          <Input name="manager" placeholder="Manager" value={formData.manager} onChange={handleChange} />
          <Input name="startDate" placeholder="Start Date" value={formData.startDate} onChange={handleChange} />
          <Input name="termDate" placeholder="Term Date" value={formData.termDate} onChange={handleChange} />
          <Input name="sex" placeholder="Sex" value={formData.sex} onChange={handleChange} />
          <Input name="category" placeholder="Category" value={formData.category} onChange={handleChange} />
          <Input name="team" placeholder="Team" value={formData.team} onChange={handleChange} />
          <Input name="skills" placeholder="Skills" value={formData.skills} onChange={handleChange} />
        </div>
        <div className="flex justify-end mt-4 gap-2">
          <Button variant="outline">Cancel</Button>
          <Button onClick={handleSubmit}>Add Employee</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};