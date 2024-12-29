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

  // Sort skills: toggled skills first, then apply other sorting
  const sortedSkills = [...enrichedSkills].sort((a, b) => {
    // First sort by toggled state
    const aToggled = toggledSkills.has(a.title) ? 1 : 0;
    const bToggled = toggledSkills.has(b.title) ? 1 : 0;
    const toggledDiff = bToggled - aToggled;
    
    if (toggledDiff !== 0) return toggledDiff;

    // Then apply other sorting if specified
    if (sortField && sortDirection) {
      if (sortField === 'growth') {
        const aGrowth = parseFloat(a.growth);
        const bGrowth = parseFloat(b.growth);
        return sortDirection === 'asc' ? aGrowth - bGrowth : bGrowth - aGrowth;
      } else if (sortField === 'salary') {
        const aSalary = parseFloat(a.salary?.replace(/[^0-9.-]+/g, "") || "0");
        const bSalary = parseFloat(b.salary?.replace(/[^0-9.-]+/g, "") || "0");
        return sortDirection === 'asc' ? aSalary - bSalary : bSalary - aSalary;
      }
    }
    
    // Default to alphabetical sorting by title
    return a.title.localeCompare(b.title);
  });

  console.log('Rendering SkillProfileMatrixContent with sorted skills:', {
    totalSkills: sortedSkills.length,
    toggledSkillsCount: Array.from(toggledSkills).length,
    firstFewSkills: sortedSkills.slice(0, 3).map(s => ({
      title: s.title,
      isToggled: toggledSkills.has(s.title)
    }))
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
          {sortedSkills.map((skill) => (
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