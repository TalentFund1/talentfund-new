import { Table, TableBody } from "@/components/ui/table";
import { BenchmarkSkillsMatrixTableHeader } from "./BenchmarkSkillsMatrixTableHeader";
import { SkillsMatrixRow } from "../SkillsMatrixRow";
import { getUnifiedSkillData } from "../../skills/data/skillDatabaseService";
import { UnifiedSkill } from "../../skills/types/SkillTypes";

interface BenchmarkSkillsMatrixTableProps {
  filteredSkills: (UnifiedSkill & { hasSkill?: boolean })[];
}

export const BenchmarkSkillsMatrixTable = ({
  filteredSkills,
}: BenchmarkSkillsMatrixTableProps) => {
  console.log('BenchmarkSkillsMatrixTable - Rendering with skills:', {
    skillCount: filteredSkills.length,
    skills: filteredSkills.map(s => ({
      title: s.title,
      weight: getUnifiedSkillData(s.title).weight,
      originalWeight: s.weight,
      hasSkill: s.hasSkill
    }))
  });

  return (
    <div className="border rounded-lg overflow-hidden">
      <Table>
        <BenchmarkSkillsMatrixTableHeader />
        <TableBody>
          {filteredSkills.map((skill) => {
            const unifiedData = getUnifiedSkillData(skill.title);
            console.log('Processing skill:', {
              title: skill.title,
              unifiedWeight: unifiedData.weight,
              originalWeight: skill.weight,
              hasSkill: skill.hasSkill
            });
            return (
              <SkillsMatrixRow
                key={skill.title}
                skill={{
                  ...skill,
                  weight: unifiedData.weight,
                  hasSkill: skill.hasSkill
                }}
                isRoleBenchmark={true}
              />
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};