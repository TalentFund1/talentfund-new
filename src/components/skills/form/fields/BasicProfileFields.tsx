import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RoleTrackSelector } from "./RoleTrackSelector";

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
    soc: string;
    roleTrack: "Professional" | "Managerial";
  };
  handleInputChange: (field: string, value: string) => void;
  roleSkills: any;
  isEditing?: boolean;
}

export const BasicProfileFields = ({
  formData,
  handleInputChange,
  roleSkills,
  isEditing = false
}: BasicProfileFieldsProps) => {
  const isNewRole = !roleSkills[formData.roleId];

  return (
    <>
      <div className="space-y-2">
        <label className="text-sm font-medium">Role ID</label>
        <Input 
          placeholder="e.g., 128"
          value={formData.roleId}
          onChange={(e) => handleInputChange('roleId', e.target.value)}
          readOnly={isEditing}
          className={isEditing ? "bg-gray-100" : ""}
        />
      </div>

      {(isNewRole || isEditing) && (
        <div className="space-y-2">
          <label className="text-sm font-medium">Role Title</label>
          <Input 
            placeholder="e.g., Data Engineer"
            value={formData.roleTitle}
            onChange={(e) => handleInputChange('roleTitle', e.target.value)}
          />
        </div>
      )}

      <div className="col-span-2">
        <RoleTrackSelector
          value={formData.roleTrack}
          onChange={(value) => handleInputChange('roleTrack', value)}
        />
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
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">SOC</label>
        <Input 
          placeholder="e.g., 15-1251"
          value={formData.soc}
          onChange={(e) => handleInputChange('soc', e.target.value)}
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