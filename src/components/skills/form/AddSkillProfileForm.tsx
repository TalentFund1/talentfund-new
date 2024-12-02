import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { BasicProfileFields } from "./fields/BasicProfileFields";
import { DescriptionFields } from "./fields/DescriptionFields";
import { roleSkills } from '../data/roleSkills';

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
  "127": { title: "DevOps Engineer", mappedTitle: "Infrastructure Engineer", soc: "15-1244" },
  "128": { title: "Data Engineer", mappedTitle: "Data Infrastructure Engineer", soc: "15-1243" },
  "129": { title: "Product Manager", mappedTitle: "Product Owner", soc: "15-1255" },
  "130": { title: "DevOps Engineer", mappedTitle: "Infrastructure Engineer", soc: "15-1244" }
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
    console.log(`Updating ${field} with value:`, value);
    
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
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submission started - Form data:', formData);

    // Validate required fields
    const requiredFields: (keyof FormData)[] = ['roleId', 'function', 'mappedTitle', 'occupation', 'soc'];
    const missingFields = requiredFields.filter(field => !formData[field]);
    
    if (missingFields.length > 0) {
      console.log('Validation failed - Missing fields:', missingFields);
      toast({
        title: "Validation Error",
        description: `Please fill in all required fields: ${missingFields.join(', ')}`,
        variant: "destructive"
      });
      return;
    }

    // If it's a new role, validate role title
    if (!jobTitles[formData.roleId] && !formData.roleTitle) {
      console.log('Validation failed - Missing role title for new role');
      toast({
        title: "Validation Error",
        description: "Role Title is required for new roles",
        variant: "destructive"
      });
      return;
    }

    // Create new role profile
    const newProfile = {
      id: formData.roleId,
      name: formData.roleTitle || jobTitles[formData.roleId]?.title,
      function: formData.function,
      mappedTitle: formData.mappedTitle,
      occupation: formData.occupation,
      soc: formData.soc,
      roleTrack: formData.roleTrack,
      description: formData.jobDescription,
      skills: formData.skills.split(',').map(skill => skill.trim()),
      lastUpdated: new Date().toLocaleDateString()
    };

    console.log('Creating new skill profile:', newProfile);

    // Add to roleSkills (you might want to implement this in a state management solution)
    roleSkills[formData.roleId] = {
      specialized: [],
      common: [],
      certifications: [],
      occupation: formData.occupation
    };

    // Add to jobTitles if it's a new role
    if (!jobTitles[formData.roleId]) {
      jobTitles[formData.roleId] = {
        title: formData.roleTitle,
        mappedTitle: formData.mappedTitle,
        soc: formData.soc
      };
    }

    console.log('Profile created successfully');
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