import { TableCell } from "@/components/ui/table";
import { useCompetencyStore } from "./CompetencyState";
import { useEffect, useRef } from "react";
import { LevelSelector } from "./LevelSelector";
import { RequirementSelector } from "./RequirementSelector";
import { Check, X } from "lucide-react";
import { useToggledSkills } from "../skills/context/ToggledSkillsContext";

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
  const { currentStates, setSkillState } = useCompetencyStore();
  const { toggledSkills } = useToggledSkills();
  const initRef = useRef(false);

  // Initialize state only once when component mounts
  useEffect(() => {
    if (!initRef.current) {
      console.log('Initializing skill state:', {
        skillName,
        levelKey,
        initialLevel: details.level || "unspecified",
        initialRequired: details.required || "preferred"
      });
      
      setSkillState(
        skillName,
        details.level || "unspecified",
        levelKey,
        details.required || "preferred"
      );
      initRef.current = true;
    }
  }, [skillName, levelKey, details.level, details.required, setSkillState]);

  const currentState = currentStates[skillName]?.[levelKey] || {
    level: details.level || "unspecified",
    required: details.required || "preferred",
  };

  const handleLevelChange = (value: string) => {
    console.log('Changing level:', {
      skillName,
      levelKey,
      newLevel: value,
      currentRequired: currentState.required
    });
    setSkillState(skillName, value, levelKey, currentState.required);
  };

  const handleRequirementChange = (value: string) => {
    console.log('Changing requirement:', {
      skillName,
      levelKey,
      currentLevel: currentState.level,
      newRequired: value
    });
    setSkillState(skillName, currentState.level, levelKey, value);
  };

  const isCompanySkill = toggledSkills.has(skillName);

  return (
    <TableCell 
      className={`text-center p-2 align-middle ${!isLastColumn ? 'border-r' : ''} border-border`}
    >
      <div className="flex flex-col items-center gap-2">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
          isCompanySkill ? 'bg-green-100' : 'bg-red-100'
        }`}>
          {isCompanySkill ? (
            <Check className="w-5 h-5 text-green-600 stroke-[2.5]" />
          ) : (
            <X className="w-5 h-5 text-red-600 stroke-[2.5]" />
          )}
        </div>
        <div className="flex flex-col items-center gap-0">
          <LevelSelector
            currentLevel={currentState.level}
            onLevelChange={handleLevelChange}
          />
          <RequirementSelector
            currentRequired={currentState.required}
            currentLevel={currentState.level}
            onRequirementChange={handleRequirementChange}
          />
        </div>
      </div>
    </TableCell>
  );
};