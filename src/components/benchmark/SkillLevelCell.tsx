import { TableCell } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Star, Shield, Target, CircleDashed, X, Heart } from "lucide-react";
import { useSkillsMatrixStore } from "./skills-matrix/SkillsMatrixState";
import { SkillRequirement } from "../employee/types/employeeSkillTypes";

interface SkillLevelCellProps {
  initialLevel: string;
  skillTitle: string;
  onLevelChange?: (newLevel: string, requirement: SkillRequirement) => void;
  isRoleBenchmark?: boolean;
}

export const SkillLevelCell = ({ 
  initialLevel, 
  skillTitle, 
  onLevelChange,
  isRoleBenchmark = false
}: SkillLevelCellProps) => {
  const { currentStates, setSkillState, initializeState } = useSkillsMatrixStore();

  // Initialize the state when the component mounts
  initializeState(skillTitle, initialLevel?.toLowerCase() || 'unspecified', 'required' as SkillRequirement);

  const currentState = currentStates[skillTitle] || {
    level: initialLevel?.toLowerCase() || 'unspecified',
    requirement: 'required' as SkillRequirement
  };

  const getLevelIcon = (level: string) => {
    switch (level?.toLowerCase()) {
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

  const getRequirementIcon = (requirement: string = 'unknown') => {
    switch (requirement?.toLowerCase()) {
      case 'required':
        return <Heart className="w-3.5 h-3.5" />;
      case 'not-interested':
        return <X className="w-3.5 h-3.5" />;
      default:
        return <CircleDashed className="w-3.5 h-3.5" />;
    }
  };

  const getLevelStyles = (level: string) => {
    const baseStyles = 'rounded-t-md px-3 py-2 text-sm font-medium w-full capitalize flex items-center justify-center min-h-[36px] text-[#1f2144]';
    
    switch (level?.toLowerCase()) {
      case 'advanced':
        return `${baseStyles} border-2 border-primary-accent bg-primary-accent/10`;
      case 'intermediate':
        return `${baseStyles} border-2 border-primary-icon bg-primary-icon/10`;
      case 'beginner':
        return `${baseStyles} border-2 border-[#008000] bg-[#008000]/10`;
      default:
        return `${baseStyles} border-2 border-gray-400 bg-gray-100/50`;
    }
  };

  const getRequirementStyles = (requirement: string, level: string) => {
    const baseStyles = 'text-xs px-2 py-1.5 font-normal text-[#1f2144] w-full flex items-center justify-center gap-1.5 border-x-2 border-b-2 min-h-[32px] rounded-b-md bg-[#F9FAFB]';
    
    switch (requirement?.toLowerCase()) {
      case 'required':
        return `${baseStyles} ${
          level.toLowerCase() === 'advanced' 
            ? 'border-primary-accent' 
            : level.toLowerCase() === 'intermediate'
              ? 'border-primary-icon'
              : level.toLowerCase() === 'beginner'
                ? 'border-[#008000]'
                : 'border-gray-300'
        }`;
      case 'not-interested':
      case 'unknown':
      default:
        return `${baseStyles} border-gray-300`;
    }
  };

  return (
    <TableCell className="border-r border-blue-200 p-0">
      <div className="flex flex-col items-center">
        <Select 
          value={currentState?.level || 'unspecified'} 
          onValueChange={(value) => {
            setSkillState(skillTitle, value, currentState?.requirement || 'required' as SkillRequirement);
            onLevelChange?.(value, currentState?.requirement || 'required' as SkillRequirement);
          }}
        >
          <SelectTrigger className={getLevelStyles(currentState?.level)}>
            <SelectValue>
              <span className="flex items-center gap-2">
                {getLevelIcon(currentState?.level)}
                {(currentState?.level || 'unspecified').charAt(0).toUpperCase() + (currentState?.level || 'unspecified').slice(1)}
              </span>
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="unspecified">
              <span className="flex items-center gap-2">
                <CircleDashed className="w-3.5 h-3.5 text-gray-400" />
                Unspecified
              </span>
            </SelectItem>
            <SelectItem value="beginner">
              <span className="flex items-center gap-2">
                <Target className="w-3.5 h-3.5 text-[#008000]" />
                Beginner
              </span>
            </SelectItem>
            <SelectItem value="intermediate">
              <span className="flex items-center gap-2">
                <Shield className="w-3.5 h-3.5 text-primary-icon" />
                Intermediate
              </span>
            </SelectItem>
            <SelectItem value="advanced">
              <span className="flex items-center gap-2">
                <Star className="w-3.5 h-3.5 text-primary-accent" />
                Advanced
              </span>
            </SelectItem>
          </SelectContent>
        </Select>

        <Select 
          value={currentState?.requirement || 'required'}
          onValueChange={(value) => {
            setSkillState(skillTitle, currentState?.level || 'unspecified', value as SkillRequirement);
            onLevelChange?.(currentState?.level || 'unspecified', value as SkillRequirement);
          }}
        >
          <SelectTrigger className={getRequirementStyles(currentState?.requirement || 'required', currentState?.level || 'unspecified')}>
            <SelectValue>
              <span className="flex items-center gap-1.5">
                {getRequirementIcon(currentState?.requirement)}
                {currentState?.requirement === 'required' ? 'Skill Goal' : 
                 currentState?.requirement === 'not-interested' ? 'Not Interested' : 
                 'Unknown'}
              </span>
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="required">
              <span className="flex items-center gap-1.5">
                <Heart className="w-3.5 h-3.5" />
                Skill Goal
              </span>
            </SelectItem>
            <SelectItem value="not-interested">
              <span className="flex items-center gap-1.5">
                <X className="w-3.5 h-3.5" />
                Not Interested
              </span>
            </SelectItem>
            <SelectItem value="unknown">
              <span className="flex items-center gap-1.5">
                <CircleDashed className="w-3.5 h-3.5" />
                Unknown
              </span>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
    </TableCell>
  );
};
