import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface GoalStatusSelectorProps {
  currentGoalStatus: string;
  currentLevel: string;
  onGoalStatusChange: (value: string) => void;
}

export const GoalStatusSelector = ({
  currentGoalStatus,
  currentLevel,
  onGoalStatusChange,
}: GoalStatusSelectorProps) => {
  console.log('Rendering GoalStatusSelector:', {
    currentGoalStatus,
    currentLevel
  });

  const getGoalStatusStyles = (status: string) => {
    const baseStyles = "rounded-b-md px-3 py-1.5 text-xs font-medium w-full capitalize flex items-center justify-center min-h-[26px]";
    
    switch (status) {
      case 'skill_goal':
        return cn(baseStyles, "bg-blue-100 text-blue-800 border-blue-200 border-t-0");
      case 'not_interested':
        return cn(baseStyles, "bg-gray-100 text-gray-800 border-gray-200 border-t-0");
      default:
        return cn(baseStyles, "bg-gray-50 text-gray-600 border-gray-100 border-t-0");
    }
  };

  return (
    <Select value={currentGoalStatus} onValueChange={onGoalStatusChange}>
      <SelectTrigger 
        className={cn(
          getGoalStatusStyles(currentGoalStatus),
          "focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 border-x border-b"
        )}
      >
        <SelectValue>
          {currentGoalStatus === 'not_interested' ? 'Not Interested' : 
           currentGoalStatus === 'skill_goal' ? 'Skill Goal' : 'Unknown'}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="skill_goal" className="cursor-pointer">
          <span className="flex items-center gap-2 text-blue-800">Skill Goal</span>
        </SelectItem>
        <SelectItem value="not_interested" className="cursor-pointer">
          <span className="flex items-center gap-2 text-gray-800">Not Interested</span>
        </SelectItem>
        <SelectItem value="unknown" className="cursor-pointer">
          <span className="flex items-center gap-2 text-gray-600">Unknown</span>
        </SelectItem>
      </SelectContent>
    </Select>
  );
};