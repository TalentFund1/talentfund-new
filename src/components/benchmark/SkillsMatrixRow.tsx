import { TableCell, TableRow } from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { UnifiedSkill } from "../skills/types/SkillTypes";
import { roleSkills } from "../skills/data/roleSkills";
import { useParams } from "react-router-dom";
import { useEmployeeSkillsStore } from "../employee/store/employeeSkillsStore";
import { SkillLevelCell } from "./SkillLevelCell";
import { Badge } from "../ui/badge";

interface SkillsMatrixRowProps {
  skill: UnifiedSkill;
  isRoleBenchmark?: boolean;
}

export const SkillsMatrixRow = ({ 
  skill,
  isRoleBenchmark = false
}: SkillsMatrixRowProps) => {
  const { id: employeeId } = useParams();
  const { getEmployeeSkills } = useEmployeeSkillsStore();
  
  // Check if employee has this skill
  const employeeSkills = employeeId ? getEmployeeSkills(employeeId) : [];
  const hasSkill = employeeSkills.some(empSkill => empSkill.title === skill.title);

  console.log('Rendering SkillsMatrixRow:', {
    skillTitle: skill.title,
    hasSkill,
    employeeSkillCount: employeeSkills.length,
    isRoleBenchmark
  });

  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'specialized':
        return 'bg-blue-100 text-blue-800';
      case 'certification':
        return 'bg-purple-100 text-purple-800';
      case 'common':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <TableRow className="group border-t border-border hover:bg-muted/50 transition-colors">
      <TableCell className="py-3 px-4">
        <div className="flex items-center gap-2">
          <span className="text-sm">{skill.title}</span>
        </div>
      </TableCell>
      <TableCell className="py-3 px-4">
        <span className="text-sm block truncate" title={skill.subcategory}>
          {skill.subcategory}
        </span>
      </TableCell>
      <TableCell className="py-3 px-4">
        <span className={`inline-flex items-center justify-center px-2.5 py-1 rounded-full text-sm ${getTypeColor(skill.category)}`}>
          {skill.category}
        </span>
      </TableCell>
      {isRoleBenchmark ? (
        <>
          <TableCell className="py-3 px-4">
            <span className="bg-green-100 text-green-800 px-2.5 py-1 rounded-full text-sm">
              ↗ {skill.growth}
            </span>
          </TableCell>
          <TableCell className="py-3 px-2 text-sm">{skill.salary}</TableCell>
          {hasSkill ? (
            <SkillLevelCell 
              initialLevel={skill.level}
              skillTitle={skill.title}
              isRoleBenchmark={true}
            />
          ) : (
            <TableCell className="text-center py-3 px-4">
              <Badge 
                variant="outline"
                className="bg-red-50 text-red-700 border-red-200 hover:bg-red-100 hover:text-red-800"
              >
                Missing Skill
              </Badge>
            </TableCell>
          )}
        </>
      ) : (
        <SkillLevelCell 
          initialLevel={skill.level}
          skillTitle={skill.title}
        />
      )}
      <TableCell className="text-center py-3 px-8">
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