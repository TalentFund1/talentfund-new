import { TableCell } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Star, Shield, Target, CircleDashed, X, Heart } from "lucide-react";
import { useEmployeeSkillsStore } from "../employee/store/employeeSkillsStore";
import { SkillLevel, SkillGoalStatus } from "../employee/types/employeeSkillTypes";
import { useParams } from "react-router-dom";

interface SkillLevelCellProps {
  initialLevel: string;
  skillTitle: string;
  onLevelChange?: (newLevel: string, goalStatus: string) => void;
  isRoleBenchmark?: boolean;
}

export const SkillLevelCell = ({ 
  initialLevel, 
  skillTitle,
  onLevelChange,
  isRoleBenchmark = false
}: SkillLevelCellProps) => {
  const { id } = useParams<{ id: string }>();
  const { setSkillLevel, setSkillGoalStatus, getEmployeeSkills } = useEmployeeSkillsStore();

  const employeeSkills = getEmployeeSkills(id || "");
  const currentSkill = employeeSkills.find(skill => skill.title === skillTitle);

  const currentLevel = currentSkill?.level || initialLevel?.toLowerCase() as SkillLevel || 'unspecified';
  const currentGoalStatus = currentSkill?.goalStatus || 'unknown';

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

  const getGoalStatusIcon = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'skill_goal':
        return <Heart className="w-3.5 h-3.5" />;
      case 'not_interested':
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

  const getGoalStatusStyles = (status: string, level: string) => {
    const baseStyles = 'text-xs px-2 py-1.5 font-normal text-[#1f2144] w-full flex items-center justify-center gap-1.5 border-x-2 border-b-2 min-h-[32px] rounded-b-md bg-[#F9FAFB]';
    
    switch (status?.toLowerCase()) {
      case 'skill_goal':
        return `${baseStyles} ${
          level.toLowerCase() === 'advanced' 
            ? 'border-primary-accent' 
            : level.toLowerCase() === 'intermediate'
              ? 'border-primary-icon'
              : level.toLowerCase() === 'beginner'
                ? 'border-[#008000]'
                : 'border-gray-300'
        }`;
      case 'not_interested':
      case 'unknown':
      default:
        return `${baseStyles} border-gray-300`;
    }
  };

  return (
    <TableCell className="border-r border-blue-200 p-0">
      <div className="flex flex-col items-center">
        <Select 
          value={currentLevel} 
          onValueChange={(value) => {
            if (id) {
              setSkillLevel(id, skillTitle, value as SkillLevel);
              onLevelChange?.(value, currentGoalStatus);
            }
          }}
        >
          <SelectTrigger className={getLevelStyles(currentLevel)}>
            <SelectValue>
              <span className="flex items-center gap-2">
                {getLevelIcon(currentLevel)}
                {currentLevel.charAt(0).toUpperCase() + currentLevel.slice(1)}
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
          value={currentGoalStatus}
          onValueChange={(value) => {
            if (id) {
              setSkillGoalStatus(id, skillTitle, value as SkillGoalStatus);
              onLevelChange?.(currentLevel, value);
            }
          }}
        >
          <SelectTrigger className={getGoalStatusStyles(currentGoalStatus, currentLevel)}>
            <SelectValue>
              <span className="flex items-center gap-1.5">
                {getGoalStatusIcon(currentGoalStatus)}
                {currentGoalStatus === 'skill_goal' ? 'Skill Goal' : 
                 currentGoalStatus === 'not_interested' ? 'Not Interested' : 
                 'Unknown'}
              </span>
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="skill_goal">
              <span className="flex items-center gap-1.5">
                <Heart className="w-3.5 h-3.5" />
                Skill Goal
              </span>
            </SelectItem>
            <SelectItem value="not_interested">
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