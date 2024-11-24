import { TableCell } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Star, Shield, Target, Heart, CircleDashed, Check } from "lucide-react";
import { useEffect } from "react";
import { useCompetencyStore } from "./CompetencyState";
import { useParams } from "react-router-dom";

interface SkillCellProps {
  skillName: string;
  details: {
    level: string;
    required: string;
  };
  isLastColumn: boolean;
  levelKey: string;
}

export const SkillCell = ({ skillName, details, isLastColumn, levelKey }: SkillCellProps) => {
  const { id: roleId } = useParams<{ id: string }>();
  const { currentStates, setSkillState } = useCompetencyStore();
  const currentRoleId = roleId || "123";
  const currentState = currentStates[currentRoleId]?.[skillName]?.[levelKey] || {
    level: "unspecified",
    required: "preferred",
  };

  useEffect(() => {
    if (!currentStates[currentRoleId]?.[skillName]?.[levelKey]) {
      setSkillState(
        skillName,
        "unspecified",
        levelKey,
        "preferred",
        currentRoleId
      );
    }
  }, [skillName, currentStates, setSkillState, levelKey, currentRoleId]);

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
    <TableCell 
      className={`text-center p-2 align-middle ${!isLastColumn ? 'border-r' : ''} border-border`}
    >
      <div className="flex flex-col items-center gap-0">
        <Select 
          value={currentState.level}
          onValueChange={(value) => setSkillState(skillName, value, levelKey, currentState.required, currentRoleId)}
        >
          <SelectTrigger 
            className={`${getLevelStyles(currentState.level)} border-2 focus:ring-0 focus:ring-offset-0 focus-visible:ring-0`}
          >
            <SelectValue>
              <span className="flex items-center gap-2 justify-center text-[15px]">
                {getLevelIcon(currentState.level)}
                {currentState.level.charAt(0).toUpperCase() + currentState.level.slice(1)}
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

        <Select 
          value={currentState.required}
          onValueChange={(value) => setSkillState(skillName, currentState.level, levelKey, value, currentRoleId)}
        >
          <SelectTrigger 
            className={`${getRequirementStyles(currentState.required, currentState.level)} focus:ring-0 focus:ring-offset-0 focus-visible:ring-0`}
          >
            <SelectValue>
              <span className="flex items-center gap-2 justify-center">
                {currentState.required === 'required' ? (
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
