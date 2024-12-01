import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface BasicProfileFieldsProps {
  formData: {
    roleId: string;
    function: string;
    mappedTitle: string;
    occupation: string;
  };
  handleInputChange: (field: string, value: string) => void;
}

export const BasicProfileFields = ({
  formData,
  handleInputChange,
}: BasicProfileFieldsProps) => {
  return (
    <>
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
    </>
  );
};