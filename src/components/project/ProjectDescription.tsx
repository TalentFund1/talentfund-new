import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface ProjectDescriptionProps {
  value: string;
  onChange: (value: string) => void;
  onNext: () => void;
}

export const ProjectDescription = ({ value, onChange, onNext }: ProjectDescriptionProps) => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-lg font-medium">1. Describe what you're looking for in a sentence or two.</h2>
        <Textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Describe your project needs..."
          className="min-h-[120px]"
        />
      </div>
      
      <div className="flex justify-end">
        <Button onClick={onNext}>Next</Button>
      </div>
    </div>
  );
};