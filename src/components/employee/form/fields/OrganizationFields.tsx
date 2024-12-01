import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface OrganizationFieldsProps {
  formData: {
    office: string;
    department: string;
    manager: string;
  };
  handleInputChange: (field: string, value: string) => void;
}

export const OrganizationFields = ({ formData, handleInputChange }: OrganizationFieldsProps) => {
  console.log('Organization Fields Values:', {
    office: formData.office,
    department: formData.department,
    manager: formData.manager
  });

  return (
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
};