import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { RoleLevelFields } from "./RoleLevelFields";
import { BasicFields } from "./fields/BasicFields";
import { OrganizationFields } from "./fields/OrganizationFields";
import { DateFields } from "./fields/DateFields";
import { PersonalInfoFields } from "./fields/PersonalInfoFields";
import { Avatar } from "@/components/ui/avatar";
import { Image } from "lucide-react";
import { useState } from "react";

interface EmployeeFormFieldsProps {
  formData: {
    id: string;
    name: string;
    location: string;
    office: string;
    department: string;
    manager: string;
    role: string;
    level: string;
    startDate: string;
    termDate: string;
    sex: string;
    category: string;
    skills: string;
  };
  handleInputChange: (field: string, value: string) => void;
}

export const EmployeeFormFields = ({
  formData,
  handleInputChange,
}: EmployeeFormFieldsProps) => {
  const [avatarUrl, setAvatarUrl] = useState<string>("");
  const [previewUrl, setPreviewUrl] = useState<string>("");

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPreviewUrl(result);
        handleInputChange('avatar', result);
      };
      reader.readAsDataURL(file);
    }
  };

  console.log('Employee Form Fields - Complete Form Data:', formData);

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="col-span-2 flex flex-col items-center gap-4 mb-4">
        <Avatar className="h-24 w-24">
          {previewUrl ? (
            <img src={previewUrl} alt="Profile" className="h-full w-full object-cover" />
          ) : (
            <img 
              src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=96&h=96" 
              alt="Default Profile" 
              className="h-full w-full object-cover"
            />
          )}
        </Avatar>
        <div className="flex items-center gap-2">
          <Input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
            id="avatar-upload"
          />
          <label
            htmlFor="avatar-upload"
            className="flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground hover:bg-secondary/80 rounded-md cursor-pointer"
          >
            <Image className="h-4 w-4" />
            Upload Photo
          </label>
        </div>
      </div>

      <BasicFields formData={formData} handleInputChange={handleInputChange} />
      <OrganizationFields formData={formData} handleInputChange={handleInputChange} />
      <RoleLevelFields formData={formData} handleInputChange={handleInputChange} />
      <DateFields formData={formData} handleInputChange={handleInputChange} />
      <PersonalInfoFields formData={formData} handleInputChange={handleInputChange} />
      
      <div className="space-y-2 col-span-2">
        <label className="text-sm font-medium">Skills</label>
        <Textarea 
          placeholder="Enter employee skills (separated by commas)"
          value={formData.skills}
          onChange={(e) => handleInputChange('skills', e.target.value)}
          className="min-h-[100px]"
        />
      </div>
    </div>
  );
};