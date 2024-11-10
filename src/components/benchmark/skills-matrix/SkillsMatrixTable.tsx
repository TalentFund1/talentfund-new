import { Table, TableBody } from "@/components/ui/table";
import { SkillsMatrixRow } from "../SkillsMatrixRow";
import { SkillsMatrixTableHeader } from "../SkillsMatrixTableHeader";

interface SkillsMatrixTableProps {
  filteredSkills: Array<{
    title: string;
    subcategory: string;
    level: string;
    growth: string;
    confidence: string;
  }>;
}

export const SkillsMatrixTable = ({ filteredSkills }: SkillsMatrixTableProps) => {
  return (
    <div className="border border-[#CCDBFF] rounded-lg overflow-hidden">
      <Table>
        <SkillsMatrixTableHeader />
        <TableBody>
          {filteredSkills.map((skill) => (
            <SkillsMatrixRow 
              key={skill.title} 
              skill={skill}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};