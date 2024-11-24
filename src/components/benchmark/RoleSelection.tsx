import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { professionalLevels, managerialLevels } from "./data/levelData";
import { Separator } from "@/components/ui/separator";

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
  const levels = currentTrack === "Managerial" ? managerialLevels : professionalLevels;

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
      <Separator className="my-2" />
    </div>
  );
};