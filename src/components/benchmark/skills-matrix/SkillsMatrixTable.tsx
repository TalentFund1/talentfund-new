import { Table, TableBody } from "@/components/ui/table";
import { SkillsMatrixRow } from "../SkillsMatrixRow";
import { SkillsMatrixTableHeader } from "../SkillsMatrixTableHeader";
import { Dispatch, SetStateAction } from "react";

interface SkillsMatrixTableProps {
  filteredSkills: Array<{
    title: string;
    subcategory: string;
    level: string;
    growth: string;
    confidence: string;
  }>;
  setHasChanges?: Dispatch<SetStateAction<boolean>>;
  showCompanySkill?: boolean;
}

export const SkillsMatrixTable = ({ 
  filteredSkills, 
  setHasChanges,
  showCompanySkill = true 
}: SkillsMatrixTableProps) => {
  return (
    <div className="border border-[#CCDBFF] rounded-lg overflow-hidden bg-white">
      <Table>
        <SkillsMatrixTableHeader showCompanySkill={showCompanySkill} />
        <TableBody>
          {filteredSkills.map((skill) => (
            <SkillsMatrixRow 
              key={skill.title} 
              skill={skill}
              showCompanySkill={showCompanySkill}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};