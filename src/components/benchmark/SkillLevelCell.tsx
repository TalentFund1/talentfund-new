import { TableCell } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEmployeeSkillsStore } from "../employee/store/employeeSkillsStore";
import { SkillLevel, SkillGoalStatus } from "../employee/types/employeeSkillTypes";
import { useParams } from "react-router-dom";
import { getLevelIcon, getRequirementIcon } from "./skill-level/SkillLevelIcons";
import { getLevelStyles, getGoalStatusStyles } from "./skill-level/SkillLevelStyles";

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
  const { 
    setSkillLevel, 
    setSkillGoalStatus, 
    getEmployeeSkills,
    getSkillState 
  } = useEmployeeSkillsStore();

  const employeeSkills = getEmployeeSkills(id || "");
  const currentSkill = employeeSkills.find(skill => skill.title === skillTitle);

  const currentLevel = currentSkill?.level || initialLevel?.toLowerCase() as SkillLevel || 'unspecified';
  const currentGoalStatus = currentSkill?.goalStatus || 'unknown';

  console.log('SkillLevelCell - Current state:', {
    skillTitle,
    currentLevel,
    currentGoalStatus,
    employeeId: id
  });

  const handleLevelChange = (value: string) => {
    if (!id) return;

    console.log('SkillLevelCell - Level change:', {
      employeeId: id,
      skillTitle,
      newLevel: value,
      previousLevel: currentLevel
    });

    setSkillLevel(id, skillTitle, value as SkillLevel);
    onLevelChange?.(value, currentGoalStatus);
  };

  const handleGoalStatusChange = (value: string) => {
    if (!id) return;

    console.log('SkillLevelCell - Goal status change:', {
      employeeId: id,
      skillTitle,
      newStatus: value,
      previousStatus: currentGoalStatus
    });

    setSkillGoalStatus(id, skillTitle, value as SkillGoalStatus);
    onLevelChange?.(currentLevel, value);
  };

  return (
    <TableCell className="border-r border-blue-200 p-0">
      <div className="flex flex-col items-center">
        <Select 
          value={currentLevel} 
          onValueChange={handleLevelChange}
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
                {getLevelIcon('unspecified')}
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

        <Select 
          value={currentGoalStatus}
          onValueChange={handleGoalStatusChange}
        >
          <SelectTrigger className={getGoalStatusStyles(currentGoalStatus, currentLevel)}>
            <SelectValue>
              <span className="flex items-center gap-1.5">
                {getRequirementIcon(currentGoalStatus)}
                {currentGoalStatus === 'skill_goal' ? 'Skill Goal' : 
                 currentGoalStatus === 'not_interested' ? 'Not Interested' : 
                 'Unknown'}
              </span>
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="skill_goal">
              <span className="flex items-center gap-1.5">
                {getRequirementIcon('required')}
                Skill Goal
              </span>
            </SelectItem>
            <SelectItem value="not_interested">
              <span className="flex items-center gap-1.5">
                {getRequirementIcon('not_interested')}
                Not Interested
              </span>
            </SelectItem>
            <SelectItem value="unknown">
              <span className="flex items-center gap-1.5">
                {getRequirementIcon('unknown')}
                Unknown
              </span>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
    </TableCell>
  );
};