import { Table, TableBody } from "@/components/ui/table";
import { SkillsMatrixRow } from "../SkillsMatrixRow";
import { SkillsMatrixTableHeader } from "../SkillsMatrixTableHeader";
import { Skill } from "./SkillsMatrixState";

interface SkillsMatrixTableProps {
  filteredSkills: Skill[];
  onSkillLevelChange: (skillTitle: string, newLevel: string, requirement: string) => void;
  onToggleSkill: (skillTitle: string) => void;
}

export const SkillsMatrixTable = ({ filteredSkills, onSkillLevelChange, onToggleSkill }: SkillsMatrixTableProps) => {
  return (
    <div className="border border-[#CCDBFF] rounded-lg overflow-hidden">
      <Table>
        <SkillsMatrixTableHeader />
        <TableBody>
          {filteredSkills.map((skill) => (
            <SkillsMatrixRow 
              key={skill.title} 
              skill={skill}
              onLevelChange={onSkillLevelChange}
              onToggleSkill={onToggleSkill}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};