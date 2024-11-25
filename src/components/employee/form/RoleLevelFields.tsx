import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { jobTitles } from "../../skills/competency/skillProfileData";
import { professionalLevels, managerialLevels } from "../../benchmark/data/levelData";
import { FormData } from "../types/FormData";

interface RoleLevelFieldsProps {
  formData: FormData;
  onChange: (updates: Partial<FormData>) => void;
}

export const RoleLevelFields = ({ formData, onChange }: RoleLevelFieldsProps) => {
  const isManagerialRole = formData.role && jobTitles[formData.role].toLowerCase().includes('manager');
  const levels = isManagerialRole ? managerialLevels : professionalLevels;

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
        <Label htmlFor="role">Role</Label>
        <Select
          value={formData.role}
          onValueChange={(value) => onChange({ role: value, level: "" })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select role" />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(jobTitles).map(([id, title]) => (
              <SelectItem key={id} value={id}>
                {title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="level">Level</Label>
        <Select
          value={formData.level}
          onValueChange={(value) => onChange({ level: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select level" />
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
    </>
  );
};