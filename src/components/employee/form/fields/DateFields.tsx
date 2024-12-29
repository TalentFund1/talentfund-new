import { Input } from "@/components/ui/input";

interface DateFieldsProps {
  formData: {
    startDate: string;
    termDate: string;
  };
  handleInputChange: (field: string, value: string) => void;
}

export const DateFields = ({ formData, handleInputChange }: DateFieldsProps) => {
  console.log('Date Fields Values:', {
    startDate: formData.startDate,
    termDate: formData.termDate
  });

  return (
    <>
      <div className="space-y-2">
        <label className="text-sm font-medium">Start Date</label>
        <Input 
          type="date"
          value={formData.startDate}
          onChange={(e) => handleInputChange('startDate', e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Term Date</label>
        <Input 
          type="date"
          value={formData.termDate}
          onChange={(e) => handleInputChange('termDate', e.target.value)}
        />
      </div>
    </>
  );
};