import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { SkillsMatrixRow } from "../SkillsMatrixRow";

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
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Skill Title</TableHead>
          <TableHead>Subcategory</TableHead>
          <TableHead>Company Skill</TableHead>
          <TableHead>Skill Level</TableHead>
          <TableHead>Confidence</TableHead>
          <TableHead>Growth</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
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
  );
};
