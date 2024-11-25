import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { RoleLevelFields } from "./RoleLevelFields";

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

// Basic input fields component
const BasicFields = ({ formData, handleInputChange }: EmployeeFormFieldsProps) => (
  <>
    <div className="space-y-2">
      <label className="text-sm font-medium">Employee ID</label>
      <Input 
        placeholder="e.g., 127"
        value={formData.id}
        onChange={(e) => handleInputChange('id', e.target.value)}
      />
    </div>
    
    <div className="space-y-2">
      <label className="text-sm font-medium">Name</label>
      <Input 
        placeholder="Full Name"
        value={formData.name}
        onChange={(e) => handleInputChange('name', e.target.value)}
      />
    </div>

    <div className="space-y-2">
      <label className="text-sm font-medium">Location</label>
      <Input 
        placeholder="Toronto, ON"
        value={formData.location}
        onChange={(e) => handleInputChange('location', e.target.value)}
      />
    </div>
  </>
);

// Organization fields component
const OrganizationFields = ({ formData, handleInputChange }: EmployeeFormFieldsProps) => (
  <>
    <div className="space-y-2">
      <label className="text-sm font-medium">Office</label>
      <Select value={formData.office} onValueChange={(value) => handleInputChange('office', value)}>
        <SelectTrigger>
          <SelectValue placeholder="Select office" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Toronto">Toronto</SelectItem>
          <SelectItem value="New York">New York</SelectItem>
          <SelectItem value="San Francisco">San Francisco</SelectItem>
        </SelectContent>
      </Select>
    </div>

    <div className="space-y-2">
      <label className="text-sm font-medium">Department</label>
      <Select value={formData.department} onValueChange={(value) => handleInputChange('department', value)}>
        <SelectTrigger>
          <SelectValue placeholder="Select department" />
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
      <label className="text-sm font-medium">Manager</label>
      <Select value={formData.manager} onValueChange={(value) => handleInputChange('manager', value)}>
        <SelectTrigger>
          <SelectValue placeholder="Select manager" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Sus Manu">Sus Manu</SelectItem>
        </SelectContent>
      </Select>
    </div>
  </>
);

// Date fields component
const DateFields = ({ formData, handleInputChange }: EmployeeFormFieldsProps) => (
  <>
    <div className="space-y-2">
      <label className="text-sm font-medium">Start Date</label>
      <Input 
        type="date"
        value={formData.startDate}
        onChange={(e) => handleInputChange('startDate', e.target.value)}
      />
    </div>

    <div className="space-y-2">
      <label className="text-sm font-medium">Term Date</label>
      <Input 
        type="date"
        value={formData.termDate}
        onChange={(e) => handleInputChange('termDate', e.target.value)}
      />
    </div>
  </>
);

// Personal info fields component
const PersonalInfoFields = ({ formData, handleInputChange }: EmployeeFormFieldsProps) => (
  <>
    <div className="space-y-2">
      <label className="text-sm font-medium">Sex</label>
      <Select value={formData.sex} onValueChange={(value) => handleInputChange('sex', value)}>
        <SelectTrigger>
          <SelectValue placeholder="Select sex" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="male">Male</SelectItem>
          <SelectItem value="female">Female</SelectItem>
        </SelectContent>
      </Select>
    </div>

    <div className="space-y-2">
      <label className="text-sm font-medium">Category</label>
      <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
        <SelectTrigger>
          <SelectValue placeholder="Select category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Full-time">Full-time</SelectItem>
          <SelectItem value="Part-time">Part-time</SelectItem>
          <SelectItem value="Contract">Contract</SelectItem>
          <SelectItem value="Internship">Internship</SelectItem>
        </SelectContent>
      </Select>
    </div>
  </>
);

export const EmployeeFormFields = ({
  formData,
  handleInputChange,
}: EmployeeFormFieldsProps) => {
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