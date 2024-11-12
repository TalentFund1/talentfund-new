import { Button } from "../ui/button";
import { Avatar } from "../ui/avatar";
import { ChevronLeft, MapPin } from "lucide-react";

interface EmployeeHeaderProps {
  employee: any;
  id: string | undefined;
  navigate: (path: string) => void;
}

export const EmployeeHeader = ({ employee, id, navigate }: EmployeeHeaderProps) => {
  return (
    <div className="flex justify-between items-center mb-4">
      <Button 
        variant="outline" 
        className="flex items-center gap-2 bg-white border-border hover:bg-background"
        onClick={() => navigate('/employees')}
      >
        <ChevronLeft className="h-4 w-4" /> Back
      </Button>
      <div className="flex items-center gap-2 bg-white rounded-lg border border-border px-3 py-1.5">
        <span className="text-sm text-foreground">2/7</span>
      </div>
    </div>
  );
};