import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { createNewProfile, validateProfileData } from "./ProfileDuplicator";
import { useToast } from "@/hooks/use-toast";
import { employees } from "./EmployeeData";
import { professionalLevels, managerialLevels } from "../benchmark/data/levelData";
import { jobTitles } from "../skills/competency/skillProfileData";

export const ProfileCreationWidget = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    role: "",
    level: "",
    department: "Engineering",
    location: "Toronto, ON",
    sex: "male" as 'male' | 'female',
    category: "Full-time",
    manager: "Sus Manu",
    startDate: "",
    office: "Toronto"
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitting new profile:', formData);

    // Combine role and level
    const fullRole = `${jobTitles[formData.role]}: ${formData.level.toUpperCase()}`;
    const profileDataWithFullRole = {
      ...formData,
      role: fullRole
    };

    if (!validateProfileData(profileDataWithFullRole)) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    try {
      const newProfile = createNewProfile(profileDataWithFullRole);
      console.log('Created new profile:', newProfile);
      
      employees.push(newProfile);
      
      toast({
        title: "Success",
        description: "New profile created successfully",
      });

      // Reset form
      setFormData({
        id: "",
        name: "",
        role: "",
        level: "",
        department: "Engineering",
        location: "Toronto, ON",
        sex: "male",
        category: "Full-time",
        manager: "Sus Manu",
        startDate: "",
        office: "Toronto"
      });
    } catch (error) {
      console.error('Error creating profile:', error);
      toast({
        title: "Error",
        description: "Failed to create new profile",
        variant: "destructive"
      });
    }
  };

  const isManagerialRole = formData.role && jobTitles[formData.role].toLowerCase().includes('manager');
  const levels = isManagerialRole ? managerialLevels : professionalLevels;

  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="id">Employee ID</Label>
            <Input
              id="id"
              value={formData.id}
              onChange={(e) => setFormData(prev => ({ ...prev, id: e.target.value }))}
              placeholder="e.g., 127"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Full Name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <Select
              value={formData.role}
              onValueChange={(value) => {
                setFormData(prev => ({
                  ...prev,
                  role: value,
                  level: "" // Reset level when role changes
                }));
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(jobTitles).map(([id, title]) => (
                  <SelectItem key={id} value={id}>
                    {title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="level">Level</Label>
            <Select
              value={formData.level}
              onValueChange={(value) => setFormData(prev => ({ ...prev, level: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select level" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(levels).map(([id, title]) => (
                  <SelectItem key={id} value={id}>
                    {title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="startDate">Start Date</Label>
            <Input
              id="startDate"
              type="date"
              value={formData.startDate}
              onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="sex">Sex</Label>
            <Select
              value={formData.sex}
              onValueChange={(value: 'male' | 'female') => setFormData(prev => ({ ...prev, sex: value }))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select
              value={formData.category}
              onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Full-time">Full-time</SelectItem>
                <SelectItem value="Part-time">Part-time</SelectItem>
                <SelectItem value="Contract">Contract</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex justify-end">
          <Button type="submit">Create Profile</Button>
        </div>
      </form>
    </Card>
  );
};