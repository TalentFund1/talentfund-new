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
}

export const SkillsMatrixTable = ({
  filteredSkills,
}: SkillsMatrixTableProps) => {
  console.log('Rendering SkillsMatrixTable with:', {
    skillCount: filteredSkills.length
  });

  return (
    <TrackProvider>
      <ToggledSkillsProvider>
        <div className="border border-[#CCDBFF] rounded-lg overflow-hidden bg-white">
          <Table>
            <SkillsMatrixTableHeader />
            <TableBody>
              {filteredSkills.map((skill) => (
                <SkillsMatrixRow 
                  key={skill.title} 
                  skill={skill}
                />
              ))}
            </TableBody>
          </Table>
        </div>
      </ToggledSkillsProvider>
    </TrackProvider>
  );
};