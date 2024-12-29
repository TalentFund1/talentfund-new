import { TableCell } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEmployeeSkillsStore } from "../employee/store/employeeSkillsStore";
import { SkillLevel, SkillGoalStatus } from "../employee/types/employeeSkillTypes";
import { useParams } from "react-router-dom";
import { getLevelIcon, getRequirementIcon } from "./skill-level/SkillLevelIcons";
import { getLevelStyles, getRequirementStyles } from "./skill-level/SkillLevelStyles";

const getLevelValue = (level: string): number => {
  const values: { [key: string]: number } = {
    'expert': 5,
    'advanced': 4,
    'intermediate': 3,
    'beginner': 2,
    'unspecified': 1
  };
  return values[level.toLowerCase()] || 1;
};

interface SkillCellProps {
  skillName: string;
  details: {
    level: string;
    required: string;
  };
  isLastColumn: boolean;
  levelKey: string;
}

export const SkillLevelCell = ({ 
  skillName, 
  details, 
  isLastColumn, 
  levelKey 
}: SkillCellProps) => {
  const { id: employeeId } = useParams();
  const { setSkillLevel, setSkillGoalStatus, getSkillState } = useEmployeeSkillsStore();

  const currentState = getSkillState(skillName, employeeId || "");
  const currentLevel = currentState?.level || details.level || "unspecified";
  const currentGoalStatus = currentState?.goalStatus || details.required || "unknown";

  console.log('SkillLevelCell rendering:', {
    skillName,
    employeeId,
    currentLevel,
    currentGoalStatus
  });

  const handleLevelChange = (value: string) => {
    if (!employeeId) return;

    console.log('Changing level:', {
      employeeId,
      skillName,
      newLevel: value as SkillLevel
    });
    
    setSkillLevel(employeeId, skillName, value as SkillLevel);
  };

  const handleGoalStatusChange = (value: string) => {
    if (!employeeId) return;

    console.log('Changing goal status:', {
      employeeId,
      skillName,
      newStatus: value as SkillGoalStatus
    });
    
    setSkillGoalStatus(employeeId, skillName, value as SkillGoalStatus);
  };

  return (
    <TableCell 
      className={`text-center p-2 align-middle ${!isLastColumn ? 'border-r' : ''} border-border`}
    >
      <div className="flex flex-col items-center gap-0">
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
            <SelectItem value="expert">
              <span className="flex items-center gap-2">
                {getLevelIcon('expert')}
                Expert
              </span>
            </SelectItem>
          </SelectContent>
        </Select>

        <Select 
          value={currentGoalStatus}
          onValueChange={handleGoalStatusChange}
        >
          <SelectTrigger className={getRequirementStyles(currentGoalStatus, currentLevel)}>
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