import { TableCell } from "@/components/ui/table";
import { useCompetencyStateReader } from "../../skills/competency/CompetencyStateReader";
import { useRoleStore } from "../RoleBenchmark";
import { getLevelIcon, getRequirementIcon } from "./RoleSkillLevelIcons";
import { getLevelStyles, getRequirementStyles } from "./RoleSkillLevelStyles";

interface RoleSkillLevelCellProps {
  skillTitle: string;
  initialLevel: string;
}

export const RoleSkillLevelCell = ({ 
  skillTitle,
  initialLevel 
}: RoleSkillLevelCellProps) => {
  const { selectedRole, selectedLevel } = useRoleStore();
  const { getSkillCompetencyState } = useCompetencyStateReader();
  
  const competencyState = getSkillCompetencyState(skillTitle, selectedLevel, selectedRole);
  const level = competencyState?.level || initialLevel;
  const isRequired = competencyState?.required === 'required';

  console.log('RoleSkillLevelCell rendering:', {
    skillTitle,
    level,
    isRequired,
    competencyState
  });

  return (
    <TableCell className="border-r border-blue-200 p-0">
      <div className="flex flex-col items-center">
        <div className={getLevelStyles(level)}>
          {getLevelIcon(level)}
          {level}
        </div>
        <div className={getRequirementStyles(level)}>
          {getRequirementIcon(isRequired)}
          {isRequired ? 'Required' : 'Preferred'}
        </div>
      </div>
    </TableCell>
  );
};