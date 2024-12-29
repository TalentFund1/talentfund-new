import { TableCell, TableRow } from "@/components/ui/table";
import { Check } from "lucide-react";
import { SkillLevelCell } from "./SkillLevelCell";
import { StaticSkillLevelCell } from "./StaticSkillLevelCell";
import { RoleSkillLevelCell } from "./RoleSkillLevelCell";
import { useSkillsMatrixStore } from "./skills-matrix/SkillsMatrixState";
import { getUnifiedSkillData } from "../skills/data/skillDatabaseService";
import { useParams } from "react-router-dom";

interface SkillsMatrixRowProps {
  skill: {
    title: string;
    subcategory: string;
    level: string;
    growth: string;
    skillScore: number;
    requirement?: string;
    category?: string;
  };
  isEven: boolean;
  isRoleBenchmark?: boolean;
}

const getScoreColor = (score: number): string => {
  if (score >= 75) return 'bg-[#8073ec10] text-[#8073ec] font-semibold';
  if (score >= 50) return 'bg-[#ff825610] text-[#ff8256] font-semibold';
  if (score >= 25) return 'bg-[#00800010] text-[#008000] font-semibold';
  return 'bg-[#8E919610] text-[#8E9196] font-semibold';
};

export const SkillsMatrixRow = ({ 
  skill, 
  isEven,
  isRoleBenchmark = false 
}: SkillsMatrixRowProps) => {
  const { id } = useParams();
  const unifiedSkillData = getUnifiedSkillData(skill.title);
  
  return (
    <TableRow className={`group transition-all duration-200 hover:bg-muted/50 ${isEven ? 'bg-muted/5' : ''}`}>
      <TableCell className="font-medium border-r border-blue-200/60 group-hover:bg-transparent py-4">
        {skill.title}
      </TableCell>
      <TableCell className="border-r border-blue-200/60 group-hover:bg-transparent py-4">
        {skill.subcategory}
      </TableCell>
      <TableCell className="text-center border-r border-blue-200/60 group-hover:bg-transparent py-4">
        <div className="flex justify-center">
          <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
            <Check className="w-5 h-5 text-green-600 stroke-[2.5]" />
          </div>
        </div>
      </TableCell>
      <TableCell className="text-center border-r border-blue-200/60 group-hover:bg-transparent py-4">
        <SkillLevelCell 
          initialLevel={skill.level}
          skillTitle={skill.title}
        />
      </TableCell>
      <TableCell className="text-center border-r border-blue-200/60 group-hover:bg-transparent py-4">
        <span className={`inline-flex items-center justify-center px-3 py-1.5 rounded-full text-sm shadow-sm ${getScoreColor(skill.skillScore)}`}>
          {skill.skillScore}
        </span>
      </TableCell>
      <TableCell className="text-center border-r border-blue-200/60 group-hover:bg-transparent py-4">
        <span className={`inline-flex items-center justify-center gap-1 px-3 py-1.5 rounded-full text-sm ${
          unifiedSkillData.growth === "0%" ? 'bg-gray-100 text-gray-800' : 'bg-green-100 text-green-800'
        }`}>
          ↗ {unifiedSkillData.growth}
        </span>
      </TableCell>
      {!isRoleBenchmark && (
        <TableCell className="text-center border-r border-blue-200 py-2">
          <span className="text-sm text-gray-900">{unifiedSkillData.salary}</span>
        </TableCell>
      )}
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