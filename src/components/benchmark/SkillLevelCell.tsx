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
    getSkillState,
    updateSkillState 
  } = useEmployeeSkillsStore();

  const employeeSkills = getEmployeeSkills(id || "");
  const currentSkill = employeeSkills.find(skill => skill.title === skillTitle);
  const skillState = getSkillState(id || "", skillTitle);

  console.log('SkillLevelCell - Current state:', {
    employeeId: id,
    skillTitle,
    currentLevel: skillState.level,
    currentGoalStatus: skillState.goalStatus
  });

  const handleLevelChange = (value: string) => {
    if (!id) return;

    console.log('SkillLevelCell - Updating level:', {
      employeeId: id,
      skillTitle,
      newLevel: value,
      currentGoalStatus: skillState.goalStatus
    });

    updateSkillState(id, skillTitle, {
      level: value as SkillLevel,
      lastUpdated: new Date().toISOString()
    });

    onLevelChange?.(value, skillState.goalStatus);
  };

  const handleGoalStatusChange = (value: string) => {
    if (!id) return;

    console.log('SkillLevelCell - Updating goal status:', {
      employeeId: id,
      skillTitle,
      currentLevel: skillState.level,
      newGoalStatus: value
    });

    updateSkillState(id, skillTitle, {
      goalStatus: value as SkillGoalStatus,
      lastUpdated: new Date().toISOString()
    });

    onLevelChange?.(skillState.level, value);
  };

  return (
    <TableCell className="border-r border-blue-200 p-0">
      <div className="flex flex-col items-center">
        <Select 
          value={skillState.level} 
          onValueChange={handleLevelChange}
        >
          <SelectTrigger className={getLevelStyles(skillState.level)}>
            <SelectValue>
              <span className="flex items-center gap-2">
                {getLevelIcon(skillState.level)}
                {skillState.level.charAt(0).toUpperCase() + skillState.level.slice(1)}
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
          value={skillState.goalStatus}
          onValueChange={handleGoalStatusChange}
        >
          <SelectTrigger className={getGoalStatusStyles(skillState.goalStatus, skillState.level)}>
            <SelectValue>
              <span className="flex items-center gap-1.5">
                {getRequirementIcon(skillState.goalStatus)}
                {skillState.goalStatus === 'skill_goal' ? 'Skill Goal' : 
                 skillState.goalStatus === 'not_interested' ? 'Not Interested' : 
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