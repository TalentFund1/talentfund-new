import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { roleSkills } from '../../skills/data/roleSkills';
import { professionalLevels, managerialLevels } from '../../benchmark/data/levelData';
import { getRoleDefaultTrack } from '../../skills/data/roles/roleDefinitions';

interface RoleLevelFieldsProps {
  formData: {
    role: string;
    level: string;
  };
  handleInputChange: (field: string, value: string) => void;
}

// Create a mapping of role titles to IDs
export const roleMapping = Object.entries(roleSkills).reduce((acc, [id, data]) => {
  acc[data.title] = id;
  return acc;
}, {} as { [key: string]: string });

export const RoleLevelFields = ({
  formData,
  handleInputChange
}: RoleLevelFieldsProps) => {
  // Get all available roles from roleSkills
  const availableRoles = Object.values(roleSkills).map(role => role.title);

  // Get roleId from the selected role title
  const roleId = roleMapping[formData.role];
  
  // Determine if the role is managerial based on its track
  const roleTrack = getRoleDefaultTrack(roleId);
  const isManagerialRole = roleId === "126" || roleId === "128"; // Engineering Manager and Product Leader

  console.log('Role track determination in form:', {
    role: formData.role,
    roleId,
    isManagerialRole,
    track: roleTrack
  });

  const handleRoleChange = (value: string) => {
    console.log('Role selected:', value);
    handleInputChange('role', value);
    
    // Reset level when role changes to ensure track compatibility
    const newRoleId = roleMapping[value];
    const isNewRoleManagerial = newRoleId === "126" || newRoleId === "128";
    const defaultLevel = isNewRoleManagerial ? "m3" : "p1";
    
    console.log('Role changed, reset level', {
      newRole: value,
      newRoleId,
      isManagerial: isNewRoleManagerial,
      defaultLevel
    });
    
    handleInputChange('level', defaultLevel);
  };

  const handleLevelChange = (value: string) => {
    console.log('Level selected:', value);
    handleInputChange('level', value);
  };

  const getLevelDescription = (level: string) => {
    switch (level.toLowerCase()) {
      case 'p1': return 'Entry';
      case 'p2': return 'Developing';
      case 'p3': return 'Career';
      case 'p4': return 'Senior';
      case 'p5': return 'Expert';
      case 'p6': return 'Principal';
      case 'm3': return 'Manager';
      case 'm4': return 'Senior Manager';
      case 'm5': return 'Director';
      case 'm6': return 'Senior Director';
      default: return '';
    }
  };

  // Use the appropriate levels based on the role track
  const levelOptions = isManagerialRole ? managerialLevels : professionalLevels;

  return (
    <>
      <div className="space-y-2">
        <label className="text-sm font-medium">Role</label>
        <Select 
          value={formData.role} 
          onValueChange={handleRoleChange}
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
          value={formData.level.toLowerCase()} 
          onValueChange={handleLevelChange}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select level" />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(levelOptions).map(([key, label]) => (
              <SelectItem key={key} value={key.toLowerCase()}>
                {`${label} - ${getLevelDescription(key)}`}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </>
  );
};