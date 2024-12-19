import { TableCell } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useSkillsMatrixStore } from "./skills-matrix/SkillsMatrixState";
import { initializeEmployeeSkills } from "./skills-matrix/initialSkills";
import { useParams } from "react-router-dom";
import { SkillRequirement } from "../skills/types/SkillTypes";
import { validateRequirement, formatRequirementDisplay } from "./skill-level/utils/requirementUtils";
import { 
  getLevelIcon, 
  getRequirementIcon, 
  getBorderColorClass,
  getLowerBorderColorClass 
} from "./skill-level/SkillLevelDisplay";

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
  const { id } = useParams();

  // Initialize the state when the component mounts with proper typing
  initializeState(skillTitle, initialLevel, validateRequirement('required'));

  const currentState = currentStates[skillTitle] || {
    level: initialLevel?.toLowerCase() || 'unspecified',
    requirement: validateRequirement('required')
  };

  const handleSkillChange = (value: string, type: 'level' | 'requirement') => {
    const newState = {
      level: type === 'level' ? value : currentState.level,
      requirement: type === 'requirement' ? validateRequirement(value) : currentState.requirement
    };

    setSkillState(skillTitle, newState.level, newState.requirement);
    
    if (id) {
      initializeEmployeeSkills(id, [{
        title: skillTitle,
        level: newState.level,
        requirement: validateRequirement(newState.requirement),
        category: 'specialized',
        id: `skill-${Date.now()}`,
        subcategory: 'Other',
        businessCategory: 'Information Technology',
        weight: 'necessary',
        growth: '0%',
        salary: '$0',
        confidence: 'low',
        benchmarks: { B: false, R: false, M: false, O: false }
      }], true);
    }

    onLevelChange?.(newState.level, newState.requirement);
  };

  return (
    <TableCell className="border-r border-blue-200 p-0">
      <div className="flex flex-col items-center">
        <Select 
          value={currentState?.level || 'unspecified'} 
          onValueChange={(value) => handleSkillChange(value, 'level')}
        >
          <SelectTrigger className={`
            rounded-t-md px-3 py-2 text-sm font-medium w-full capitalize flex items-center justify-center min-h-[36px] text-[#1f2144]
            border-2 ${getBorderColorClass(currentState?.level)}
          `}>
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
          value={currentState?.requirement} 
          onValueChange={(value) => handleSkillChange(value, 'requirement')}
        >
          <SelectTrigger className={`
            text-xs px-2 py-1.5 font-normal text-[#1f2144] w-full flex items-center justify-center gap-1.5 
            border-x-2 border-b-2 min-h-[32px] rounded-b-md bg-[#F9FAFB]
            ${getLowerBorderColorClass(currentState?.level || 'unspecified', currentState?.requirement)}
          `}>
            <SelectValue>
              <span className="flex items-center gap-1.5">
                {getRequirementIcon(currentState?.requirement)}
                {formatRequirementDisplay(currentState?.requirement)}
              </span>
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="skill_goal">
              <span className="flex items-center gap-1.5">
                {getRequirementIcon('skill_goal')}
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