import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { professionalLevels, managerialLevels } from "./data/levelData";
import { Separator } from "@/components/ui/separator";
import { useEffect } from "react";

interface RoleSelectionProps {
  selectedRole: string;
  selectedLevel: string;
  currentTrack: string;
  onRoleChange: (value: string) => void;
  onLevelChange: (value: string) => void;
  onTrackChange: (value: string) => void;
  roles: Record<string, string>;
}

export const RoleSelection = ({
  selectedRole,
  selectedLevel,
  currentTrack,
  onRoleChange,
  onLevelChange,
  onTrackChange,
  roles
}: RoleSelectionProps) => {
  // Determine if the selected role is managerial
  const isManagerialRole = selectedRole === "126"; // Engineering Manager ID

  // Set appropriate levels based on role type
  const levels = isManagerialRole ? managerialLevels : professionalLevels;

  // Effect to handle level changes when switching role types
  useEffect(() => {
    if (isManagerialRole && !selectedLevel.toLowerCase().startsWith('m')) {
      // If switching to managerial role, set default managerial level
      onLevelChange('m3');
    } else if (!isManagerialRole && !selectedLevel.toLowerCase().startsWith('p')) {
      // If switching to professional role, set default professional level
      onLevelChange('p4');
    }
  }, [isManagerialRole, selectedLevel, onLevelChange]);

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

  console.log('RoleSelection render:', {
    selectedRole,
    selectedLevel,
    isManagerialRole,
    availableLevels: Object.keys(levels)
  });

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4 w-full max-w-[800px]">
        <Select 
          value={selectedRole}
          onValueChange={onRoleChange}
        >
          <SelectTrigger className="w-full bg-white">
            <SelectValue placeholder="Select Role">
              {roles[selectedRole]}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {Object.entries(roles).map(([id, title]) => (
              <SelectItem key={id} value={id}>
                {title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={selectedLevel}
          onValueChange={onLevelChange}
        >
          <SelectTrigger className="w-[200px] bg-white">
            <SelectValue placeholder="Select Level">
              {levels[selectedLevel.toLowerCase() as keyof typeof levels]} - {getLevelDescription(selectedLevel)}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {Object.entries(levels).map(([id, title]) => (
              <SelectItem key={id} value={id}>
                <span className="flex items-center justify-between w-full">
                  <span>{title}</span>
                  <span className="text-muted-foreground ml-2">- {getLevelDescription(id)}</span>
                </span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Separator className="my-2" />
    </div>
  );
};