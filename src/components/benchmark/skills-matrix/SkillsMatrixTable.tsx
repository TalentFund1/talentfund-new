import { Table, TableBody } from "@/components/ui/table";
import { SkillsMatrixRow } from "../SkillsMatrixRow";
import { SkillsMatrixTableHeader } from "../SkillsMatrixTableHeader";

interface SkillsMatrixTableProps {
  filteredSkills: Array<{
    title: string;
    level?: string;
    requirement?: string;
  }>;
  showCompanySkill?: boolean;
  isRoleBenchmark?: boolean;
}

export const SkillsMatrixTable = ({
  filteredSkills,
  showCompanySkill = true,
  isRoleBenchmark = false
}: SkillsMatrixTableProps) => {
  console.log('Rendering SkillsMatrixTable with:', {
    skillCount: filteredSkills.length,
    showCompanySkill,
    isRoleBenchmark
  });

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
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};