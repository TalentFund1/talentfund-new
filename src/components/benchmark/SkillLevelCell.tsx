import { TableCell } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Star, Shield, Target, Heart, CircleDashed, Check } from "lucide-react";
import { useSkillLevelState } from "./skill-level/SkillLevelState";
import { useSkillsMatrixStore } from "./skills-matrix/SkillsMatrixState";

interface SkillLevelCellProps {
  initialLevel: string;
  skillTitle: string;
  onLevelChange?: (newLevel: string, requirement: string) => void;
  isRoleBenchmark?: boolean;
}

export const SkillLevelCell = ({ 
  initialLevel, 
  skillTitle, 
  onLevelChange,
  isRoleBenchmark = false
}: SkillLevelCellProps) => {
  const { getCurrentState } = useSkillLevelState(skillTitle);
  const { currentStates, setSkillState } = useSkillsMatrixStore();
  const currentState = currentStates[skillTitle] || {
    level: initialLevel.toLowerCase(),
    requirement: 'required'
  };

  const getLevelIcon = (level: string) => {
    switch (level.toLowerCase()) {
      case 'advanced':
        return <Star className="w-4 h-4 text-primary-accent" />;
      case 'intermediate':
        return <Shield className="w-4 h-4 text-primary-icon" />;
      case 'beginner':
        return <Target className="w-4 h-4 text-[#008000]" />;
      default:
        return <CircleDashed className="w-4 h-4 text-gray-400" />;
    }
  };

  const getBorderColorClass = (level: string, requirement: string) => {
    switch (level.toLowerCase()) {
      case 'advanced':
        return 'border-primary-accent';
      case 'intermediate':
        return 'border-primary-icon';
      case 'beginner':
        return 'border-[#008000]';
      default:
        return 'border-gray-400';
    }
  };

  return (
    <TableCell className="border-r border-blue-200 p-1.5">
      <div className="flex flex-col items-center">
        <Select 
          value={currentState.level} 
          onValueChange={(value) => {
            setSkillState(skillTitle, value, currentState.requirement);
            onLevelChange?.(value, currentState.requirement);
          }}
        >
          <SelectTrigger className={`
            rounded-t-lg px-4 py-2 text-sm font-medium w-full capitalize flex items-center justify-center min-h-[38px] text-[#1f2144]
            ${currentState.level === 'advanced' ? 'bg-primary-accent/10 border-2 border-primary-accent' : 
              currentState.level === 'intermediate' ? 'bg-primary-icon/10 border-2 border-primary-icon' : 
              currentState.level === 'beginner' ? 'bg-[#008000]/10 border-2 border-[#008000]' : 
              'bg-gray-100/50 border-2 border-gray-400'}
            border-b-0 focus:ring-0 focus:ring-offset-0 focus-visible:ring-0
          `}>
            <SelectValue>
              <span className="flex items-center gap-2.5">
                {getLevelIcon(currentState.level)}
                {currentState.level.charAt(0).toUpperCase() + currentState.level.slice(1)}
              </span>
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {['unspecified', 'beginner', 'intermediate', 'advanced'].map((level) => (
              <SelectItem key={level} value={level}>
                <span className="flex items-center gap-2.5">
                  {getLevelIcon(level)}
                  {level.charAt(0).toUpperCase() + level.slice(1)}
                </span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select 
          value={currentState.requirement}
          onValueChange={(value) => {
            setSkillState(skillTitle, currentState.level, value);
            onLevelChange?.(currentState.level, value);
          }}
        >
          <SelectTrigger className={`
            text-sm px-4 py-2 font-normal text-[#1f2144] w-full flex items-center justify-center gap-2 
            border-x-2 border-b-2 min-h-[34px] rounded-b-lg -mt-[2px]
            ${getBorderColorClass(currentState.level, currentState.requirement)}
            ${currentState.requirement === 'required' ? 'bg-gray-100/90' : 'bg-[#F9FAFB]'}
            focus:ring-0 focus:ring-offset-0 focus-visible:ring-0
          `}>
            <SelectValue>
              <span className="flex items-center gap-2">
                {currentState.requirement === 'required' ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Required</span>
                  </>
                ) : (
                  <>
                    <Heart className="w-3.5 h-3.5" />
                    <span>Preferred</span>
                  </>
                )}
              </span>
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="required">
              <span className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5" /> Required
              </span>
            </SelectItem>
            <SelectItem value="preferred">
              <span className="flex items-center gap-2">
                <Heart className="w-3.5 h-3.5" /> Preferred
              </span>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
    </TableCell>
  );
};