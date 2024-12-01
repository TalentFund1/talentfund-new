import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const companyFunctions = [
  "Engineering",
  "Product",
  "Design",
  "Marketing",
  "Sales",
  "Finance",
  "Human Resources",
  "Operations",
  "Legal",
  "Customer Success"
];

interface BasicProfileFieldsProps {
  formData: {
    roleId: string;
    roleTitle: string;
    function: string;
    mappedTitle: string;
    occupation: string;
  };
  handleInputChange: (field: string, value: string) => void;
  jobTitles: { [key: string]: string };
}

export const BasicProfileFields = ({
  formData,
  handleInputChange,
  jobTitles
}: BasicProfileFieldsProps) => {
  const isNewRole = !jobTitles[formData.roleId];

  return (
    <>
      <div className="space-y-2">
        <label className="text-sm font-medium">Role ID</label>
        <Input 
          placeholder="e.g., 128"
          value={formData.roleId}
          onChange={(e) => handleInputChange('roleId', e.target.value)}
        />
      </div>

      {isNewRole && (
        <div className="space-y-2">
          <label className="text-sm font-medium">Role Title</label>
          <Input 
            placeholder="e.g., Data Engineer"
            value={formData.roleTitle}
            onChange={(e) => handleInputChange('roleTitle', e.target.value)}
          />
        </div>
      )}

      <div className="space-y-2">
        <label className="text-sm font-medium">Function</label>
        <Select 
          value={formData.function} 
          onValueChange={(value) => handleInputChange('function', value)}
        >
          <SelectTrigger className="bg-white">
            <SelectValue placeholder="Select function" />
          </SelectTrigger>
          <SelectContent>
            {companyFunctions.map((func) => (
              <SelectItem key={func} value={func}>
                {func}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Mapped Title</label>
        <Input 
          placeholder="e.g., Software Engineer"
          value={formData.mappedTitle}
          onChange={(e) => handleInputChange('mappedTitle', e.target.value)}
          readOnly
          className="bg-gray-50"
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