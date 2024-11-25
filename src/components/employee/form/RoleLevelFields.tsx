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
                {title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </>
  );
};