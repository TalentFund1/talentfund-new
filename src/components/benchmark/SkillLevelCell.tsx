import { TableCell } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState, useEffect } from "react";
import { getLevelIcon, getRequirementIcon } from "./skill-level/SkillLevelIcons";
import { getLevelStyles, getRequirementStyles } from "./skill-level/SkillLevelStyles";
import { useSkillLevelState } from "./skill-level/SkillLevelState";
import { Heart, X, CircleHelp } from "lucide-react";
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
  const { getCurrentState, currentStates } = useSkillLevelState(skillTitle);
  const [level, setLevel] = useState(initialLevel.toLowerCase());
  const [required, setRequired] = useState<string>("required");
  const { setSkillState, originalStates } = useSkillsMatrixStore();

  useEffect(() => {
    const state = getCurrentState();
    if (state) {
      setLevel(state.level);
      setRequired(state.requirement);
    }
  }, [skillTitle, currentStates]);

  useEffect(() => {
    const originalState = originalStates[skillTitle];
    if (originalState) {
      setLevel(originalState.level);
      setRequired(originalState.requirement);
    }
  }, [originalStates, skillTitle]);

  const handleLevelChange = (newLevel: string) => {
    if (isRoleBenchmark) return;
    setLevel(newLevel);
    setSkillState(skillTitle, newLevel, required);
    onLevelChange?.(newLevel, required);
  };

  const handleRequirementChange = (newRequired: string) => {
    if (isRoleBenchmark) return;
    setRequired(newRequired);
    setSkillState(skillTitle, level, newRequired);
    onLevelChange?.(level, newRequired);
  };

  const renderContent = () => {
    if (isRoleBenchmark) {
      return (
        <div className="flex flex-col items-center">
          <div className={`${getLevelStyles(level)} min-h-[28px] flex items-center justify-center`}>
            <span className="flex items-center gap-2 justify-center text-[15px]">
              {getLevelIcon(level)}
              {level.charAt(0).toUpperCase() + level.slice(1)}
            </span>
          </div>
          <div className={`${getRequirementStyles(required, level)} min-h-[28px] flex items-center justify-center`}>
            <span className="flex items-center gap-1.5 justify-center text-xs">
              {getRequirementIcon(required)}
              {required === 'required' ? 'Skill Goal' : required === 'not-interested' ? 'Not Interested' : required === 'unknown' ? 'Unknown' : 'Skill Goal'}
            </span>
          </div>
        </div>
      );
    }

    return (
      <div className="flex flex-col items-center">
        <Select value={level} onValueChange={handleLevelChange}>
          <SelectTrigger 
            className={`${getLevelStyles(level)} focus:ring-0 focus:ring-offset-0 focus-visible:ring-0`}
          >
            <SelectValue>
              <span className="flex items-center gap-2 justify-center text-[15px]">
                {getLevelIcon(level)}
                {level.charAt(0).toUpperCase() + level.slice(1)}
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

        <Select value={required} onValueChange={handleRequirementChange}>
          <SelectTrigger 
            className={`${getRequirementStyles(required, level)} focus:ring-0 focus:ring-offset-0 focus-visible:ring-0`}
          >
            <SelectValue>
              <span className="flex items-center gap-1.5 justify-center text-xs">
                {getRequirementIcon(required)}
                {required === 'required' ? 'Skill Goal' : required === 'not-interested' ? 'Not Interested' : required === 'unknown' ? 'Unknown' : 'Skill Goal'}
              </span>
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="required">
              <span className="flex items-center gap-1.5">
                <Heart className="w-3.5 h-3.5" /> Skill Goal
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
    );
  };

  return (
    <TableCell className="border-r border-blue-200 p-0">
      {renderContent()}
    </TableCell>
  );
};