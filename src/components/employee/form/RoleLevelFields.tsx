import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { roleSkills } from '../../skills/data/roleSkills';

interface RoleLevelFieldsProps {
  formData: {
    role: string;
    level: string;
  };
  handleInputChange: (field: string, value: string) => void;
}

export const roleMapping = Object.fromEntries(
  Object.entries(roleSkills).map(([id, data]) => [data.occupation, id])
);

export const RoleLevelFields = ({ formData, handleInputChange }: RoleLevelFieldsProps) => {
  const isManagerialRole = formData.role.toLowerCase().includes('manager') || 
                          formData.role.toLowerCase().includes('director');
  
  console.log('Role and Level Fields State:', {
    currentRole: formData.role,
    roleId: roleMapping[formData.role],
    currentLevel: formData.level,
    isManagerialRole
  });

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

  const professionalLevels = {
    'P1': 'P1',
    'P2': 'P2',
    'P3': 'P3',
    'P4': 'P4',
    'P5': 'P5',
    'P6': 'P6'
  };

  const managerialLevels = {
    'M3': 'M3',
    'M4': 'M4',
    'M5': 'M5',
    'M6': 'M6'
  };

  const levelOptions = isManagerialRole ? managerialLevels : professionalLevels;

  // Get unique roles from roleSkills
  const availableRoles = Array.from(new Set(
    Object.values(roleSkills).map(data => data.occupation)
  ));

  return (
    <>
      <div className="space-y-2">
        <label className="text-sm font-medium">Role</label>
        <Select 
          value={formData.role} 
          onValueChange={(value) => {
            console.log('Role selected:', value, 'Role ID:', roleMapping[value]);
            handleInputChange('role', value);
            // Reset level when role changes
            handleInputChange('level', '');
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select role" />
          </SelectTrigger>
          <SelectContent>
            {availableRoles.map((role) => (
              <SelectItem key={role} value={role}>{role}</SelectItem>
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
            {Object.entries(levelOptions).map(([key, value]) => (
              <SelectItem key={key} value={key}>
                {value} - {getLevelDescription(key)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </>
  );
};