import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { SkillLevelCell } from "../SkillLevelCell";

interface SkillsTableProps {
  skills: Array<{
    title: string;
    subcategory: string;
    level: string;
  }>;
  roleLevel: string;
  levels: string[];
}

export const SkillsTable = ({ skills, roleLevel, levels }: SkillsTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow className="bg-[#F7F9FF] border-b border-[#CCDBFF]">
          <TableHead className="w-[180px] border-r border-[#CCDBFF] py-3 font-medium">Skill Title</TableHead>
          <TableHead className="w-[220px] border-r border-[#CCDBFF] py-3 font-medium">Subcategory</TableHead>
          {levels.map((level) => (
            <TableHead key={level} className="text-center border-r border-[#CCDBFF] py-3 font-medium w-[150px]">
              {level}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {skills.map((skill, index) => (
          <TableRow key={`${skill.title}-${index}`}>
            <TableCell className="font-medium border-r border-[#CCDBFF]">{skill.title}</TableCell>
            <TableCell className="border-r border-[#CCDBFF]">{skill.subcategory}</TableCell>
            {levels.map((level) => (
              <TableCell 
                key={`${skill.title}-${level}`} 
                className="text-center border-r border-[#CCDBFF]"
              >
                <SkillLevelCell
                  initialLevel={level === roleLevel ? skill.level : "unspecified"}
                  skillTitle={skill.title}
                />
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};