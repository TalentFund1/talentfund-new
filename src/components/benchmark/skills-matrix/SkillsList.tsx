import { Table, TableBody } from "@/components/ui/table";
import { SkillsMatrixRow } from "../SkillsMatrixRow";
import { SkillsMatrixTableHeader } from "../SkillsMatrixTableHeader";

interface Skill {
  title: string;
  subcategory: string;
  level: string;
  growth: string;
  confidence: string;
}

interface SkillsListProps {
  skills: Skill[];
  onSkillLevelChange: (newSelectedSkills: string[]) => void;
}

export const SkillsList = ({ skills, onSkillLevelChange }: SkillsListProps) => {
  return (
    <div className="border border-[#CCDBFF] rounded-lg overflow-hidden">
      <Table>
        <SkillsMatrixTableHeader />
        <TableBody>
          {skills.map((skill) => (
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