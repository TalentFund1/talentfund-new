import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { BasicProfileFields } from "./fields/BasicProfileFields";
import { DescriptionFields } from "./fields/DescriptionFields";
import { roleSkills } from '../data/roleSkills';

interface FormData {
  roleId: string;
  roleTitle: string;
  function: string;
  mappedTitle: string;
  category: string;
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
    category: "Information Technology",
    jobDescription: "",
    skills: "",
    roleTrack: "Professional",
    soc: ""
  });

  const handleInputChange = (field: keyof FormData, value: string) => {
    console.log(`Updating ${field} with value:`, value);
    
    if (field === 'roleId') {
      const currentRole = roleSkills[value as keyof typeof roleSkills];
      const mappedTitle = currentRole ? `${currentRole.title} Specialist` : '';
      const soc = currentRole?.title === "Software Developer" ? "15-1252" : 
                 currentRole?.title === "Project Manager" ? "11-9041" : 
                 currentRole?.title === "DevOps Engineer" ? "15-1244" : "";
      
      console.log('Updating role mapping:', { roleId: value, mappedTitle, soc });
      setFormData(prev => ({
        ...prev,
        [field]: value,
        mappedTitle,
        soc,
        occupation: currentRole?.title || ''
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
    if (!roleSkills[formData.roleId as keyof typeof roleSkills] && !formData.roleTitle) {
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
      name: formData.roleTitle || roleSkills[formData.roleId as keyof typeof roleSkills]?.title,
      function: formData.function,
      mappedTitle: formData.mappedTitle,
      soc: formData.soc,
      category: formData.category,
      roleTrack: formData.roleTrack,
      description: formData.jobDescription,
      skills: formData.skills.split(',').map(skill => skill.trim()),
      lastUpdated: new Date().toLocaleDateString()
    };

    console.log('Creating new skill profile:', newProfile);

    // Add to roleSkills
    roleSkills[formData.roleId as keyof typeof roleSkills] = {
      title: formData.roleTitle || newProfile.name,
      soc: formData.soc,
      category: formData.category,
      specialized: [],
      common: [],
      certifications: []
    };

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
                roleSkills={roleSkills}
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
