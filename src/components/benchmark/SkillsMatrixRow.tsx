import { TableCell, TableRow } from "@/components/ui/table";
import { Check } from "lucide-react";
import { SkillLevelCell } from "./SkillLevelCell";
import { StaticSkillLevelCell } from "./StaticSkillLevelCell";
import { RoleSkillLevelCell } from "./RoleSkillLevelCell";
import { useSkillsMatrixStore } from "./skills-matrix/SkillsMatrixState";
import { getUnifiedSkillData } from "../skills/data/skillDatabaseService";
import { useParams } from "react-router-dom";
import { UnifiedSkill } from "../skills/types/SkillTypes";
import { Checkbox } from "../ui/checkbox";
import { useEmployeeSkillsStore } from "../employee/store/employeeSkillsStore";
import { MissingSkillIndicator } from "./skills-matrix/MissingSkillIndicator";

interface SkillsMatrixRowProps {
  skill: UnifiedSkill;
  isRoleBenchmark?: boolean;
}

export const SkillsMatrixRow = ({ 
  skill, 
  isRoleBenchmark = false
}: SkillsMatrixRowProps) => {
  const { id: employeeId } = useParams();
  const { getSkillState, updateSkillState } = useEmployeeSkillsStore();
  const unifiedSkillData = getUnifiedSkillData(skill.title);
  
  console.log('SkillsMatrixRow rendering:', {
    skillTitle: skill.title,
    skillId: unifiedSkillData.id,
    originalSubcategory: skill.subcategory,
    unifiedSubcategory: unifiedSkillData.subcategory,
    isRoleBenchmark,
    originalGrowth: skill.growth,
    unifiedGrowth: unifiedSkillData.growth,
    salary: unifiedSkillData.salary
  });

  const skillScore = getSkillScore(skill.level);
  const skillState = employeeId ? getSkillState(employeeId, skill.title) : null;
  const employeeSkills = employeeId ? useEmployeeSkillsStore(state => state.getEmployeeSkills(employeeId)) : [];
  const hasSkill = employeeSkills.some(empSkill => empSkill.title === skill.title);

  const handleDevelopmentPlanChange = (checked: boolean) => {
    if (!employeeId) return;
    
    console.log('Updating development plan:', {
      employeeId,
      skillTitle: skill.title,
      inDevelopmentPlan: checked
    });

    updateSkillState(employeeId, skill.title, {
      inDevelopmentPlan: checked
    });
  };

  const getScoreColor = (score: number): string => {
    if (score >= 75) return 'bg-[#8073ec20] text-[#8073ec] shadow-sm font-semibold';
    if (score >= 50) return 'bg-[#ff825620] text-[#ff8256] shadow-sm font-semibold';
    if (score >= 25) return 'bg-[#00800020] text-[#008000] shadow-sm font-semibold';
    return 'bg-[#8E919620] text-[#8E9196] shadow-sm font-semibold';
  };

  return (
    <TableRow className="group border-b border-gray-200">
      <TableCell className="font-medium border-r border-blue-200 py-2">{skill.title}</TableCell>
      <TableCell className="border-r border-blue-200 py-2">{unifiedSkillData.subcategory}</TableCell>
      {isRoleBenchmark ? (
        <>
          <RoleSkillLevelCell 
            initialLevel={skill.level || 'unspecified'}
            skillTitle={skill.title}
          />
          <StaticSkillLevelCell 
            initialLevel={skill.level || 'unspecified'}
            skillTitle={skill.title}
            employeeId={employeeId || ''}
          />
        </>
      ) : (
        <>
          <TableCell className="text-center border-r border-blue-200 py-2">
            <div className="flex justify-center">
              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                <Check className="w-5 h-5 text-green-600 stroke-[2.5]" />
              </div>
            </div>
          </TableCell>
          {hasSkill ? (
            <SkillLevelCell 
              initialLevel={skill.level || 'unspecified'}
              skillTitle={skill.title}
            />
          ) : (
            <TableCell className="text-center border-r border-blue-200 py-2">
              <MissingSkillIndicator />
            </TableCell>
          )}
        </>
      )}
      <TableCell className="text-center border-r border-blue-200 py-2">
        <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm ${getScoreColor(skillScore)}`}>
          {skillScore}
        </span>
      </TableCell>
      <TableCell className="text-center border-r border-blue-200 py-2">
        <span className={`inline-flex items-center justify-center gap-1 px-2.5 py-1 rounded-full text-sm ${
          unifiedSkillData.growth === "0%" ? 'bg-gray-100 text-gray-800' : 'bg-green-100 text-green-800'
        }`}>
          ↗ {unifiedSkillData.growth}
        </span>
      </TableCell>
      <TableCell className="text-center border-r border-blue-200 py-2">
        <span className="text-sm text-gray-900">{unifiedSkillData.salary}</span>
      </TableCell>
      <TableCell className="text-center border-r border-blue-200 py-2">
        <Checkbox
          checked={skillState?.inDevelopmentPlan || false}
          onCheckedChange={handleDevelopmentPlanChange}
          className="data-[state=checked]:bg-[#1F2144] data-[state=checked]:border-[#1F2144]"
        />
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