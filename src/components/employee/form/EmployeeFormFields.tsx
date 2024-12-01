import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { RoleLevelFields } from "./RoleLevelFields";
import { BasicFields } from "./fields/BasicFields";
import { OrganizationFields } from "./fields/OrganizationFields";
import { DateFields } from "./fields/DateFields";
import { PersonalInfoFields } from "./fields/PersonalInfoFields";

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
  console.log('Employee Form Fields - Complete Form Data:', formData);

  return (
    <div className="grid grid-cols-2 gap-4">
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