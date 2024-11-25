import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { professionalLevels, managerialLevels } from "@/components/benchmark/data/levelData";

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

// Split form fields into logical groups
const FormField = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="space-y-2">
    <label className="text-sm font-medium">{label}</label>
    {children}
  </div>
);

// Basic input fields component
const BasicFields = ({ formData, handleInputChange }: EmployeeFormFieldsProps) => (
  <>
    <FormField label="Employee ID">
      <Input 
        placeholder="e.g., 127"
        value={formData.id}
        onChange={(e) => handleInputChange('id', e.target.value)}
      />
    </FormField>
    
    <FormField label="Name">
      <Input 
        placeholder="Full Name"
        value={formData.name}
        onChange={(e) => handleInputChange('name', e.target.value)}
      />
    </FormField>

    <FormField label="Location">
      <Input 
        placeholder="Toronto, ON"
        value={formData.location}
        onChange={(e) => handleInputChange('location', e.target.value)}
      />
    </FormField>
  </>
);

// Organization fields component
const OrganizationFields = ({ formData, handleInputChange }: EmployeeFormFieldsProps) => (
  <>
    <FormField label="Office">
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
    </FormField>

    <FormField label="Department">
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
    </FormField>

    <FormField label="Manager">
      <Select value={formData.manager} onValueChange={(value) => handleInputChange('manager', value)}>
        <SelectTrigger>
          <SelectValue placeholder="Select manager" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Sus Manu">Sus Manu</SelectItem>
        </SelectContent>
      </Select>
    </FormField>
  </>
);

// Role and level fields component
const RoleFields = ({ formData, handleInputChange }: EmployeeFormFieldsProps) => {
  const isManagerialRole = formData.role.toLowerCase().includes('manager') || 
                          formData.role.toLowerCase().includes('director');
  const levelOptions = isManagerialRole ? managerialLevels : professionalLevels;

  console.log('Role and Level Selection:', {
    selectedRole: formData.role,
    selectedLevel: formData.level,
    isManagerial: isManagerialRole,
    availableLevels: levelOptions
  });

  return (
    <>
      <FormField label="Role">
        <Select 
          value={formData.role} 
          onValueChange={(value) => {
            console.log('Role selected:', value);
            handleInputChange('role', value);
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="AI Engineer">AI Engineer</SelectItem>
            <SelectItem value="Backend Engineer">Backend Engineer</SelectItem>
            <SelectItem value="Frontend Engineer">Frontend Engineer</SelectItem>
            <SelectItem value="Engineering Manager">Engineering Manager</SelectItem>
          </SelectContent>
        </Select>
      </FormField>

      <FormField label="Level">
        <Select 
          value={formData.level} 
          onValueChange={(value) => handleInputChange('level', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select level" />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(levelOptions).map(([key, value]) => (
              <SelectItem key={key} value={key}>
                {value} - {key === 'p1' ? 'Entry' :
                          key === 'p2' ? 'Developing' :
                          key === 'p3' ? 'Career' :
                          key === 'p4' ? 'Senior' :
                          key === 'p5' ? 'Expert' :
                          key === 'p6' ? 'Principal' :
                          key === 'm3' ? 'Manager' :
                          key === 'm4' ? 'Senior Manager' :
                          key === 'm5' ? 'Director' :
                          key === 'm6' ? 'Senior Director' : ''}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </FormField>
    </>
  );
};

// Date fields component
const DateFields = ({ formData, handleInputChange }: EmployeeFormFieldsProps) => (
  <>
    <FormField label="Start Date">
      <Input 
        type="date"
        value={formData.startDate}
        onChange={(e) => handleInputChange('startDate', e.target.value)}
      />
    </FormField>

    <FormField label="Term Date">
      <Input 
        type="date"
        value={formData.termDate}
        onChange={(e) => handleInputChange('termDate', e.target.value)}
      />
    </FormField>
  </>
);

// Personal info fields component
const PersonalInfoFields = ({ formData, handleInputChange }: EmployeeFormFieldsProps) => (
  <>
    <FormField label="Sex">
      <Select value={formData.sex} onValueChange={(value) => handleInputChange('sex', value)}>
        <SelectTrigger>
          <SelectValue placeholder="Select sex" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="male">Male</SelectItem>
          <SelectItem value="female">Female</SelectItem>
        </SelectContent>
      </Select>
    </FormField>

    <FormField label="Category">
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
    </FormField>
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
      <RoleFields formData={formData} handleInputChange={handleInputChange} />
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