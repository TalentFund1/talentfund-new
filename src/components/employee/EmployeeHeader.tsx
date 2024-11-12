import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

interface EmployeeHeaderProps {
  onBack: () => void;
}

export const EmployeeHeader = ({ onBack }: EmployeeHeaderProps) => {
  return (
    <div className="flex justify-between items-center mb-4">
      <Button 
        variant="outline" 
        className="flex items-center gap-2 bg-white border-border hover:bg-background"
        onClick={onBack}
      >
        <ChevronLeft className="h-4 w-4" /> Back
      </Button>
      <div className="flex items-center gap-2 bg-white rounded-lg border border-border px-3 py-1.5">
        <span className="text-sm text-foreground">2/7</span>
      </div>
    </div>
  );
};