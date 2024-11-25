import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FormData } from "../types/FormData";

interface SkillsFieldsProps {
  formData: FormData;
  onChange: (updates: Partial<FormData>) => void;
}

export const SkillsFields = ({ formData, onChange }: SkillsFieldsProps) => {
  return (
    <div className="col-span-2 space-y-2">
      <Label htmlFor="skills">Skills</Label>
      <Textarea
        id="skills"
        value={formData.skills}
        onChange={(e) => onChange({ skills: e.target.value })}
        placeholder="Enter employee skills (separated by commas)"
        className="min-h-[150px] resize-y"
      />
    </div>
  );
};