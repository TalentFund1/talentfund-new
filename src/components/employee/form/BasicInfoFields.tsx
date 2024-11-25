import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormData } from "../types/FormData";

interface BasicInfoFieldsProps {
  formData: FormData;
  onChange: (updates: Partial<FormData>) => void;
}

export const BasicInfoFields = ({ formData, onChange }: BasicInfoFieldsProps) => {
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="id">Employee ID</Label>
        <Input
          id="id"
          value={formData.id}
          onChange={(e) => onChange({ id: e.target.value })}
          placeholder="e.g., 127"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => onChange({ name: e.target.value })}
          placeholder="Full Name"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="location">Location</Label>
        <Input
          id="location"
          value={formData.location}
          onChange={(e) => onChange({ location: e.target.value })}
          placeholder="e.g., Toronto, ON"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="office">Office</Label>
        <Input
          id="office"
          value={formData.office}
          onChange={(e) => onChange({ office: e.target.value })}
          placeholder="e.g., Toronto"
        />
      </div>
    </>
  );
};