import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FormData } from "../types/FormData";

interface EmploymentFieldsProps {
  formData: FormData;
  onChange: (updates: Partial<FormData>) => void;
}

export const EmploymentFields = ({ formData, onChange }: EmploymentFieldsProps) => {
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="startDate">Start Date</Label>
        <Input
          id="startDate"
          type="date"
          value={formData.startDate}
          onChange={(e) => onChange({ startDate: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="termDate">Term Date</Label>
        <Input
          id="termDate"
          type="date"
          value={formData.termDate}
          onChange={(e) => onChange({ termDate: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="sex">Sex</Label>
        <Select
          value={formData.sex}
          onValueChange={(value: 'male' | 'female') => onChange({ sex: value })}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="male">Male</SelectItem>
            <SelectItem value="female">Female</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="category">Category</Label>
        <Select
          value={formData.category}
          onValueChange={(value) => onChange({ category: value })}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Full-time">Full-time</SelectItem>
            <SelectItem value="Part-time">Part-time</SelectItem>
            <SelectItem value="Contract">Contract</SelectItem>
            <SelectItem value="Internship">Internship</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </>
  );
};