import { Table, TableBody } from "@/components/ui/table";
import { SkillProfileMatrixHeader } from "./SkillProfileMatrixHeader";
import { SkillProfileMatrixRow } from "./SkillProfileMatrixRow";
import { UnifiedSkill } from "../types/SkillTypes";
import { getUnifiedSkillData } from "../data/skillDatabaseService";

interface SkillProfileMatrixContentProps {
  skills: UnifiedSkill[];
  toggledSkills: Set<string>;
  onToggleSkill: (skillTitle: string) => void;
  sortField: 'growth' | 'salary' | null;
  sortDirection: 'asc' | 'desc' | null;
  onSort: (field: 'growth' | 'salary' | null) => void;
}

export const SkillProfileMatrixContent = ({
  skills,
  toggledSkills,
  onToggleSkill,
  sortField,
  sortDirection,
  onSort
}: SkillProfileMatrixContentProps) => {
  // Ensure each skill has complete data from universal database
  const enrichedSkills = skills.map(skill => {
    const unifiedData = getUnifiedSkillData(skill.title);
    return {
      ...skill,
      category: unifiedData.category,
      weight: unifiedData.weight,
      subcategory: unifiedData.subcategory
    };
  });

  console.log('Rendering SkillProfileMatrixContent with enriched skills:', {
    totalSkills: enrichedSkills.length,
    categories: enrichedSkills.map(s => s.category),
    weights: enrichedSkills.map(s => s.weight)
  });

  return (
    <div className="border border-[#CCDBFF] rounded-lg overflow-hidden bg-white">
      <Table>
        <SkillProfileMatrixHeader 
          sortField={sortField}
          sortDirection={sortDirection}
          onSort={onSort}
        />
        <TableBody>
          {enrichedSkills.map((skill) => (
            <SkillProfileMatrixRow
              key={skill.title}
              skill={skill}
              isToggled={toggledSkills.has(skill.title)}
              onToggle={() => onToggleSkill(skill.title)}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};