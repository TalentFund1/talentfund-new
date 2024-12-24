import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface RequirementSelectorProps {
  currentRequired: string;
  currentLevel: string;
  onRequirementChange: (value: string) => void;
}

export const RequirementSelector = ({
  currentRequired,
  currentLevel,
  onRequirementChange,
}: RequirementSelectorProps) => {
  console.log('Rendering RequirementSelector:', {
    currentRequired,
    currentLevel
  });

  const getRequirementStyles = (requirement: string) => {
    const baseStyles = "rounded-b-md px-3 py-1.5 text-xs font-medium w-full capitalize flex items-center justify-center min-h-[26px]";
    
    switch (requirement) {
      case 'required':
        return cn(baseStyles, "bg-blue-100 text-blue-800 border-blue-200 border-t-0");
      case 'preferred':
        return cn(baseStyles, "bg-green-100 text-green-800 border-green-200 border-t-0");
      case 'not_interested':
        return cn(baseStyles, "bg-gray-100 text-gray-800 border-gray-200 border-t-0");
      default:
        return cn(baseStyles, "bg-gray-50 text-gray-600 border-gray-100 border-t-0");
    }
  };

  return (
    <Select value={currentRequired} onValueChange={onRequirementChange}>
      <SelectTrigger 
        className={cn(
          getRequirementStyles(currentRequired),
          "focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 border-x border-b"
        )}
      >
        <SelectValue>
          {currentRequired === 'not_interested' ? 'Not Interested' : 
           currentRequired.charAt(0).toUpperCase() + currentRequired.slice(1)}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="required" className="cursor-pointer">
          <span className="flex items-center gap-2 text-blue-800">Required</span>
        </SelectItem>
        <SelectItem value="preferred" className="cursor-pointer">
          <span className="flex items-center gap-2 text-green-800">Preferred</span>
        </SelectItem>
        <SelectItem value="not_interested" className="cursor-pointer">
          <span className="flex items-center gap-2 text-gray-800">Not Interested</span>
        </SelectItem>
      </SelectContent>
    </Select>
  );
};