import { Table, TableBody } from "@/components/ui/table";
import { SkillsMatrixRow } from "../SkillsMatrixRow";
import { SkillsMatrixTableHeader } from "../SkillsMatrixTableHeader";
import { ToggledSkillsProvider } from "../../skills/context/ToggledSkillsContext";
import { TrackProvider } from "../../skills/context/TrackContext";

interface SkillsMatrixTableProps {
  filteredSkills: Array<{
    title: string;
    subcategory: string;
    level: string;
    growth: string;
    confidence: string;
    requirement?: string;
  }>;
  showCompanySkill?: boolean;
  isRoleBenchmark?: boolean;
}

const SkillsMatrixTableContent = ({
  filteredSkills,
  showCompanySkill = true,
  isRoleBenchmark = false
}: SkillsMatrixTableProps) => {
  console.log('Rendering SkillsMatrixTable with:', {
    skillCount: filteredSkills.length,
    showCompanySkill,
    isRoleBenchmark
  });

  return (
    <div className="border border-[#CCDBFF] rounded-lg overflow-hidden bg-white">
      <Table>
        <SkillsMatrixTableHeader 
          showCompanySkill={showCompanySkill}
          isRoleBenchmark={isRoleBenchmark}
        />
        <TableBody>
          {filteredSkills.map((skill) => (
            <SkillsMatrixRow 
              key={skill.title} 
              skill={skill}
              showCompanySkill={showCompanySkill}
              isRoleBenchmark={isRoleBenchmark}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export const SkillsMatrixTable = (props: SkillsMatrixTableProps) => {
  return (
    <TrackProvider>
      <ToggledSkillsProvider>
        <SkillsMatrixTableContent {...props} />
      </ToggledSkillsProvider>
    </TrackProvider>
  );
};