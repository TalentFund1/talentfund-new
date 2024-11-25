import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { createNewProfile, validateProfileData } from "./ProfileDuplicator";
import { useToast } from "@/hooks/use-toast";
import { employees } from "./EmployeeData";
import { jobTitles } from "../skills/competency/skillProfileData";
import { BasicInfoFields } from "./form/BasicInfoFields";
import { RoleLevelFields } from "./form/RoleLevelFields";
import { OrganizationFields } from "./form/OrganizationFields";
import { EmploymentFields } from "./form/EmploymentFields";
import { SkillsFields } from "./form/SkillsFields";
import { useState } from "react";
import { FormData } from "./types/FormData";

export const ProfileCreationWidget = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<FormData>({
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
    termDate: "",
    office: "Toronto",
    skills: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitting new profile:', formData);

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
        termDate: "",
        office: "Toronto",
        skills: ""
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

  const handleFormChange = (updates: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <BasicInfoFields formData={formData} onChange={handleFormChange} />
          <RoleLevelFields formData={formData} onChange={handleFormChange} />
          <OrganizationFields formData={formData} onChange={handleFormChange} />
          <EmploymentFields formData={formData} onChange={handleFormChange} />
          <SkillsFields formData={formData} onChange={handleFormChange} />
        </div>

        <div className="flex justify-end">
          <Button type="submit">Create Profile</Button>
        </div>
      </form>
    </Card>
  );
};