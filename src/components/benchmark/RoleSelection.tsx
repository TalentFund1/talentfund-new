import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { professionalLevels, managerialLevels } from "./data/levelData";

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
  const levels = currentTrack === "Professional" ? professionalLevels : managerialLevels;

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
              {levels[selectedLevel.toLowerCase() as keyof typeof levels]}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {Object.entries(levels).map(([id, title]) => (
              <SelectItem key={id} value={id}>
                {title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <RadioGroup
        value={currentTrack}
        onValueChange={onTrackChange}
        className="flex items-center space-x-4"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="Professional" id="professional" />
          <Label htmlFor="professional">Professional</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="Managerial" id="managerial" />
          <Label htmlFor="managerial">Managerial</Label>
        </div>
      </RadioGroup>
    </div>
  );
};