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
    roleTrack: "Professional" | "Managerial";
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
        <label className="text-sm font-medium">Role Track</label>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <input
              type="radio"
              id="professional"
              value="Professional"
              checked={formData.roleTrack === "Professional"}
              onChange={(e) => handleInputChange('roleTrack', e.target.value)}
              className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
            />
            <label htmlFor="professional" className="text-sm text-gray-700">Professional</label>
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="radio"
              id="managerial"
              value="Managerial"
              checked={formData.roleTrack === "Managerial"}
              onChange={(e) => handleInputChange('roleTrack', e.target.value)}
              className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
            />
            <label htmlFor="managerial" className="text-sm text-gray-700">Managerial</label>
          </div>
        </div>
      </div>

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