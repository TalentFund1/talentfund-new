import { Table, TableBody } from "@/components/ui/table";
import { BenchmarkSkillsMatrixTableHeader } from "./BenchmarkSkillsMatrixTableHeader";
import { SkillsMatrixRow } from "./SkillsMatrixRow";
import { getUnifiedSkillData } from "../../skills/data/skillDatabaseService";

interface BenchmarkSkillsMatrixTableProps {
  filteredSkills: any[];
}

export const BenchmarkSkillsMatrixTable = ({
  filteredSkills,
}: BenchmarkSkillsMatrixTableProps) => {
  console.log('BenchmarkSkillsMatrixTable - Rendering with skills:', {
    skillCount: filteredSkills.length,
    skills: filteredSkills.map(s => ({
      title: s.title,
      weight: getUnifiedSkillData(s.title).weight
    }))
  });

  return (
    <div className="border rounded-lg overflow-hidden">
      <Table>
        <BenchmarkSkillsMatrixTableHeader />
        <TableBody>
          {filteredSkills.map((skill) => {
            const unifiedData = getUnifiedSkillData(skill.title);
            return (
              <SkillsMatrixRow
                key={skill.title}
                skill={{
                  ...skill,
                  weight: unifiedData.weight // Ensure weight comes from universal database
                }}
                isRoleBenchmark={true}
              />
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};