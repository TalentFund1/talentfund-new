import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { employees } from "../EmployeeTable";

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

    // Here you would typically make an API call to create the employee
    console.log("Creating new employee:", formData);
    
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
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
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
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Employee ID</label>
              <Input 
                placeholder="e.g., 127"
                value={formData.id}
                onChange={(e) => handleInputChange('id', e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Name</label>
              <Input 
                placeholder="Full Name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Location</label>
              <Input 
                placeholder="Toronto, ON"
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Office</label>
              <Select value={formData.office} onValueChange={(value) => handleInputChange('office', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select office" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Toronto">Toronto</SelectItem>
                  <SelectItem value="New York">New York</SelectItem>
                  <SelectItem value="San Francisco">San Francisco</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Department</label>
              <Select value={formData.department} onValueChange={(value) => handleInputChange('department', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Engineering">Engineering</SelectItem>
                  <SelectItem value="Product">Product</SelectItem>
                  <SelectItem value="Design">Design</SelectItem>
                  <SelectItem value="Marketing">Marketing</SelectItem>
                  <SelectItem value="Sales">Sales</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Manager</label>
              <Select value={formData.manager} onValueChange={(value) => handleInputChange('manager', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select manager" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Sus Manu">Sus Manu</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Role</label>
              <Select value={formData.role} onValueChange={(value) => handleInputChange('role', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="AI Engineer">AI Engineer</SelectItem>
                  <SelectItem value="Backend Engineer">Backend Engineer</SelectItem>
                  <SelectItem value="Frontend Engineer">Frontend Engineer</SelectItem>
                  <SelectItem value="Engineering Manager">Engineering Manager</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Level</label>
              <Select value={formData.level} onValueChange={(value) => handleInputChange('level', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="P1">P1 - Entry</SelectItem>
                  <SelectItem value="P2">P2 - Developing</SelectItem>
                  <SelectItem value="P3">P3 - Career</SelectItem>
                  <SelectItem value="P4">P4 - Senior</SelectItem>
                  <SelectItem value="P5">P5 - Expert</SelectItem>
                  <SelectItem value="P6">P6 - Principal</SelectItem>
                  <SelectItem value="M3">M3 - Manager</SelectItem>
                  <SelectItem value="M4">M4 - Senior Manager</SelectItem>
                  <SelectItem value="M5">M5 - Director</SelectItem>
                  <SelectItem value="M6">M6 - Senior Director</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Start Date</label>
              <Input 
                type="date"
                value={formData.startDate}
                onChange={(e) => handleInputChange('startDate', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Term Date</label>
              <Input 
                type="date"
                value={formData.termDate}
                onChange={(e) => handleInputChange('termDate', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Sex</label>
              <Select value={formData.sex} onValueChange={(value) => handleInputChange('sex', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select sex" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Category</label>
              <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Full-time">Full-time</SelectItem>
                  <SelectItem value="Part-time">Part-time</SelectItem>
                  <SelectItem value="Contract">Contract</SelectItem>
                  <SelectItem value="Internship">Internship</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Skills</label>
            <Textarea 
              placeholder="Enter employee skills (separated by commas)"
              value={formData.skills}
              onChange={(e) => handleInputChange('skills', e.target.value)}
              className="min-h-[100px]"
            />
          </div>

          <div className="flex justify-end">
            <Button type="submit">Create Profile</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};