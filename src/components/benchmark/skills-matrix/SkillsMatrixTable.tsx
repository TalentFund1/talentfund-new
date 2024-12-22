import { Table, TableBody } from "@/components/ui/table";
import { SkillsMatrixRow } from "../SkillsMatrixRow";
import { SkillsMatrixTableHeader } from "../SkillsMatrixTableHeader";

interface SkillsMatrixTableProps {
  filteredSkills: Array<{
    title: string;
    level?: string;
    requirement?: string;
  }>;
  isRoleBenchmark?: boolean;
}

export const SkillsMatrixTable = ({ 
  filteredSkills,
  isRoleBenchmark = false
}: SkillsMatrixTableProps) => {
  console.log('Rendering SkillsMatrixTable:', {
    skillCount: filteredSkills.length,
    isRoleBenchmark
  });

  return (
    <div className="border border-[#CCDBFF] rounded-lg overflow-hidden bg-white">
      <Table>
        <SkillsMatrixTableHeader 
          showCompanySkill={!isRoleBenchmark}
          isRoleBenchmark={isRoleBenchmark}
        />
        <TableBody>
          {filteredSkills.map((skill) => (
            <SkillsMatrixRow 
              key={skill.title} 
              skill={skill}
              isRoleBenchmark={isRoleBenchmark}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};