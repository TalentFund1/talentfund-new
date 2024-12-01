import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

interface DescriptionFieldsProps {
  formData: {
    marketPricer: string;
    jobDescription: string;
    skills: string;
  };
  handleInputChange: (field: string, value: string) => void;
}

export const DescriptionFields = ({
  formData,
  handleInputChange,
}: DescriptionFieldsProps) => {
  return (
    <>
      <div className="space-y-2">
        <label className="text-sm font-medium">Market Pricer</label>
        <Input 
          placeholder="e.g., $184,085"
          value={formData.marketPricer}
          onChange={(e) => handleInputChange('marketPricer', e.target.value)}
        />
      </div>

      <div className="col-span-2 space-y-2">
        <label className="text-sm font-medium">Job Description</label>
        <Textarea 
          placeholder="Enter job description"
          value={formData.jobDescription}
          onChange={(e) => handleInputChange('jobDescription', e.target.value)}
          className="min-h-[100px]"
        />
      </div>

      <div className="col-span-2 space-y-2">
        <label className="text-sm font-medium">Skills</label>
        <Textarea 
          placeholder="Enter skills (separated by commas)"
          value={formData.skills}
          onChange={(e) => handleInputChange('skills', e.target.value)}
          className="min-h-[100px]"
        />
      </div>
    </>
  );
};