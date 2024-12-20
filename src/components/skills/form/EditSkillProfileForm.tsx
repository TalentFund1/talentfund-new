import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { BasicProfileFields } from "./fields/BasicProfileFields";
import { DescriptionFields } from "./fields/DescriptionFields";
import { roleSkills, saveRoleSkills } from '../data/roleSkills';

interface FormData {
  roleId: string;
  roleTitle: string;
  function: string;
  mappedTitle: string;
  occupation: string;
  jobDescription: string;
  roleTrack: "Professional" | "Managerial";
  soc: string;
}

interface EditSkillProfileFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialData: {
    id: string;
    title: string;
    function?: string;
    mappedTitle?: string;
    occupation?: string;
    description?: string;
    roleTrack?: "Professional" | "Managerial";
    soc?: string;
  };
}

export const EditSkillProfileForm = ({
  open,
  onOpenChange,
  initialData
}: EditSkillProfileFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<FormData>({
    roleId: initialData.id || "",
    roleTitle: initialData.title || "",
    function: initialData.function || "Engineering",
    mappedTitle: initialData.mappedTitle || "",
    occupation: initialData.occupation || "",
    jobDescription: initialData.description || "",
    roleTrack: initialData.roleTrack || "Professional",
    soc: initialData.soc || ""
  });

  useEffect(() => {
    if (open) {
      const currentRole = roleSkills[initialData.id];
      console.log('Loading current role data:', currentRole);
      
      setFormData({
        roleId: initialData.id,
        roleTitle: currentRole?.title || initialData.title,
        function: currentRole?.function || initialData.function || "Engineering",
        mappedTitle: currentRole?.mappedTitle || initialData.mappedTitle || "",
        occupation: currentRole?.occupation || initialData.occupation || "",
        jobDescription: currentRole?.description || initialData.description || "",
        roleTrack: currentRole?.roleTrack || initialData.roleTrack || "Professional",
        soc: currentRole?.soc || initialData.soc || ""
      });
    }
  }, [initialData, open]);

  const handleInputChange = (field: keyof FormData, value: string) => {
    console.log(`Updating ${field} with value:`, value);
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submission started - Form data:', formData);

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

    try {
      const existingRole = roleSkills[formData.roleId];
      
      const updatedRole = {
        ...existingRole,
        title: formData.roleTitle,
        soc: formData.soc,
        function: formData.function,
        mappedTitle: formData.mappedTitle,
        occupation: formData.occupation,
        description: formData.jobDescription,
        roleTrack: formData.roleTrack,
        specialized: existingRole?.specialized || [],
        common: existingRole?.common || [],
        certifications: existingRole?.certifications || [],
        skills: existingRole?.skills || []
      };

      console.log('Saving updated role:', updatedRole);

      // Save to localStorage and update global state
      await saveRoleSkills(formData.roleId, updatedRole);

      toast({
        title: "Success",
        description: "Skill profile updated successfully",
      });
      
      // Force a re-render of components using roleSkills
      window.dispatchEvent(new CustomEvent('roleSkillsUpdated', { 
        detail: { roleId: formData.roleId } 
      }));

      onOpenChange(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: "Error",
        description: "Failed to update skill profile",
        variant: "destructive"
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit Skill Profile</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 grid grid-cols-2 gap-4">
              <BasicProfileFields 
                formData={formData}
                handleInputChange={handleInputChange}
                roleSkills={roleSkills}
                isEditing={true}
              />
            </div>

            <DescriptionFields 
              formData={formData}
              handleInputChange={handleInputChange}
            />
          </div>

          <div className="flex justify-end">
            <Button type="submit">Save Changes</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};