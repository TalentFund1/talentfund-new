import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { roleSkills } from '../../skills/data/roleSkills';
import { professionalLevels, managerialLevels } from '../../benchmark/data/levelData';
import { useTrack } from "../../skills/context/TrackContext";

interface RoleLevelFieldsProps {
  formData: {
    role: string;
    level: string;
  };
  handleInputChange: (field: string, value: string) => void;
}

export const roleMapping = Object.entries(roleSkills).reduce((acc, [id, data]) => {
  acc[data.title] = id;
  return acc;
}, {} as { [key: string]: string });

export const RoleLevelFields = ({ formData, handleInputChange }: RoleLevelFieldsProps) => {
  const { getTrackForRole } = useTrack();

  // Get available roles from roleSkills
  const availableRoles = Object.values(roleSkills).map(role => role.title);

  console.log('RoleLevelFields rendering with:', {
    currentRole: formData.role,
    currentLevel: formData.level,
    availableRoles
  });

  const isManagerialRole = formData.role.toLowerCase().includes('manager');
  const track = isManagerialRole ? "Managerial" : "Professional";

  // Get levels based on track
  const levelOptions = track === "Managerial" ? managerialLevels : professionalLevels;

  return (
    <>
      <div className="space-y-2">
        <label className="text-sm font-medium">Role</label>
        <Select 
          value={formData.role} 
          onValueChange={(value) => {
            console.log('Role selected:', value, 'Role ID:', roleMapping[value]);
            handleInputChange('role', value);
            // Reset level when role changes to ensure proper track-based level selection
            handleInputChange('level', '');
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select role" />
          </SelectTrigger>
          <SelectContent>
            {availableRoles.map(role => (
              <SelectItem key={role} value={role}>
                {role}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Level</label>
        <Select 
          value={formData.level} 
          onValueChange={(value) => {
            console.log('Level selected:', value);
            handleInputChange('level', value);
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select level" />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(levelOptions).map(([key, label]) => (
              <SelectItem key={key} value={key}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </>
  );
};