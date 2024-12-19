import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEmployeeStore } from "../../employee/store/employeeStore";
import { useToast } from "@/hooks/use-toast";
import { roleSkills, ROLE_DEFINITIONS } from "../../skills/data/roleSkills";
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

  const handleRoleChange = (newRole: string) => {
    console.log('Role changed:', { newRole, currentEmployee: employee });
    onRoleChange(newRole);
    
    if (employee) {
      const roleTitle = Object.entries(roleSkills).find(([id]) => id === newRole)?.[1]?.title;
      if (roleTitle) {
        const updatedEmployee = {
          ...employee,
          role: `${roleTitle}: ${selectedLevel.toUpperCase()}`
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
      const roleTitle = Object.entries(roleSkills).find(([id]) => id === selectedRole)?.[1]?.title;
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

  // Determine which levels to show based on role type
  const isManagerialRole = selectedRole === "126"; // Engineering Manager ID
  const availableLevels = isManagerialRole ? managerialLevels : professionalLevels;

  return (
    <div className="flex items-center gap-4 mt-4">
      <Select value={selectedRole} onValueChange={handleRoleChange}>
        <SelectTrigger className="w-[400px]">
          <SelectValue placeholder="Select role" />
        </SelectTrigger>
        <SelectContent>
          {Object.entries(ROLE_DEFINITIONS).map(([id, { title }]) => (
            <SelectItem key={id} value={id}>{title}</SelectItem>
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