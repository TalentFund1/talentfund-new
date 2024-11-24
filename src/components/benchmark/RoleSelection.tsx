import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { professionalLevels, managerialLevels } from "./data/levelData";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { HelpCircle } from "lucide-react";

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

  const getLevelDescription = (track: "Professional" | "Managerial") => {
    if (track === "Professional") {
      return (
        <div className="space-y-2">
          <p className="font-medium">Professional Track Levels:</p>
          <ul className="text-sm space-y-1">
            <li><span className="font-medium">P1</span> - Entry</li>
            <li><span className="font-medium">P2</span> - Developing</li>
            <li><span className="font-medium">P3</span> - Career</li>
            <li><span className="font-medium">P4</span> - Senior</li>
            <li><span className="font-medium">P5</span> - Expert</li>
            <li><span className="font-medium">P6</span> - Principal</li>
          </ul>
        </div>
      );
    }
    return (
      <div className="space-y-2">
        <p className="font-medium">Managerial Track Levels:</p>
        <ul className="text-sm space-y-1">
          <li><span className="font-medium">M3</span> - Manager</li>
          <li><span className="font-medium">M4</span> - Senior Manager</li>
          <li><span className="font-medium">M5</span> - Director</li>
          <li><span className="font-medium">M6</span> - Senior Director</li>
        </ul>
      </div>
    );
  };

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

        <div className="flex items-center gap-2">
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
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <HelpCircle className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
              </TooltipTrigger>
              <TooltipContent side="right" align="start" className="p-4">
                <div className="space-y-4">
                  {getLevelDescription(currentTrack === "Managerial" ? "Managerial" : "Professional")}
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      <Separator className="my-2" />
    </div>
  );
};