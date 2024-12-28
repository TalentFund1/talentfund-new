import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { roleSkills } from '../../skills/data/roleSkills';
import { professionalLevels, managerialLevels } from '../../benchmark/data/levelData';
import { formatLevel } from '../utils/employeeTrackUtils';
import { getRoleDefaultTrack } from '../../skills/data/roles/roleDefinitions';

interface RoleLevelFieldsProps {
  formData: {
    role: string;
    level: string;
  };
  handleInputChange: (field: string, value: string) => void;
}

// Create a mapping of role titles to IDs and export it for other components
export const roleMapping = Object.entries(roleSkills).reduce((acc, [id, data]) => {
  acc[data.title] = id;
  return acc;
}, {} as { [key: string]: string });

export const RoleLevelFields = ({
  formData,
  handleInputChange
}: RoleLevelFieldsProps) => {
  // Get available roles from roleSkills
  const availableRoles = Object.values(roleSkills).map(role => role.title);

  // Determine if the selected role is managerial
  const getRoleTrack = (roleTitle: string) => {
    const roleId = roleMapping[roleTitle];
    return getRoleDefaultTrack(roleId);
  };

  const isManagerialRole = getRoleTrack(formData.role) === "Managerial";
  console.log('Role track determination:', {
    role: formData.role,
    roleId: roleMapping[formData.role],
    isManagerialRole,
    track: getRoleTrack(formData.role)
  });

  // Use the appropriate levels based on the role track
  const levelOptions = isManagerialRole ? managerialLevels : professionalLevels;

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

  const handleRoleChange = (value: string) => {
    console.log('Role selected:', value);
    handleInputChange('role', value);
    
    // Reset level when role changes to ensure track compatibility
    const newRoleTrack = getRoleTrack(value);
    const defaultLevel = newRoleTrack === "Managerial" ? "m3" : "p1";
    console.log('Resetting level for new role:', {
      newRole: value,
      track: newRoleTrack,
      defaultLevel
    });
    handleInputChange('level', defaultLevel);
  };

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
          onValueChange={(value) => {
            console.log('Level selected:', value);
            handleInputChange('level', value.toLowerCase());
          }}
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