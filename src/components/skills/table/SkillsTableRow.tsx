import { TableCell, TableRow } from "@/components/ui/table";
import { SkillLevelIcon } from "../SkillLevelIcon";

interface SkillsTableRowProps {
  skill: {
    title: string;
    subcategory: string;
    level: string;
    growth: string;
  };
  isEven: boolean;
}

export const SkillsTableRow = ({ skill, isEven }: SkillsTableRowProps) => {
  const getLevelBackgroundColor = (level: string) => {
    switch (level) {
      case "Advanced":
        return "bg-primary-accent/5";
      case "Intermediate":
        return "bg-primary-icon/5";
      case "Beginner":
        return "bg-[#008000]/5";
      case "Unspecified":
        return "bg-[#F7F9FF]/50";
      default:
        return "";
    }
  };

  return (
    <TableRow className={`group transition-all duration-200 hover:bg-muted/50 ${isEven ? 'bg-muted/5' : ''}`}>
      <TableCell className="font-medium border-x border-border group-hover:bg-transparent py-4">
        {skill.title}
      </TableCell>
      <TableCell className="border-r border-border group-hover:bg-transparent py-4">
        {skill.subcategory}
      </TableCell>
      <TableCell className={`text-center border-r border-border group-hover:bg-transparent py-4 w-[100px] ${getLevelBackgroundColor("Unspecified")}`}>
        {skill.level === "Unspecified" && <SkillLevelIcon level="unspecified" />}
      </TableCell>
      <TableCell className={`text-center border-r border-border group-hover:bg-transparent py-4 w-[100px] ${getLevelBackgroundColor("Beginner")}`}>
        {skill.level === "Beginner" && <SkillLevelIcon level="beginner" />}
      </TableCell>
      <TableCell className={`text-center border-r border-border group-hover:bg-transparent py-4 w-[100px] ${getLevelBackgroundColor("Intermediate")}`}>
        {skill.level === "Intermediate" && <SkillLevelIcon level="intermediate" />}
      </TableCell>
      <TableCell className={`text-center border-r border-border group-hover:bg-transparent py-4 w-[100px] ${getLevelBackgroundColor("Advanced")}`}>
        {skill.level === "Advanced" && <SkillLevelIcon level="advanced" />}
      </TableCell>
      <TableCell className="text-center border-r border-border group-hover:bg-transparent py-4">
        <span className={`inline-flex items-center justify-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
          skill.growth === "0%" ? 'bg-gray-100 text-gray-800' : 'bg-green-100 text-green-800'
        }`}>
          ↗ {skill.growth}
        </span>
      </TableCell>
    </TableRow>
  );
};