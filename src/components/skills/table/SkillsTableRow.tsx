import { TableCell, TableRow } from "@/components/ui/table";
import { SimpleSkill } from "../types/SkillTypes";
import { Switch } from "@/components/ui/switch";

interface SkillsTableRowProps {
  skill: SimpleSkill;
  isEven: boolean;
  isToggled: boolean;
  onToggle: () => void;
}

export const SkillsTableRow = ({ 
  skill, 
  isEven,
  isToggled,
  onToggle 
}: SkillsTableRowProps) => {
  return (
    <TableRow className={`group transition-all duration-200 hover:bg-muted/50 ${isEven ? 'bg-muted/5' : ''}`}>
      <TableCell className="font-medium border-x border-blue-200/60 group-hover:bg-transparent py-4">
        <div className="flex items-center gap-2">
          <Switch 
            checked={isToggled}
            onCheckedChange={onToggle}
            className="data-[state=checked]:bg-primary"
          />
          {skill.title}
        </div>
      </TableCell>
      <TableCell className="border-r border-blue-200/60 group-hover:bg-transparent py-4 text-muted-foreground">
        {skill.subcategory}
      </TableCell>
      <TableCell className="border-r border-blue-200/60 group-hover:bg-transparent py-4 text-muted-foreground">
        {skill.businessCategory || 'Information Technology'}
      </TableCell>
      <TableCell className="text-center border-r border-blue-200/60 group-hover:bg-transparent py-4">
        <span className={`inline-flex items-center justify-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
          skill.growth === "0%" ? 'bg-gray-100 text-gray-800' : 'bg-green-100 text-green-800'
        }`}>
          ↗ {skill.growth}
        </span>
      </TableCell>
    </TableRow>
  );
};