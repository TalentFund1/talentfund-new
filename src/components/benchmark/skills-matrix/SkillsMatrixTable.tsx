import { Table, TableBody } from "@/components/ui/table";
import { SkillsMatrixTableHeader } from "../SkillsMatrixTableHeader";
import { SkillsMatrixRow } from "../SkillsMatrixRow";

interface SkillsMatrixTableProps {
  filteredSkills: any[];
  onSkillChange: (skillTitle: string, newLevel: string, newRequired: string) => void;
}

export const SkillsMatrixTable = ({ filteredSkills, onSkillChange }: SkillsMatrixTableProps) => {
  return (
    <div className="rounded-lg border border-blue-200 overflow-x-auto">
      <Table>
        <SkillsMatrixTableHeader />
        <TableBody>
          {filteredSkills.map((skill) => (
            <SkillsMatrixRow 
              key={skill.title} 
              skill={skill}
              onSkillChange={onSkillChange}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};