import { TableCell } from "@/components/ui/table";
import { useCompetencyStore } from "./CompetencyState";
import { LevelSelector } from "./LevelSelector";
import { RequirementSelector } from "./RequirementSelector";
import { useParams } from "react-router-dom";
import { Check, Heart } from "lucide-react";

interface SkillCellProps {
  skillName: string;
  details: {
    level: string;
    required: string;
  };
  isLastColumn: boolean;
  levelKey: string;
}

export const SkillCell = ({ 
  skillName, 
  details, 
  isLastColumn, 
  levelKey 
}: SkillCellProps) => {
  const { roleStates, setSkillState } = useCompetencyStore();
  const { id: roleId } = useParams<{ id: string }>();
  const currentRoleId = roleId || "123";

  const currentState = roleStates[currentRoleId]?.[skillName]?.[levelKey] || {
    level: details.level || "unspecified",
    required: details.required || "preferred",
  };

  const handleLevelChange = (value: string) => {
    console.log('Changing level:', {
      skillName,
      levelKey,
      newLevel: value,
      currentRequired: currentState.required,
      roleId: currentRoleId
    });
    
    setSkillState(
      skillName,
      value,
      levelKey,
      currentState.required || 'preferred',
      currentRoleId
    );
  };

  const handleRequirementChange = (value: string) => {
    console.log('Changing requirement:', {
      skillName,
      levelKey,
      currentLevel: currentState.level,
      newRequired: value,
      roleId: currentRoleId
    });
    
    setSkillState(
      skillName,
      currentState.level || 'unspecified',
      levelKey,
      value,
      currentRoleId
    );
  };

  const getBorderColor = (level: string, isRequired: boolean) => {
    if (!isRequired) return '';
    
    switch (level?.toLowerCase()) {
      case 'advanced':
        return 'border-2 border-primary-accent';
      case 'intermediate':
        return 'border-2 border-primary-icon';
      case 'beginner':
        return 'border-2 border-[#008000]';
      default:
        return 'border-2 border-gray-400';
    }
  };

  const isRequired = currentState.required === 'required';

  console.log('Rendering SkillCell:', {
    skillName,
    levelKey,
    currentState,
    roleId: currentRoleId,
    isRequired
  });

  return (
    <TableCell 
      className={`text-center p-2 align-middle ${!isLastColumn ? 'border-r' : ''} border-border`}
    >
      <div className={`flex flex-col items-center gap-0 rounded-lg ${getBorderColor(currentState.level, isRequired)}`}>
        <LevelSelector
          currentLevel={currentState.level || 'unspecified'}
          onLevelChange={handleLevelChange}
        />
        <div className={`flex items-center justify-center gap-1.5 w-full px-2 py-1.5 text-xs font-medium rounded-b-lg
          ${isRequired ? 'bg-[#F7F9FF] text-[#8E9196]' : 'bg-white text-[#1f2144]'}`}
        >
          {isRequired ? (
            <>
              <Check className="w-3.5 h-3.5" />
              Required
            </>
          ) : (
            <>
              <Heart className="w-3.5 h-3.5" />
              Preferred
            </>
          )}
        </div>
      </div>
    </TableCell>
  );
};