import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

interface FormData {
  roleId: string;
  function: string;
  mappedTitle: string;
  occupation: string;
  skills: string;
}

export const AddSkillProfileForm = () => {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    roleId: "",
    function: "Engineering",
    mappedTitle: "",
    occupation: "",
    skills: ""
  });

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    console.log(`Field ${field} updated to:`, value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submission started - Form data:', formData);

    // Basic validation
    if (!formData.roleId || !formData.function || !formData.mappedTitle || !formData.occupation) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    // TODO: Add profile creation logic here
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
            <div className="space-y-2">
              <label className="text-sm font-medium">Role ID</label>
              <Input 
                placeholder="e.g., 123"
                value={formData.roleId}
                onChange={(e) => handleInputChange('roleId', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Function</label>
              <Select 
                value={formData.function} 
                onValueChange={(value) => handleInputChange('function', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select function" />
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
              <label className="text-sm font-medium">Mapped Title</label>
              <Input 
                placeholder="e.g., Software Engineer"
                value={formData.mappedTitle}
                onChange={(e) => handleInputChange('mappedTitle', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Occupation</label>
              <Input 
                placeholder="e.g., Software Developer"
                value={formData.occupation}
                onChange={(e) => handleInputChange('occupation', e.target.value)}
              />
            </div>

            <div className="col-span-2 space-y-2">
              <label className="text-sm font-medium">Skills</label>
              <Textarea 
                placeholder="Enter skills (separated by commas)"
                value={formData.skills}
                onChange={(e) => handleInputChange('skills', e.target.value)}
                className="min-h-[100px]"
              />
            </div>
          </div>

          <div className="flex justify-end">
            <Button type="submit">Create Profile</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};