import { Table, TableBody } from "@/components/ui/table";
import { SkillsMatrixTableHeader } from "./SkillsMatrixTableHeader";
import { SkillsMatrixRow } from "../SkillsMatrixRow";
import { UnifiedSkill } from "../../skills/types/SkillTypes";

interface SkillsMatrixContentProps {
  filteredSkills?: UnifiedSkill[];
  isRoleBenchmark?: boolean;
  showCompanySkill?: boolean;
}

export const SkillsMatrixContent = ({
  filteredSkills = [],
  isRoleBenchmark = false,
  showCompanySkill = true
}: SkillsMatrixContentProps) => {
  console.log('SkillsMatrixContent rendering with:', {
    skillCount: filteredSkills?.length || 0,
    isRoleBenchmark,
    showCompanySkill
  });

  const skills = filteredSkills || [];

  return (
    <div className="relative overflow-x-auto rounded-lg border border-blue-200/60">
      <Table>
        <SkillsMatrixTableHeader 
          showCompanySkill={showCompanySkill}
          isRoleBenchmark={isRoleBenchmark}
        />
        <TableBody>
          {skills.map((skill) => (
            <SkillsMatrixRow
              key={skill.title}
              skill={skill}
              isRoleBenchmark={isRoleBenchmark}
            />
          ))}
          {skills.length === 0 && (
            <tr>
              <td 
                colSpan={8} 
                className="px-6 py-12 text-center text-muted-foreground"
              >
                No skills found
              </td>
            </tr>
          )}
        </TableBody>
      </Table>
    </div>
  );
};