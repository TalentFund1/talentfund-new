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
import { Badge } from "../ui/badge";
import { useToast } from "../ui/use-toast";
import { useEmployeeSkillsStore } from "../employee/store/employeeSkillsStore";

interface SkillsMatrixRowProps {
  skill: UnifiedSkill & { hasSkill?: boolean };
  isRoleBenchmark?: boolean;
}

export const SkillsMatrixRow = ({ 
  skill, 
  isRoleBenchmark = false
}: SkillsMatrixRowProps) => {
  const { id: employeeId } = useParams();
  const { toast } = useToast();
  const { getSkillState } = useSkillsMatrixStore();
  const { updateSkillState: updateEmployeeSkill, removeEmployeeSkill } = useEmployeeSkillsStore();
  const unifiedSkillData = getUnifiedSkillData(skill.title);
  
  console.log('SkillsMatrixRow rendering:', {
    skillTitle: skill.title,
    skillId: unifiedSkillData.id,
    originalSubcategory: skill.subcategory,
    unifiedSubcategory: unifiedSkillData.subcategory,
    isRoleBenchmark,
    originalGrowth: skill.growth,
    unifiedGrowth: unifiedSkillData.growth,
    salary: unifiedSkillData.salary,
    hasSkill: skill.hasSkill
  });

  const skillScore = Math.floor(Math.random() * 26) + (skill.hasSkill ? 50 : 25);
  const skillState = employeeId ? getSkillState(employeeId, skill.title) : null;

  const handleDevelopmentPlanChange = async (checked: boolean) => {
    if (!employeeId) return;
    
    const currentSkillState = getSkillState(employeeId, skill.title);
    
    if (currentSkillState?.level === 'unspecified' && !checked) {
      console.log('Removing unspecified skill:', {
        employeeId,
        skillTitle: skill.title
      });
      
      await removeEmployeeSkill(employeeId, skill.title);
      
      toast({
        title: "Skill Removed",
        description: `${skill.title} has been removed from your skills.`,
      });
      
      return;
    }

    console.log('Updating development plan:', {
      employeeId,
      skillTitle: skill.title,
      inDevelopmentPlan: checked
    });

    updateEmployeeSkill(employeeId, skill.title, {
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
          {skill.hasSkill ? (
            <StaticSkillLevelCell 
              initialLevel={skill.level || 'unspecified'}
              skillTitle={skill.title}
              employeeId={employeeId || ''}
            />
          ) : (
            <TableCell className="text-center border-r border-blue-200 p-0">
              <div className="flex flex-col items-center">
                <div className="rounded-t-md px-3 py-2 text-sm font-medium w-full capitalize flex items-center justify-center min-h-[36px] text-[#1f2144] border-2 border-gray-400 bg-gray-100/50">
                  Unspecified
                </div>
                <div className="text-xs px-2 py-1.5 font-normal text-[#1f2144] w-full flex items-center justify-center gap-1.5 border-x-2 border-b-2 min-h-[32px] rounded-b-md border-gray-300 bg-[#F9FAFB] relative">
                  <Badge variant="outline" className="absolute bg-[#F5F5F5] text-[#6B7280] border-[#E5E7EB] px-2 py-0.5 rounded-md text-xs font-normal">
                    Missing Skill
                  </Badge>
                </div>
              </div>
            </TableCell>
          )}
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
          <SkillLevelCell 
            initialLevel={skill.level || 'unspecified'}
            skillTitle={skill.title}
          />
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
          className="data-[state=checked]:bg-gray-800 data-[state=checked]:border-gray-800"
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