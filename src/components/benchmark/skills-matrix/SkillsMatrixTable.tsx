import { Table, TableBody } from "@/components/ui/table";
import { SkillsMatrixRow } from "../SkillsMatrixRow";
import { SkillsMatrixTableHeader } from "../SkillsMatrixTableHeader";

interface Skill {
  title: string;
  subcategory: string;
  level: string;
  growth: string;
  confidence: string;
  requirement: string;
}

interface SkillsMatrixTableProps {
  filteredSkills: Skill[];
}

export const SkillsMatrixTable = ({ filteredSkills }: SkillsMatrixTableProps) => {
  return (
    <div className="border border-[#CCDBFF] rounded-lg overflow-hidden bg-white">
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