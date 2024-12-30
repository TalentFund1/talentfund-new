import { TableCell, TableRow } from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { UnifiedSkill } from "../types/SkillTypes";

interface SkillProfileMatrixRowProps {
  skill: UnifiedSkill;
  isToggled: boolean;
  onToggle: () => void;
  isRoleBenchmark?: boolean;
}

export const SkillProfileMatrixRow = ({
  skill,
  isToggled,
  onToggle,
  isRoleBenchmark = false
}: SkillProfileMatrixRowProps) => {
  return (
    <TableRow className="border-t border-border hover:bg-muted/50 transition-colors">
      <TableCell className="py-3 px-4 align-middle">
        <div className="flex items-center gap-2">
          <Switch 
            checked={isToggled}
            onCheckedChange={onToggle}
            className="data-[state=checked]:bg-primary"
          />
          <span className="text-sm">{skill.title}</span>
        </div>
      </TableCell>
      <TableCell className="py-3 px-4 align-middle">
        <span className="text-sm block truncate" title={skill.subcategory}>
          {skill.subcategory}
        </span>
      </TableCell>
      <TableCell className="py-3 px-4 align-middle">
        <span className="bg-green-100 text-green-800 px-2.5 py-1 rounded-full text-sm inline-flex items-center">
          ↗ {skill.growth}
        </span>
      </TableCell>
      <TableCell className="py-3 px-2 align-middle text-sm">{skill.salary}</TableCell>
      {isRoleBenchmark && (
        <TableCell className="py-3 px-4 align-middle text-center">
          <Switch 
            checked={isToggled}
            onCheckedChange={onToggle}
            className="data-[state=checked]:bg-primary"
          />
        </TableCell>
      )}
      <TableCell className="py-3 px-8 align-middle">
        <div className="flex justify-center gap-1">
          <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center text-sm font-medium">B</span>
          <span className="w-6 h-6 rounded-full bg-red-100 text-red-800 flex items-center justify-center text-sm font-medium">R</span>
          <span className="w-6 h-6 rounded-full bg-[#E5DEFF] text-[#6E59A5] flex items-center justify-center text-sm font-medium">M</span>
          <span className="w-6 h-6 rounded-full bg-orange-100 text-orange-800 flex items-center justify-center text-sm font-medium">O</span>
        </div>
      </TableCell>
    </TableRow>
  );
};