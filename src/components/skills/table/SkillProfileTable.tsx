import { Table } from "@/components/ui/table";
import { SkillProfileMatrixTable } from "@/components/skills/SkillProfileMatrixTable";
import { UnifiedSkill } from "../types/SkillTypes";

interface SkillProfileTableProps {
  paginatedSkills: UnifiedSkill[];
  toggledSkills: Set<string>;
  onToggleSkill: (skillTitle: string) => void;
  sortField: 'growth' | 'salary' | null;
  sortDirection: 'asc' | 'desc' | null;
  onSort: (field: 'growth' | 'salary' | null) => void;
}

export const SkillProfileTable = ({
  paginatedSkills,
  toggledSkills,
  onToggleSkill,
  sortField,
  sortDirection,
  onSort
}: SkillProfileTableProps) => {
  console.log('Rendering SkillProfileTable with skills:', paginatedSkills);
  
  return (
    <Table>
      <SkillProfileMatrixTable 
        paginatedSkills={paginatedSkills}
        toggledSkills={toggledSkills}
        onToggleSkill={onToggleSkill}
        sortField={sortField}
        sortDirection={sortDirection}
        onSort={onSort}
      />
    </Table>
  );
};