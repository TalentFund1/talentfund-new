import { TableCell, TableRow } from "@/components/ui/table";
import { UnifiedSkill } from "../skills/types/SkillTypes";

interface SkillsMatrixRowProps {
  skill: UnifiedSkill;
  isEven: boolean;
}

export const SkillsMatrixRow = ({ skill, isEven }: SkillsMatrixRowProps) => {
  const getSkillScore = (level: string): number => {
    switch (level.toLowerCase()) {
      case 'advanced':
        return Math.floor(Math.random() * 26) + 75; // 75-100
      case 'intermediate':
        return Math.floor(Math.random() * 26) + 50; // 50-75
      case 'beginner':
        return Math.floor(Math.random() * 26) + 25; // 25-50
      default:
        return Math.floor(Math.random() * 26); // 0-25
    }
  };

  const getScoreColor = (score: number): string => {
    if (score >= 75) return 'text-[#8073ec] bg-[#8073ec]/10';
    if (score >= 50) return 'text-[#ff8256] bg-[#ff8256]/10';
    if (score >= 25) return 'text-[#008000] bg-[#008000]/10';
    return 'text-[#8E9196] bg-[#8E9196]/10';
  };

  const skillScore = getSkillScore(skill.level);
  const scoreColorClass = getScoreColor(skillScore);

  return (
    <TableRow className={`group transition-all duration-200 hover:bg-muted/50 ${isEven ? 'bg-muted/5' : ''}`}>
      <TableCell className="font-medium border-x border-blue-200/60 group-hover:bg-transparent py-4">
        {skill.title}
      </TableCell>
      <TableCell className="border-r border-blue-200/60 group-hover:bg-transparent py-4 text-muted-foreground">
        {skill.subcategory}
      </TableCell>
      <TableCell className="text-center border-r border-blue-200/60 group-hover:bg-transparent py-4">
        <span className={`inline-flex items-center justify-center px-2.5 py-1 rounded-full text-sm ${scoreColorClass}`}>
          {skillScore}
        </span>
      </TableCell>
      <TableCell className="text-center border-r border-blue-200/60 group-hover:bg-transparent py-4">
        <span className={`bg-green-100 text-green-800 px-2.5 py-1 rounded-full text-sm inline-flex items-center`}>
          ↗ {skill.growth}
        </span>
      </TableCell>
      <TableCell className="text-center border-r border-blue-200/60 group-hover:bg-transparent py-4">
        <div className="flex justify-center gap-1">
          <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center text-sm font-medium">R</span>
          <span className="w-6 h-6 rounded-full bg-red-100 text-red-800 flex items-center justify-center text-sm font-medium">E</span>
          <span className="w-6 h-6 rounded-full bg-[#E5DEFF] text-[#6E59A5] flex items-center justify-center text-sm font-medium">M</span>
          <span className="w-6 h-6 rounded-full bg-orange-100 text-orange-800 flex items-center justify-center text-sm font-medium">D</span>
        </div>
      </TableCell>
    </TableRow>
  );
};