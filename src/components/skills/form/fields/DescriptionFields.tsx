import { Textarea } from "@/components/ui/textarea";

interface DescriptionFieldsProps {
  formData: {
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