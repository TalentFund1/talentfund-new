import { Table, TableBody } from "@/components/ui/table";
import { SkillsMatrixRow } from "../SkillsMatrixRow";
import { SkillsMatrixTableHeader } from "../SkillsMatrixTableHeader";
import { getUnifiedSkillData } from "../../skills/data/skillDatabaseService";
import { UnifiedSkill } from "../../skills/types/SkillTypes";

interface SkillsMatrixTableProps {
  filteredSkills: Array<{
    title: string;
    subcategory: string;
    level: string;
    growth: string;
    confidence: string;
    requirement?: string;
    category?: string;
  }>;
  isRoleBenchmark?: boolean;
}

export const SkillsMatrixTable = ({ 
  filteredSkills,
  isRoleBenchmark = false
}: SkillsMatrixTableProps) => {
  console.log('Rendering SkillsMatrixTable:', {
    skillCount: filteredSkills.length,
    isRoleBenchmark
  });

  // Transform the filtered skills into UnifiedSkill format
  const transformedSkills = filteredSkills.map(skill => {
    const unifiedData = getUnifiedSkillData(skill.title);
    return {
      ...unifiedData,
      title: skill.title,
      subcategory: skill.subcategory,
      level: skill.level,
      growth: skill.growth,
      confidence: skill.confidence,
      requirement: skill.requirement,
      category: skill.category || unifiedData.category,
      // Ensure all required UnifiedSkill properties are present
      id: unifiedData.id,
      businessCategory: unifiedData.businessCategory,
      weight: unifiedData.weight,
      salary: unifiedData.salary,
      minimumLevel: unifiedData.minimumLevel,
      requirementLevel: unifiedData.requirementLevel,
      metrics: unifiedData.metrics,
      benchmarks: unifiedData.benchmarks
    } as UnifiedSkill;
  });

  console.log('Transformed skills:', {
    originalCount: filteredSkills.length,
    transformedCount: transformedSkills.length,
    firstSkill: transformedSkills[0]
  });

  return (
    <div className="border border-[#CCDBFF] rounded-lg overflow-hidden bg-white border-l-4 border-l-[#CCDBFF]">
      <Table>
        <SkillsMatrixTableHeader 
          showCompanySkill={!isRoleBenchmark}
          isRoleBenchmark={isRoleBenchmark}
        />
        <TableBody>
          {transformedSkills.map((skill) => (
            <SkillsMatrixRow 
              key={skill.title} 
              skill={skill}
              isRoleBenchmark={isRoleBenchmark}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};