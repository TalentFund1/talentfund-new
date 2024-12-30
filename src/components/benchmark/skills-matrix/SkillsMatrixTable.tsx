import { Table } from "@/components/ui/table";
import { SkillsMatrixTableHeader } from "./SkillsMatrixTableHeader";
import { SkillsMatrixContent } from "./SkillsMatrixContent";
import { UnifiedSkill } from "../../skills/types/SkillTypes";
import { getUnifiedSkillData } from "../../skills/data/skillDatabaseService";

interface SkillsMatrixTableProps {
  filteredSkills: UnifiedSkill[];
  isRoleBenchmark?: boolean;
  showCompanySkill?: boolean;
}

export const SkillsMatrixTable = ({ 
  filteredSkills,
  isRoleBenchmark = false,
  showCompanySkill = true
}: SkillsMatrixTableProps) => {
  console.log('Rendering SkillsMatrixTable:', {
    skillCount: filteredSkills.length,
    isRoleBenchmark,
    showCompanySkill
  });

  // Ensure each skill has complete data from universal database
  const enrichedSkills = filteredSkills.map(skill => {
    const unifiedData = getUnifiedSkillData(skill.title);
    return {
      ...skill,
      category: unifiedData.category,
      weight: unifiedData.weight,
      subcategory: unifiedData.subcategory,
      minimumLevel: skill.minimumLevel || 'beginner',
      requirementLevel: skill.requirementLevel || 'required',
      metrics: {
        growth: skill.growth,
        salary: skill.salary,
        skillScore: skill.skillScore || 0
      }
    };
  });

  // Sort skills by category and then alphabetically
  const sortedSkills = [...enrichedSkills].sort((a, b) => {
    // First sort by category
    if (a.category !== b.category) {
      return a.category.localeCompare(b.category);
    }
    // Then by title
    return a.title.localeCompare(b.title);
  });

  return (
    <div className="border border-[#CCDBFF] rounded-lg overflow-hidden bg-white">
      <Table>
        <SkillsMatrixTableHeader 
          showCompanySkill={!isRoleBenchmark}
          isRoleBenchmark={isRoleBenchmark}
        />
        <SkillsMatrixContent 
          skills={sortedSkills}
          isRoleBenchmark={isRoleBenchmark}
          showCompanySkill={showCompanySkill}
        />
      </Table>
    </div>
  );
};