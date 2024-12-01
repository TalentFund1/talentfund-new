import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { BasicProfileFields } from "./fields/BasicProfileFields";
import { DescriptionFields } from "./fields/DescriptionFields";
import { RoleTrackSelector } from "./fields/RoleTrackSelector";

export interface JobTitle {
  title: string;
  mappedTitle: string;
  soc?: string;
}

export const jobTitles: { [key: string]: JobTitle } = {
  "123": { title: "AI Engineer", mappedTitle: "Machine Learning Engineer", soc: "11-9041" },
  "124": { title: "Backend Engineer", mappedTitle: "Server-Side Developer", soc: "15-1251" },
  "125": { title: "Frontend Engineer", mappedTitle: "UI Developer", soc: "15-1252" },
  "126": { title: "Engineering Manager", mappedTitle: "Technical Project Lead", soc: "11-9041" },
  "127": { title: "DevOps Engineer", mappedTitle: "Infrastructure Engineer", soc: "15-1244" }
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
  soc: string;
}

export const AddSkillProfileForm = () => {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    roleId: "",
    roleTitle: "",
    function: "Engineering",
    mappedTitle: "",
    occupation: "",
    jobDescription: "",
    skills: "",
    roleTrack: "Professional",
    soc: ""
  });

  const handleInputChange = (field: keyof FormData, value: string) => {
    if (field === 'roleId') {
      const roleData = jobTitles[value];
      const mappedTitle = roleData?.mappedTitle || formData.mappedTitle;
      const soc = roleData?.soc || formData.soc;
      console.log('Updating role title mapping:', { roleId: value, mappedTitle, soc });
      setFormData(prev => ({
        ...prev,
        [field]: value,
        mappedTitle,
        soc
      }));
    } else if (field === 'roleTitle') {
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

    if (!formData.roleId || !formData.function || !formData.mappedTitle || !formData.occupation || !formData.soc) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    if (!jobTitles[formData.roleId] && formData.roleTitle) {
      console.log('Adding new role:', { roleId: formData.roleId, roleTitle: formData.roleTitle });
      jobTitles[formData.roleId] = {
        title: formData.roleTitle,
        mappedTitle: formData.mappedTitle,
        soc: formData.soc
      };
    }

    const mappedSkills = formData.skills.split(',').map(skill => skill.trim());
    console.log('Mapped skills:', mappedSkills);

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
            <div className="col-span-2 grid grid-cols-2 gap-4">
              <BasicProfileFields 
                formData={formData}
                handleInputChange={handleInputChange}
                jobTitles={jobTitles}
              />
            </div>

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