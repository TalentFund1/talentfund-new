import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { professionalLevels, managerialLevels } from "@/components/benchmark/data/levelData";

interface RoleLevelFieldsProps {
  formData: {
    role: string;
    level: string;
  };
  handleInputChange: (field: string, value: string) => void;
}

export const RoleLevelFields = ({ formData, handleInputChange }: RoleLevelFieldsProps) => {
  const isManagerialRole = formData.role.toLowerCase().includes('manager') || 
                          formData.role.toLowerCase().includes('director');
  
  const levelOptions = isManagerialRole ? managerialLevels : professionalLevels;

  console.log('Role and Level Selection:', {
    selectedRole: formData.role,
    selectedLevel: formData.level,
    isManagerial: isManagerialRole,
    availableLevels: levelOptions
  });

  return (
    <>
      <div className="space-y-2">
        <label className="text-sm font-medium">Role</label>
        <Select 
          value={formData.role} 
          onValueChange={(value) => {
            console.log('Role selected:', value);
            handleInputChange('role', value);
            // Reset level when role changes
            handleInputChange('level', '');
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="AI Engineer">AI Engineer</SelectItem>
            <SelectItem value="Backend Engineer">Backend Engineer</SelectItem>
            <SelectItem value="Frontend Engineer">Frontend Engineer</SelectItem>
            <SelectItem value="Engineering Manager">Engineering Manager</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Level</label>
        <Select 
          value={formData.level} 
          onValueChange={(value) => handleInputChange('level', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select level" />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(levelOptions).map(([key, value]) => (
              <SelectItem key={key} value={key}>
                {value} - {key === 'p1' ? 'Entry' :
                          key === 'p2' ? 'Developing' :
                          key === 'p3' ? 'Career' :
                          key === 'p4' ? 'Senior' :
                          key === 'p5' ? 'Expert' :
                          key === 'p6' ? 'Principal' :
                          key === 'm3' ? 'Manager' :
                          key === 'm4' ? 'Senior Manager' :
                          key === 'm5' ? 'Director' :
                          key === 'm6' ? 'Senior Director' : ''}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </>
  );
};