import { Table, TableBody } from "@/components/ui/table";
import { SkillsMatrixRow } from "../SkillsMatrixRow";
import { BenchmarkSkillsMatrixTableHeader } from "./BenchmarkSkillsMatrixTableHeader";

interface BenchmarkSkillsMatrixTableProps {
  filteredSkills: Array<{
    title: string;
    subcategory: string;
    level: string;
    growth: string;
    confidence: string;
    requirement?: string;
  }>;
}

export const BenchmarkSkillsMatrixTable = ({
  filteredSkills,
}: BenchmarkSkillsMatrixTableProps) => {
  console.log('Rendering BenchmarkSkillsMatrixTable with:', {
    skillCount: filteredSkills.length
  });

  return (
    <div className="border border-[#CCDBFF] rounded-lg overflow-hidden bg-white">
      <Table>
        <BenchmarkSkillsMatrixTableHeader />
        <TableBody>
          {filteredSkills.map((skill) => (
            <SkillsMatrixRow 
              key={skill.title} 
              skill={skill}
              isRoleBenchmark={true}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};