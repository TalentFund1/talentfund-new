import { TableCell } from "@/components/ui/table";
import { Star, Shield, Target, CircleDashed, Heart, X, CircleHelp } from "lucide-react";
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
  const { currentStates } = useSkillsMatrixStore();
  const currentState = currentStates[skillTitle] || {
    level: initialLevel.toLowerCase(),
    requirement: 'required'
  };

  const getLevelIcon = (level: string) => {
    switch (level.toLowerCase()) {
      case 'advanced':
        return <Star className="w-3.5 h-3.5 text-primary-accent" />;
      case 'intermediate':
        return <Shield className="w-3.5 h-3.5 text-primary-icon" />;
      case 'beginner':
        return <Target className="w-3.5 h-3.5 text-[#008000]" />;
      default:
        return <CircleDashed className="w-3.5 h-3.5 text-gray-400" />;
    }
  };

  const getLevelStyles = (level: string) => {
    switch (level.toLowerCase()) {
      case 'advanced':
        return "bg-[#E5DEFF] text-[#1f2144] border-[#E5DEFF]";
      case 'intermediate':
        return "bg-[#FDE1D3] text-[#1f2144] border-[#FDE1D3]";
      case 'beginner':
        return "bg-[#F2FCE2] text-[#1f2144] border-[#F2FCE2]";
      default:
        return "bg-gray-50 text-gray-400 border-gray-100";
    }
  };

  const getRequirementIcon = (requirement: string) => {
    switch (requirement.toLowerCase()) {
      case 'required':
        return <Heart className="w-3.5 h-3.5" />;
      case 'not-interested':
        return <X className="w-3.5 h-3.5" />;
      case 'unknown':
        return <CircleHelp className="w-3.5 h-3.5" />;
      default:
        return <Heart className="w-3.5 h-3.5" />;
    }
  };

  if (isRoleBenchmark) {
    return (
      <TableCell className="border-r border-blue-200 p-0">
        <div className="flex flex-col items-center">
          <div className={`${getLevelStyles(currentState.level)} h-[36px] px-3 py-2 text-sm font-medium w-full capitalize flex items-center justify-center border-b border-blue-200`}>
            <span className="flex items-center gap-2 justify-center text-[13px]">
              {getLevelIcon(currentState.level)}
              {currentState.level.charAt(0).toUpperCase() + currentState.level.slice(1)}
            </span>
          </div>
          <div className="bg-white h-[28px] w-full flex items-center justify-center border-b border-blue-200">
            <span className="flex items-center gap-1.5 justify-center text-xs font-medium text-[#1f2144]">
              {getRequirementIcon(currentState.requirement)}
              {currentState.requirement === 'required' ? 'Skill Goal' : 
               currentState.requirement === 'not-interested' ? 'Not Interested' : 
               currentState.requirement === 'unknown' ? 'Unknown' : 'Skill Goal'}
            </span>
          </div>
        </div>
      </TableCell>
    );
  }

  // Non-role benchmark view with dropdowns
  return (
    <TableCell className="border-r border-blue-200 p-0">
      <div className="flex flex-col items-center">
        <Select value={currentState.level} onValueChange={(value) => onLevelChange?.(value, currentState.requirement)}>
          <SelectTrigger 
            className={`${getLevelStyles(currentState.level)} rounded-t-md px-3 py-1.5 text-sm font-medium w-full capitalize flex items-center justify-center min-h-[28px] text-[#1f2144]`}
          >
            <SelectValue>
              <span className="flex items-center gap-2">
                {getLevelIcon(currentState.level)}
                {currentState.level.charAt(0).toUpperCase() + currentState.level.slice(1)}
              </span>
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="unspecified">
              <span className="flex items-center gap-2">
                <CircleHelp className="w-4 h-4 text-gray-400" />
                Unspecified
              </span>
            </SelectItem>
            <SelectItem value="beginner">
              <span className="flex items-center gap-2">
                {getLevelIcon('beginner')}
                Beginner
              </span>
            </SelectItem>
            <SelectItem value="intermediate">
              <span className="flex items-center gap-2">
                {getLevelIcon('intermediate')}
                Intermediate
              </span>
            </SelectItem>
            <SelectItem value="advanced">
              <span className="flex items-center gap-2">
                {getLevelIcon('advanced')}
                Advanced
              </span>
            </SelectItem>
          </SelectContent>
        </Select>
        <Select value={currentState.requirement} onValueChange={(value) => onLevelChange?.(currentState.level, value)}>
          <SelectTrigger 
            className={getRequirementStyles(currentState.requirement, currentState.level)}
          >
            <SelectValue>
              <span className="flex items-center gap-1.5 justify-center text-xs">
                {getRequirementIcon(currentState.requirement)}
                {currentState.requirement === 'required' ? 'Skill Goal' : 'Preferred'}
              </span>
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="required">
              <span className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5" /> Skill Goal
              </span>
            </SelectItem>
            <SelectItem value="not-interested">
              <span className="flex items-center gap-1.5">
                <X className="w-3.5 h-3.5" /> Not Interested
              </span>
            </SelectItem>
            <SelectItem value="unknown">
              <span className="flex items-center gap-1.5">
                <CircleHelp className="w-3.5 h-3.5" /> Unknown
              </span>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
    </TableCell>
  );
};
