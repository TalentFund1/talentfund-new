import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface PersonalInfoFieldsProps {
  formData: {
    sex: string;
    category: string;
  };
  handleInputChange: (field: string, value: string) => void;
}

export const PersonalInfoFields = ({ formData, handleInputChange }: PersonalInfoFieldsProps) => {
  console.log('Personal Info Fields Values:', {
    sex: formData.sex,
    category: formData.category
  });

  return (
    <>
      <div className="space-y-2">
        <label className="text-sm font-medium">Sex</label>
        <Select value={formData.sex} onValueChange={(value) => handleInputChange('sex', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select sex" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="male">Male</SelectItem>
            <SelectItem value="female">Female</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Category</label>
        <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Full-time">Full-time</SelectItem>
            <SelectItem value="Part-time">Part-time</SelectItem>
            <SelectItem value="Contract">Contract</SelectItem>
            <SelectItem value="Internship">Internship</SelectItem>
            <SelectItem value="Temporary">Temporary</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </>
  );
};