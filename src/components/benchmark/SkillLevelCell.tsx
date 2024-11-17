import { TableCell } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Star, Shield, Target, Heart, CircleDashed, Check, X } from "lucide-react";
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
        return <Star className="w-3.5 h-3.5 text-primary-accent" />;
      case 'intermediate':
        return <Shield className="w-3.5 h-3.5 text-primary-icon" />;
      case 'beginner':
        return <Target className="w-3.5 h-3.5 text-[#008000]" />;
      default:
        return <CircleDashed className="w-3.5 h-3.5 text-gray-400" />;
    }
  };

  const getRequirementIcon = (requirement: string) => {
    switch (requirement.toLowerCase()) {
      case 'required':
        return <Check className="w-3.5 h-3.5" />;
      case 'not-interested':
        return <X className="w-3.5 h-3.5" />;
      case 'unknown':
        return <CircleDashed className="w-3.5 h-3.5" />;
      default:
        return <Heart className="w-3.5 h-3.5" />;
    }
  };

  const getBorderColorClass = (level: string, requirement: string) => {
    if (requirement.toLowerCase() === 'required') {
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
    }
    return 'border-[#e5e7eb]';
  };

  const getRequirementBackgroundClass = (requirement: string) => {
    switch (requirement.toLowerCase()) {
      case 'required':
      case 'skill_goal':
        return 'bg-[#F9FAFB]';
      case 'not-interested':
        return 'bg-[#F9FAFB]';
      case 'unknown':
        return 'bg-[#F9FAFB]';
      default:
        return 'bg-[#F9FAFB]';
    }
  };

  if (isRoleBenchmark) {
    return (
      <TableCell className="border-r border-blue-200 p-0">
        <div className="flex flex-col items-center">
          <div className={`
            rounded-t-md px-3 py-2 text-sm font-medium w-full capitalize flex items-center justify-center min-h-[36px] text-[#1f2144]
            ${currentState.level === 'advanced' ? 'bg-primary-accent/10 border-2 border-primary-accent' : 
              currentState.level === 'intermediate' ? 'bg-primary-icon/10 border-2 border-primary-icon' : 
              currentState.level === 'beginner' ? 'bg-[#008000]/10 border-2 border-[#008000]' : 
              'bg-gray-100/50 border-2 border-gray-400'}
          `}>
            <span className="flex items-center gap-2">
              {getLevelIcon(currentState.level)}
              {currentState.level.charAt(0).toUpperCase() + currentState.level.slice(1)}
            </span>
          </div>

          <div className={`
            text-xs px-2 py-1.5 font-normal text-[#1f2144] w-full flex items-center justify-center gap-1.5 
            border-x-2 border-b-2 min-h-[32px] rounded-b-md
            ${getBorderColorClass(currentState.level, currentState.requirement)}
            ${getRequirementBackgroundClass(currentState.requirement)}
          `}>
            <span className="flex items-center gap-1.5">
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

  return (
    <TableCell className="border-r border-blue-200 p-0">
      <div className="flex flex-col items-center">
        <Select 
          value={currentState.level} 
          onValueChange={(value) => {
            setSkillState(skillTitle, value, currentState.requirement);
            onLevelChange?.(value, currentState.requirement);
          }}
        >
          <SelectTrigger className={`
            rounded-t-md px-3 py-2 text-sm font-medium w-full capitalize flex items-center justify-center min-h-[36px] text-[#1f2144]
            ${currentState.level === 'advanced' ? 'bg-primary-accent/10 border-2 border-primary-accent' : 
              currentState.level === 'intermediate' ? 'bg-primary-icon/10 border-2 border-primary-icon' : 
              currentState.level === 'beginner' ? 'bg-[#008000]/10 border-2 border-[#008000]' : 
              'bg-gray-100/50 border-2 border-gray-400'}
          `}>
            <SelectValue>
              <span className="flex items-center gap-2">
                {getLevelIcon(currentState.level)}
                {currentState.level.charAt(0).toUpperCase() + currentState.level.slice(1)}
              </span>
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {['unspecified', 'beginner', 'intermediate', 'advanced'].map((level) => (
              <SelectItem key={level} value={level}>
                <span className="flex items-center gap-2">
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
            text-xs px-2 py-1.5 font-normal text-[#1f2144] w-full flex items-center justify-center gap-1.5 
            border-x-2 border-b-2 min-h-[32px] rounded-b-md
            ${getBorderColorClass(currentState.level, currentState.requirement)}
            ${getRequirementBackgroundClass(currentState.requirement)}
          `}>
            <SelectValue>
              <span className="flex items-center gap-1.5">
                {getRequirementIcon(currentState.requirement)}
                {currentState.requirement === 'required' ? 'Skill Goal' : 
                 currentState.requirement === 'not-interested' ? 'Not Interested' : 
                 currentState.requirement === 'unknown' ? 'Unknown' : 'Skill Goal'}
              </span>
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {[
              { value: 'required', label: 'Skill Goal' },
              { value: 'not-interested', label: 'Not Interested' },
              { value: 'unknown', label: 'Unknown' }
            ].map(({ value, label }) => (
              <SelectItem key={value} value={value}>
                <span className="flex items-center gap-1.5">
                  {getRequirementIcon(value)}
                  {label}
                </span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </TableCell>
  );
};
