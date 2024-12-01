import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { getEmployeeSkills } from "../../benchmark/skills-matrix/initialSkills";
import { useTrack } from "../context/TrackContext";
import { BasicProfileFields } from "./fields/BasicProfileFields";
import { DescriptionFields } from "./fields/DescriptionFields";
import { RoleTrackSelector } from "./fields/RoleTrackSelector";

interface JobTitle {
  title: string;
  mappedTitle: string;
}

export const jobTitles: { [key: string]: JobTitle } = {
  "123": { title: "AI Engineer", mappedTitle: "Machine Learning Engineer" },
  "124": { title: "Backend Engineer", mappedTitle: "Server-Side Developer" },
  "125": { title: "Frontend Engineer", mappedTitle: "UI Developer" },
  "126": { title: "Engineering Manager", mappedTitle: "Technical Project Lead" },
  "127": { title: "DevOps Engineer", mappedTitle: "Infrastructure Engineer" }
};

interface FormData {
  roleId: string;
  roleTitle: string;
  function: string;
  mappedTitle: string;
  occupation: string;
  jobDescription: string;
  skills: string;
  roleTrack: "Professional" | "Managerial";
}

export const AddSkillProfileForm = () => {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const { setTrackForRole } = useTrack();
  const [formData, setFormData] = useState<FormData>({
    roleId: "",
    roleTitle: "",
    function: "Engineering",
    mappedTitle: "",
    occupation: "",
    jobDescription: "",
    skills: "",
    roleTrack: "Professional"
  });

  const handleInputChange = (field: keyof FormData, value: string) => {
    if (field === 'roleId') {
      // When roleId changes, update the mapped title automatically if it exists
      const roleData = jobTitles[value];
      const mappedTitle = roleData?.mappedTitle || formData.mappedTitle;
      console.log('Updating role title mapping:', { roleId: value, mappedTitle });
      setFormData(prev => ({
        ...prev,
        [field]: value,
        mappedTitle
      }));
    } else if (field === 'roleTitle') {
      // When role title changes, update the mapped title for new roles
      console.log('Updating role title:', { roleTitle: value });
      setFormData(prev => ({
        ...prev,
        [field]: value,
        mappedTitle: value
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
    console.log(`Field ${field} updated to:`, value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submission started - Form data:', formData);

    if (!formData.roleId || !formData.function || !formData.mappedTitle || !formData.occupation) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    // Add new role to jobTitles if it doesn't exist
    if (!jobTitles[formData.roleId] && formData.roleTitle) {
      console.log('Adding new role:', { roleId: formData.roleId, roleTitle: formData.roleTitle });
      jobTitles[formData.roleId] = {
        title: formData.roleTitle,
        mappedTitle: formData.mappedTitle
      };
    }

    const mappedSkills = getEmployeeSkills(formData.roleId);
    console.log('Mapped skills:', mappedSkills);

    setTrackForRole(formData.roleId, formData.roleTrack);
    console.log('Role track set:', formData.roleTrack);

    toast({
      title: "Success",
      description: "Skill profile created successfully",
    });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add Profile</Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Create Skill Profile</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <BasicProfileFields 
              formData={formData}
              handleInputChange={handleInputChange}
              jobTitles={jobTitles}
            />
            
            <RoleTrackSelector
              value={formData.roleTrack}
              onChange={(value) => handleInputChange('roleTrack', value)}
            />

            <DescriptionFields 
              formData={formData}
              handleInputChange={handleInputChange}
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