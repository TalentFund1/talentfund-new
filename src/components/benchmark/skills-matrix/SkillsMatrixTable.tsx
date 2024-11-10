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
  onSkillLevelChange: (skillTitle: string, newLevel: string) => void;
}

export const SkillsMatrixTable = ({ filteredSkills, onSkillLevelChange }: SkillsMatrixTableProps) => {
  return (
    <div className="border border-[#CCDBFF] rounded-lg overflow-hidden">
      <Table>
        <SkillsMatrixTableHeader />
        <TableBody>
          {filteredSkills.map((skill) => (
            <SkillsMatrixRow 
              key={skill.title} 
              skill={skill}
              onLevelChange={(newLevel) => onSkillLevelChange(skill.title, newLevel)}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};