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
    isToggled?: boolean;
  }>;
  onSkillLevelChange: (skillTitle: string, newLevel: string, requirement: string) => void;
  onToggleSkill: (skillTitle: string) => void;
}

export const SkillsMatrixTable = ({ 
  filteredSkills, 
  onSkillLevelChange,
  onToggleSkill 
}: SkillsMatrixTableProps) => {
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