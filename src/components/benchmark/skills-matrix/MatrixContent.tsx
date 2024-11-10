import { Table, TableBody } from "@/components/ui/table";
import { SkillsMatrixRow } from "../SkillsMatrixRow";
import { SkillsMatrixTableHeader } from "../SkillsMatrixTableHeader";
import { MatrixSkill } from "./matrixSkillsData";

interface MatrixContentProps {
  paginatedSkills: MatrixSkill[];
  onSkillLevelChange: (newSelectedSkills: string[]) => void;
}

export const MatrixContent = ({ paginatedSkills, onSkillLevelChange }: MatrixContentProps) => {
  return (
    <div className="border border-[#CCDBFF] rounded-lg overflow-hidden">
      <Table>
        <SkillsMatrixTableHeader />
        <TableBody>
          {paginatedSkills.map((skill) => (
            <SkillsMatrixRow 
              key={skill.title} 
              skill={skill}
              onLevelChange={onSkillLevelChange}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};