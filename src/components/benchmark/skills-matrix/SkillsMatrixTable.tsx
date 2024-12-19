import { Table, TableBody } from "@/components/ui/table";
import { SkillsMatrixRow } from "../SkillsMatrixRow";
import { SkillsMatrixTableHeader } from "../SkillsMatrixTableHeader";
import { SkillRequirement } from "../../skills/types/SkillTypes";

interface SkillsMatrixTableProps {
  filteredSkills: any[];
  showCompanySkill: boolean;
  isRoleBenchmark: boolean;
  onSkillUpdate?: (skillTitle: string, level: string, requirement: SkillRequirement) => void;
}

export const SkillsMatrixTable = ({ 
  filteredSkills,
  showCompanySkill,
  isRoleBenchmark,
  onSkillUpdate
}: SkillsMatrixTableProps) => {
  return (
    <div className="border border-[#CCDBFF] rounded-lg overflow-hidden bg-white">
      <Table>
        <SkillsMatrixTableHeader 
          showCompanySkill={showCompanySkill}
          isRoleBenchmark={isRoleBenchmark}
        />
        <TableBody>
          {filteredSkills.map((skill) => (
            <SkillsMatrixRow 
              key={skill.title} 
              skill={skill}
              showCompanySkill={showCompanySkill}
              isRoleBenchmark={isRoleBenchmark}
              onSkillUpdate={onSkillUpdate}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};