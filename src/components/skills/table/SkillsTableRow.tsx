import { TableCell, TableRow } from "@/components/ui/table";
import { SkillLevelIcon } from "../SkillLevelIcon";

interface SkillsTableRowProps {
  skill: {
    title: string;
    subcategory: string;
    level: string;
    growth: string;
  };
}

export const SkillsTableRow = ({ skill }: SkillsTableRowProps) => {
  return (
    <TableRow className="group transition-colors hover:bg-muted/50 even:bg-muted/5">
      <TableCell className="font-medium border-x border-border group-hover:bg-transparent py-4">
        {skill.title}
      </TableCell>
      <TableCell className="border-r border-border group-hover:bg-transparent py-4">
        {skill.subcategory}
      </TableCell>
      <TableCell className="text-center bg-[#F7F9FF]/50 border-r border-border group-hover:bg-transparent py-4">
        {skill.level === "Beginner" && <SkillLevelIcon level="beginner" />}
      </TableCell>
      <TableCell className="text-center bg-[#F7F9FF]/50 border-r border-border group-hover:bg-transparent py-4">
        {skill.level === "Intermediate" && <SkillLevelIcon level="intermediate" />}
      </TableCell>
      <TableCell className="text-center bg-[#F7F9FF]/50 border-r border-border group-hover:bg-transparent py-4">
        {skill.level === "Advanced" && <SkillLevelIcon level="advanced" />}
      </TableCell>
      <TableCell className="text-center border-r border-border group-hover:bg-transparent py-4">
        <span className={`inline-flex items-center justify-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium ${
          skill.growth === "0%" ? 'bg-gray-100 text-gray-800' : 'bg-green-100 text-green-800'
        }`}>
          ↗ {skill.growth}
        </span>
      </TableCell>
    </TableRow>
  );
};