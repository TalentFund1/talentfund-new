import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEmployeeStore } from "../../employee/store/employeeStore";
import { useToast } from "@/hooks/use-toast";
import { roleSkills } from "../../skills/data/roleSkills";
import { professionalLevels, managerialLevels } from "../data/levelData";

interface RoleSelectionSectionProps {
  selectedRole: string;
  selectedLevel: string;
  employeeId: string | undefined;
  onRoleChange: (role: string) => void;
  onLevelChange: (level: string) => void;
}

export const RoleSelectionSection = ({
  selectedRole,
  selectedLevel,
  employeeId,
  onRoleChange,
  onLevelChange
}: RoleSelectionSectionProps) => {
  const { toast } = useToast();
  const updateEmployee = useEmployeeStore((state) => state.updateEmployee);
  const employees = useEmployeeStore((state) => state.employees);
  const employee = employeeId ? employees.find(emp => emp.id === employeeId) : undefined;

  // Get all available roles from roleSkills
  const availableRoles = Object.entries(roleSkills).map(([id, data]) => ({
    id,
    title: data.title,
    roleTrack: data.roleTrack || "Professional"
  }));

  console.log('Available roles:', availableRoles);

  const handleRoleChange = (newRole: string) => {
    console.log('Role changed:', { newRole, currentEmployee: employee });
    onRoleChange(newRole);
    
    // Reset level when role changes to ensure track compatibility
    const roleData = roleSkills[newRole as keyof typeof roleSkills];
    const isManagerialRole = roleData?.roleTrack === "Managerial";
    const defaultLevel = isManagerialRole ? "m3" : "p1";
    onLevelChange(defaultLevel);
    
    if (employee) {
      const roleTitle = roleData?.title;
      if (roleTitle) {
        const updatedEmployee = {
          ...employee,
          role: `${roleTitle}: ${defaultLevel.toUpperCase()}`
        };
        updateEmployee(updatedEmployee);
        console.log('Updated employee role:', updatedEmployee.role);
        toast({
          title: "Role Updated",
          description: `Employee role updated to ${updatedEmployee.role}`,
        });
      }
    }
  };

  const handleLevelChange = (newLevel: string) => {
    console.log('Level changed:', { newLevel, currentEmployee: employee });
    onLevelChange(newLevel);
    
    if (employee) {
      const roleTitle = roleSkills[selectedRole as keyof typeof roleSkills]?.title;
      if (roleTitle) {
        const updatedEmployee = {
          ...employee,
          role: `${roleTitle}: ${newLevel.toUpperCase()}`
        };
        updateEmployee(updatedEmployee);
        console.log('Updated employee level:', updatedEmployee.role);
        toast({
          title: "Level Updated",
          description: `Employee level updated to ${newLevel.toUpperCase()}`,
        });
      }
    }
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

  // Determine which levels to show based on role track
  const selectedRoleData = roleSkills[selectedRole as keyof typeof roleSkills];
  const isManagerialRole = selectedRoleData?.roleTrack === "Managerial";
  const availableLevels = isManagerialRole ? managerialLevels : professionalLevels;

  console.log('Role selection state:', {
    selectedRole,
    roleTrack: selectedRoleData?.roleTrack,
    isManagerialRole,
    availableLevels
  });

  return (
    <div className="flex items-center gap-4 mt-4">
      <Select value={selectedRole} onValueChange={handleRoleChange}>
        <SelectTrigger className="w-[400px]">
          <SelectValue placeholder="Select role" />
        </SelectTrigger>
        <SelectContent>
          {availableRoles.map(({ id, title }) => (
            <SelectItem key={id} value={id}>
              {title}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={selectedLevel} onValueChange={handleLevelChange}>
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Select level" />
        </SelectTrigger>
        <SelectContent>
          {Object.entries(availableLevels).map(([key, value]) => (
            <SelectItem key={key} value={key.toLowerCase()}>
              {value} - {getLevelDescription(key)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};