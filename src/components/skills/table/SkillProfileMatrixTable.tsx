import { Table, TableBody } from "@/components/ui/table";
import { SkillsTableRow } from "./SkillsTableRow";
import { SkillsTableHeader } from "./SkillsTableHeader";

export interface SkillProfileMatrixTableProps {
  paginatedSkills: any[];
  toggledSkills: Set<string>;
  onToggleSkill: (skillTitle: string) => void;
  sortField: 'growth' | 'salary' | null;
  sortDirection: 'asc' | 'desc' | null;
  onSort: (field: 'growth' | 'salary') => void;
}

export const SkillProfileMatrixTable = ({
  paginatedSkills,
  toggledSkills,
  onToggleSkill,
  sortField,
  sortDirection,
  onSort
}: SkillProfileMatrixTableProps) => {
  console.log('Rendering SkillProfileMatrixTable with:', {
    skillCount: paginatedSkills.length,
    toggledSkills: Array.from(toggledSkills),
    sortField,
    sortDirection
  });

  return (
    <div className="relative overflow-x-auto rounded-lg border border-blue-200/60">
      <Table>
        <SkillsTableHeader 
          sortField={sortField}
          sortDirection={sortDirection}
          onSort={onSort}
        />
        <TableBody>
          {paginatedSkills.map((skill, index) => (
            <SkillsTableRow 
              key={skill.title} 
              skill={skill}
              isToggled={toggledSkills.has(skill.title)}
              onToggle={() => onToggleSkill(skill.title)}
              isEven={index % 2 === 0}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};