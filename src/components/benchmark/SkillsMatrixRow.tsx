import { TableCell, TableRow } from "@/components/ui/table";
import { CheckCircle2 } from "lucide-react";
import { useToggledSkills } from "../skills/context/ToggledSkillsContext";

interface SkillsMatrixRowProps {
  skill: {
    title: string;
    subcategory: string;
    level: string;
    growth: string;
    confidence: string;
    requirement?: string;
  };
  showCompanySkill?: boolean;
  isRoleBenchmark?: boolean;
}

export const SkillsMatrixRow = ({ 
  skill,
  showCompanySkill = true,
  isRoleBenchmark = false
}: SkillsMatrixRowProps) => {
  const { toggledSkills } = useToggledSkills();
  const isCompanySkill = toggledSkills.has(skill.title);

  console.log('Rendering skill row:', {
    skill: skill.title,
    isCompanySkill,
    toggledSkills: Array.from(toggledSkills)
  });

  return (
    <TableRow className="hover:bg-muted/50">
      <TableCell className="font-medium border-r border-[#CCDBFF]">{skill.title}</TableCell>
      <TableCell className="border-r border-[#CCDBFF]">{skill.subcategory}</TableCell>
      <TableCell className="border-r border-[#CCDBFF]">Technical</TableCell>
      {showCompanySkill && (
        <TableCell className="text-center border-r border-[#CCDBFF]">
          {isCompanySkill && (
            <CheckCircle2 className="h-5 w-5 text-green-500 mx-auto" />
          )}
        </TableCell>
      )}
      {isRoleBenchmark && (
        <TableCell className="text-center border-r border-[#CCDBFF]">
          {skill.requirement === 'required' && (
            <span className="inline-flex h-2 w-2 rounded-full bg-green-500" />
          )}
        </TableCell>
      )}
      <TableCell className="text-center border-r border-[#CCDBFF]">
        <span className="inline-flex h-2 w-2 rounded-full bg-green-500" />
      </TableCell>
      <TableCell className="text-center border-r border-[#CCDBFF]">
        {skill.confidence}
      </TableCell>
      <TableCell className="text-center border-r border-[#CCDBFF]">
        <span className={`inline-flex items-center justify-center px-2.5 py-1 rounded-full text-sm ${
          skill.growth === "0%" ? 'bg-gray-100 text-gray-800' : 'bg-green-100 text-green-800'
        }`}>
          ↗ {skill.growth}
        </span>
      </TableCell>
      <TableCell className="text-center">
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