import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface RoleTrackSelectorProps {
  value: "Professional" | "Managerial";
  onChange: (value: "Professional" | "Managerial") => void;
}

export const RoleTrackSelector = ({
  value,
  onChange,
}: RoleTrackSelectorProps) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Role Track</label>
      <RadioGroup
        value={value}
        onValueChange={onChange}
        className="flex space-x-4"
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