import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { professionalLevels, managerialLevels } from "@/components/benchmark/data/levelData";

interface RoleLevelFieldsProps {
  formData: {
    role: string;
    level: string;
  };
  handleInputChange: (field: string, value: string) => void;
}

const roleMapping = {
  "AI Engineer": "123",
  "Backend Engineer": "124",
  "Frontend Engineer": "125",
  "Engineering Manager": "126",
  "DevOps Engineer": "128",
  "Data Engineer": "127"
};

export const RoleLevelFields = ({ formData, handleInputChange }: RoleLevelFieldsProps) => {
  const isManagerialRole = formData.role.toLowerCase().includes('manager') || 
                          formData.role.toLowerCase().includes('director');
  
  const levelOptions = isManagerialRole ? managerialLevels : professionalLevels;

  console.log('Role and Level Fields State:', {
    currentRole: formData.role,
    roleId: roleMapping[formData.role as keyof typeof roleMapping],
    currentLevel: formData.level,
    isManagerialRole,
    availableLevels: levelOptions
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

  return (
    <>
      <div className="space-y-2">
        <label className="text-sm font-medium">Role</label>
        <Select 
          value={formData.role} 
          onValueChange={(value) => {
            console.log('Role selected:', value, 'Role ID:', roleMapping[value as keyof typeof roleMapping]);
            handleInputChange('role', value);
            // Reset level when role changes
            handleInputChange('level', '');
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="AI Engineer">AI Engineer (123)</SelectItem>
            <SelectItem value="Backend Engineer">Backend Engineer (124)</SelectItem>
            <SelectItem value="Frontend Engineer">Frontend Engineer (125)</SelectItem>
            <SelectItem value="Engineering Manager">Engineering Manager (126)</SelectItem>
            <SelectItem value="DevOps Engineer">DevOps Engineer (128)</SelectItem>
            <SelectItem value="Data Engineer">Data Engineer (127)</SelectItem>
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