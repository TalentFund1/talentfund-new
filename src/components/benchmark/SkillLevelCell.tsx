import { TableCell } from "@/components/ui/table";
import { Star, Shield, Target, Heart, X, CircleHelp, Check } from "lucide-react";
import { useSkillLevelState } from "./skill-level/SkillLevelState";
import { useSkillsMatrixStore } from "./skills-matrix/SkillsMatrixState";
import { useCompetencyStore } from "../skills/competency/CompetencyState";
import { useRoleStore } from "./RoleBenchmark";

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
  const { currentStates: competencyStates } = useCompetencyStore();
  const { selectedLevel } = useRoleStore();
  
  const currentState = currentStates[skillTitle] || {
    level: initialLevel.toLowerCase(),
    requirement: 'required'
  };

  const competencyState = competencyStates[skillTitle]?.[selectedLevel.toLowerCase()];

  const getLevelIcon = (level: string) => {
    switch (level.toLowerCase()) {
      case 'advanced':
        return <Star className="w-3.5 h-3.5 text-primary-accent" />;
      case 'intermediate':
        return <Shield className="w-3.5 h-3.5 text-primary-icon" />;
      case 'beginner':
        return <Target className="w-3.5 h-3.5 text-[#008000]" />;
      default:
        return <CircleHelp className="w-3.5 h-3.5 text-gray-400" />;
    }
  };

  const getRequirementIcon = (requirement: string) => {
    switch (requirement.toLowerCase()) {
      case 'required':
        return <Check className="w-3.5 h-3.5" />;
      case 'preferred':
        return <Heart className="w-3.5 h-3.5" />;
      case 'not-interested':
        return <X className="w-3.5 h-3.5" />;
      default:
        return <CircleHelp className="w-3.5 h-3.5" />;
    }
  };

  if (isRoleBenchmark) {
    const displayLevel = competencyState?.level || 'unspecified';
    const displayRequirement = competencyState?.required || 'preferred';

    return (
      <TableCell className="border-r border-blue-200 p-0">
        <div className="flex flex-col items-center">
          <div className={`
            px-3 py-2 text-sm font-medium w-full capitalize flex items-center justify-center min-h-[36px] text-[#1f2144]
            ${displayLevel === 'advanced' ? 'bg-primary-accent/10 border-2 border-primary-accent rounded-t-md' : 
              displayLevel === 'intermediate' ? 'bg-primary-icon/10 border-2 border-primary-icon rounded-t-md' : 
              displayLevel === 'beginner' ? 'bg-[#008000]/10 border-2 border-[#008000] rounded-t-md' : 
              'bg-gray-100/50 border-2 border-gray-400 rounded-t-md'}
          `}>
            <span className="flex items-center gap-2 justify-center text-[15px]">
              {getLevelIcon(displayLevel)}
              {displayLevel.charAt(0).toUpperCase() + displayLevel.slice(1)}
            </span>
          </div>
          <div className={`
            text-xs px-2 py-1.5 font-normal text-[#1f2144] w-full flex items-center justify-center gap-1.5 
            border-x-2 border-b-2 min-h-[32px] rounded-b-md
            ${displayLevel === 'advanced' ? 'border-primary-accent bg-gray-100/90' : 
              displayLevel === 'intermediate' ? 'border-primary-icon bg-gray-100/90' : 
              displayLevel === 'beginner' ? 'border-[#008000] bg-gray-100/90' : 
              'border-gray-400 bg-white'}
          `}>
            <span className="flex items-center gap-1.5 justify-center text-xs">
              {getRequirementIcon(displayRequirement)}
              {displayRequirement === 'required' ? 'Required' : 
               displayRequirement === 'preferred' ? 'Preferred' : 
               displayRequirement === 'not-interested' ? 'Not Interested' : 
               'Unknown'}
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
            ${currentState.level === 'advanced' ? 'border-primary-accent bg-gray-100/90' : 
              currentState.level === 'intermediate' ? 'border-primary-icon bg-gray-100/90' : 
              currentState.level === 'beginner' ? 'border-[#008000] bg-gray-100/90' : 
              'border-gray-400 bg-white'}
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
