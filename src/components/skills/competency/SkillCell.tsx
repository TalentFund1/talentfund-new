import { TableCell } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Star, Shield, Target, Heart, CircleDashed, HeartOff, HelpCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useCompetencyState } from "./CompetencyState";

interface SkillCellProps {
  skillName: string;
  level: string;
  details: {
    level: string;
    required: string;
  };
}

export const SkillCell = ({ skillName, level, details }: SkillCellProps) => {
  const { skillStates, setSkillState, hasChanges } = useCompetencyState();
  const [currentLevel, setCurrentLevel] = useState(details.level.toLowerCase());
  const [currentRequired, setCurrentRequired] = useState(details.required.toLowerCase());

  useEffect(() => {
    if (skillStates[skillName]?.[level]) {
      const state = skillStates[skillName][level];
      setCurrentLevel(state.level);
      setCurrentRequired(state.required);
    }
  }, [skillStates, skillName, level]);

  const handleLevelChange = (newLevel: string) => {
    setCurrentLevel(newLevel);
    setSkillState(skillName, level, {
      level: newLevel,
      required: currentRequired,
    });
  };

  const handleRequiredChange = (newRequired: string) => {
    setCurrentRequired(newRequired);
    setSkillState(skillName, level, {
      level: currentLevel,
      required: newRequired,
    });
  };

  const getLevelIcon = (level: string) => {
    switch (level.toLowerCase()) {
      case 'advanced':
        return <Star className="w-4 h-4 text-primary-accent" />;
      case 'intermediate':
        return <Shield className="w-4 h-4 text-primary-icon" />;
      case 'beginner':
        return <Target className="w-4 h-4 text-[#008000]" />;
      case 'unspecified':
        return <CircleDashed className="w-4 h-4 text-gray-400" />;
      default:
        return <CircleDashed className="w-4 h-4 text-gray-400" />;
    }
  };

  const getLevelStyles = (level: string) => {
    const baseStyles = 'rounded-t-md px-3 py-1.5 text-sm font-medium w-full capitalize flex items-center justify-center min-h-[26px] text-[#1f2144]';

    switch (level.toLowerCase()) {
      case 'advanced':
        return `${baseStyles} border-2 border-primary-accent bg-primary-accent/10`;
      case 'intermediate':
        return `${baseStyles} border-2 border-primary-icon bg-primary-icon/10`;
      case 'beginner':
        return `${baseStyles} border-2 border-[#008000] bg-[#008000]/10`;
      case 'unspecified':
        return `${baseStyles} border-2 border-gray-400 bg-gray-100/50`;
      default:
        return `${baseStyles} border-2 border-gray-400 bg-gray-100/50`;
    }
  };

  const getRequirementStyles = (requirement: string, level: string) => {
    const borderColor = level.toLowerCase() === 'advanced' 
      ? 'border-primary-accent'
      : level.toLowerCase() === 'intermediate'
        ? 'border-primary-icon'
        : level.toLowerCase() === 'beginner'
          ? 'border-[#008000]'
          : 'border-gray-400';

    const baseStyles = 'text-xs px-2 py-1.5 font-medium text-[#1f2144] w-full flex items-center justify-center gap-1.5';
    
    switch (requirement.toLowerCase()) {
      case 'required':
        return `${baseStyles} bg-gray-100/90 border-x-2 border-b-2 rounded-b-md ${borderColor}`;
      case 'preferred':
        return `${baseStyles} bg-gray-50/90 border-x-2 border-b-2 rounded-b-md border-gray-300`;
      default:
        return `${baseStyles} bg-gray-50/90 border-x-2 border-b-2 rounded-b-md border-gray-300`;
    }
  };

  return (
    <TableCell className="border-r border-blue-200 p-0">
      <div className="flex flex-col items-center">
        <Select value={currentLevel} onValueChange={handleLevelChange}>
          <SelectTrigger 
            className={`rounded-t-md px-3 py-1.5 text-sm font-medium w-full capitalize flex items-center justify-center min-h-[28px] text-[#1f2144] focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 ${getLevelStyles(currentLevel)}`}
          >
            <SelectValue>
              <span className="flex items-center gap-2 justify-center text-[15px]">
                {getLevelIcon(currentLevel)}
                {currentLevel.charAt(0).toUpperCase() + currentLevel.slice(1)}
              </span>
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="unspecified">
              <span className="flex items-center gap-2">
                <CircleDashed className="w-4 h-4 text-gray-400" />
                Unspecified
              </span>
            </SelectItem>
            <SelectItem value="beginner">
              <span className="flex items-center gap-2">
                <Target className="w-4 h-4 text-[#008000]" />
                Beginner
              </span>
            </SelectItem>
            <SelectItem value="intermediate">
              <span className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-primary-icon" />
                Intermediate
              </span>
            </SelectItem>
            <SelectItem value="advanced">
              <span className="flex items-center gap-2">
                <Star className="w-4 h-4 text-primary-accent" />
                Advanced
              </span>
            </SelectItem>
          </SelectContent>
        </Select>

        <Select value={currentRequired} onValueChange={handleRequiredChange}>
          <SelectTrigger 
            className={`text-xs px-2 py-1 font-normal w-full flex items-center justify-center min-h-[24px] border-x-2 border-b-2 rounded-b-md ${getRequirementStyles(currentRequired, currentLevel)}`}
          >
            <SelectValue>
              <span className="flex items-center gap-1.5 justify-center text-xs">
                {currentRequired === 'required' ? (
                  <Heart className="w-3.5 h-3.5" />
                ) : currentRequired === 'not-interested' ? (
                  <HeartOff className="w-3.5 h-3.5" />
                ) : currentRequired === 'unknown' ? (
                  <HelpCircle className="w-3.5 h-3.5" />
                ) : (
                  <Heart className="w-3.5 h-3.5" />
                )}
                {currentRequired === 'required' ? 'Skill Goal' : currentRequired === 'not-interested' ? 'Not Interested' : currentRequired === 'unknown' ? 'Unknown' : 'Skill Goal'}
              </span>
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="required">
              <span className="flex items-center gap-2">✓  Required</span>
            </SelectItem>
            <SelectItem value="preferred">
              <span className="flex items-center gap-2">
                <Heart className="w-3 h-3" /> Preferred
              </span>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
    </TableCell>
  );
};
