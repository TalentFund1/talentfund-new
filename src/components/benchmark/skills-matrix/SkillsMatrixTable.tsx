import { Table, TableBody } from "@/components/ui/table";
import { SkillsMatrixRow } from "../SkillsMatrixRow";
import { SkillsMatrixTableHeader } from "../SkillsMatrixTableHeader";
import { ToggledSkillsProvider } from "../../skills/context/ToggledSkillsContext";

interface SkillsMatrixTableProps {
  filteredSkills: Array<{
    title: string;
    subcategory: string;
    level: string;
    growth: string;
    confidence: string;
  }>;
  setHasChanges?: React.Dispatch<React.SetStateAction<boolean>>;
  showCompanySkill?: boolean;
  isRoleBenchmark?: boolean;
}

export const SkillsMatrixTable = ({ 
  filteredSkills, 
  setHasChanges,
  showCompanySkill = true,
  isRoleBenchmark = false
}: SkillsMatrixTableProps) => {
  return (
    <div className="border border-[#CCDBFF] rounded-lg overflow-hidden bg-white">
      <ToggledSkillsProvider>
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
              />
            ))}
          </TableBody>
        </Table>
      </ToggledSkillsProvider>
    </div>
  );
};