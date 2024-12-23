import { Table, TableBody } from "@/components/ui/table";
import { SkillProfileMatrixHeader } from "./SkillProfileMatrixHeader";
import { SkillProfileMatrixRow } from "./SkillProfileMatrixRow";
import { UnifiedSkill } from "../types/SkillTypes";

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
  return (
    <div className="border border-[#CCDBFF] rounded-lg overflow-hidden bg-white">
      <Table>
        <SkillProfileMatrixHeader 
          sortField={sortField}
          sortDirection={sortDirection}
          onSort={onSort}
        />
        <TableBody>
          {skills.map((skill) => (
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