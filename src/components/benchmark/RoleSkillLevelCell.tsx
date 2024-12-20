import { TableCell } from "@/components/ui/table";
import { Star, Shield, Target, CircleDashed, Check, Heart } from "lucide-react";
import { useSkillsMatrixStore } from "./skills-matrix/SkillsMatrixState";
import { useEffect } from "react";
import { useCompetencyStateReader } from "../skills/competency/CompetencyStateReader";
import { useParams } from "react-router-dom";

interface RoleSkillLevelCellProps {
  skillTitle: string;
  initialLevel: string;
}

export const RoleSkillLevelCell = ({ 
  skillTitle,
  initialLevel,
}: RoleSkillLevelCellProps) => {
  const { currentStates, initializeState } = useSkillsMatrixStore();
  const { getSkillCompetencyState } = useCompetencyStateReader();
  const { id: employeeId } = useParams();

  // Get competency state for the current role and level
  const competencyState = getSkillCompetencyState(skillTitle, "senior", employeeId || "");

  // Initialize the skill state with initial level and requirement
  useEffect(() => {
    console.log('Initializing role skill cell:', {
      skillTitle,
      initialLevel,
      currentState: currentStates[skillTitle],
      competencyState
    });
    
    if (!currentStates[skillTitle]) {
      initializeState(skillTitle, competencyState?.level || 'unspecified', competencyState?.required || 'preferred');
    }
  }, [skillTitle, initialLevel, currentStates, initializeState, competencyState]);

  const currentState = currentStates[skillTitle] || {
    level: competencyState?.level || 'unspecified',
    requirement: competencyState?.required || 'preferred'
  };

  const getLevelIcon = (level: string = 'unspecified') => {
    switch (level.toLowerCase()) {
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
        return <Check className="w-3.5 h-3.5" />;
      case 'not-interested':
        return <CircleDashed className="w-3.5 h-3.5" />;
      case 'unknown':
        return <CircleDashed className="w-3.5 h-3.5" />;
      default:
        return <Heart className="w-3.5 h-3.5" />;
    }
  };

  const getBorderColorClass = (level: string = 'unspecified') => {
    switch (level?.toLowerCase()) {
      case 'advanced':
        return 'border-primary-accent bg-primary-accent/10';
      case 'intermediate':
        return 'border-primary-icon bg-primary-icon/10';
      case 'beginner':
        return 'border-[#008000] bg-[#008000]/10';
      default:
        return 'border-gray-400 bg-gray-100/50';
    }
  };

  const getLowerBorderColorClass = (level: string = 'unspecified', requirement: string = 'unknown') => {
    if (requirement?.toLowerCase() !== 'required') {
      return 'border-[#e5e7eb]';
    }
    return getBorderColorClass(level).split(' ')[0];
  };

  return (
    <TableCell className="border-r border-blue-200 p-0">
      <div className="flex flex-col items-center">
        <div className={`
          rounded-t-md px-3 py-2 text-sm font-medium w-full capitalize flex items-center justify-center min-h-[36px] text-[#1f2144]
          border-2 ${getBorderColorClass(currentState?.level)}
        `}>
          <span className="flex items-center gap-2">
            {getLevelIcon(currentState?.level)}
            {(currentState?.level || 'unspecified').charAt(0).toUpperCase() + (currentState?.level || 'unspecified').slice(1)}
          </span>
        </div>
        <div className={`
          text-xs px-2 py-1.5 font-normal text-[#1f2144] w-full flex items-center justify-center gap-1.5 
          border-x-2 border-b-2 min-h-[32px] rounded-b-md bg-[#F9FAFB]
          ${getLowerBorderColorClass(currentState?.level, currentState?.requirement)}
        `}>
          <span className="flex items-center gap-1.5">
            {getRequirementIcon(currentState?.requirement)}
            {currentState?.requirement === 'required' ? 'Required' : 
             currentState?.requirement === 'not-interested' ? 'Not Interested' : 
             currentState?.requirement === 'unknown' ? 'Unknown' : 'Required'}
          </span>
        </div>
      </div>
    </TableCell>
  );
};