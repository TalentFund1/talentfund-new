import { TableCell } from "@/components/ui/table";
import { useEffect, useRef } from "react";
import { LevelSelector } from "./LevelSelector";
import { RequirementSelector } from "./RequirementSelector";
import { Check, X } from "lucide-react";
import { useToggledSkills } from "../skills/context/ToggledSkillsContext";
import { useCompetencyStore } from "../skills/competency/CompetencyState";
import { useParams } from "react-router-dom";

interface CompanySkillProps {
  skillName: string;
  details: {
    level: string;
    required: string;
  };
  isLastColumn: boolean;
  levelKey: string;
}

export const CompanySkill = ({ 
  skillName, 
  details, 
  isLastColumn, 
  levelKey 
}: CompanySkillProps) => {
  const { roleStates, setSkillState } = useCompetencyStore();
  const { toggledSkills } = useToggledSkills();
  const { id: roleId } = useParams<{ id: string }>();
  const currentRoleId = roleId || "123";
  const initRef = useRef(false);

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
        details.required || "preferred",
        currentRoleId
      );
      initRef.current = true;
    }
  }, [skillName, levelKey, details.level, details.required, setSkillState, currentRoleId]);

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

  // Check if the skill is toggled on
  const isCompanySkill = toggledSkills.has(skillName);

  console.log('Checking company skill status:', {
    skillName,
    isCompanySkill,
    toggledSkillsCount: toggledSkills.size,
    isToggled: toggledSkills.has(skillName)
  });

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
            currentLevel={currentState.level || 'unspecified'}
            onLevelChange={handleLevelChange}
          />
          <RequirementSelector
            currentRequired={currentState.required || 'preferred'}
            currentLevel={currentState.level || 'unspecified'}
            onRequirementChange={handleRequirementChange}
          />
        </div>
      </div>
    </TableCell>
  );
};