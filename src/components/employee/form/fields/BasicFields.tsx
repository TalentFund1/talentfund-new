import { Input } from "@/components/ui/input";

interface BasicFieldsProps {
  formData: {
    id: string;
    name: string;
    location: string;
  };
  handleInputChange: (field: string, value: string) => void;
}

export const BasicFields = ({ formData, handleInputChange }: BasicFieldsProps) => {
  console.log('Basic Fields Values:', {
    id: formData.id,
    name: formData.name,
    location: formData.location
  });

  return (
    <>
      <div className="space-y-2">
        <label className="text-sm font-medium">Employee ID</label>
        <Input 
          placeholder="e.g., 127"
          value={formData.id}
          onChange={(e) => handleInputChange('id', e.target.value)}
        />
      </div>
      
      <div className="space-y-2">
        <label className="text-sm font-medium">Name</label>
        <Input 
          placeholder="Full Name"
          value={formData.name}
          onChange={(e) => handleInputChange('name', e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Location</label>
        <Input 
          placeholder="Toronto, ON"
          value={formData.location}
          onChange={(e) => handleInputChange('location', e.target.value)}
        />
      </div>
    </>
  );
};