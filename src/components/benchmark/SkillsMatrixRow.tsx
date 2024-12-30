import { TableCell, TableRow } from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { UnifiedSkill } from "../types/SkillTypes";
import { Checkbox } from "../ui/checkbox";

interface SkillProfileMatrixRowProps {
  skill: UnifiedSkill;
  isToggled: boolean;
  onToggle: () => void;
}

export const SkillsMatrixRow = ({
  skill,
  isToggled,
  onToggle
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
      <TableCell className="text-center border-r border-blue-200 p-0">
        <div className="flex flex-col items-center">
          <div className="rounded-t-md px-3 py-2 text-sm font-medium w-full capitalize flex items-center justify-center min-h-[36px] text-[#1f2144] border-2 border-gray-400 bg-[#F1F1F1]">
            Missing Skill
          </div>
          <div className="text-xs px-2 py-1.5 font-normal text-[#1f2144] w-full flex items-center justify-center gap-1.5 border-x-2 border-b-2 min-h-[32px] rounded-b-md border-gray-300 bg-[#F1F1F1] relative">
          </div>
        </div>
      </TableCell>
      <TableCell className="text-center py-2">
        <div className="flex items-center justify-center">
          <Checkbox
            checked={isToggled}
            onCheckedChange={onToggle}
            className="data-[state=checked]:bg-[#4285f4] data-[state=checked]:border-[#4285f4]"
          />
        </div>
      </TableCell>
      <TableCell className="text-center py-2">
        <div className="flex items-center justify-center space-x-1">
          <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center text-sm font-medium">R</span>
          <span className="w-6 h-6 rounded-full bg-green-100 text-green-800 flex items-center justify-center text-sm font-medium">E</span>
          <span className="w-6 h-6 rounded-full bg-orange-100 text-orange-800 flex items-center justify-center text-sm font-medium">M</span>
          <span className="w-6 h-6 rounded-full bg-purple-100 text-purple-800 flex items-center justify-center text-sm font-medium">D</span>
        </div>
      </TableCell>
    </TableRow>
  );
};