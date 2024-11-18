import { Table, TableBody } from "@/components/ui/table";
import { SkillsMatrixRow } from "../SkillsMatrixRow";
import { SkillsMatrixTableHeader } from "../SkillsMatrixTableHeader";

interface SkillsMatrixContentProps {
  filteredSkills: any[];
  visibleItems: number;
  observerTarget: React.RefObject<HTMLDivElement>;
}

export const SkillsMatrixContent = ({
  filteredSkills,
  visibleItems,
  observerTarget
}: SkillsMatrixContentProps) => {
  return (
    <>
      <div className="border border-[#CCDBFF] rounded-lg overflow-hidden bg-white">
        <Table>
          <SkillsMatrixTableHeader 
            showCompanySkill={false}
            isRoleBenchmark={true}
          />
          <TableBody>
            {filteredSkills.slice(0, visibleItems).map((skill) => (
              <SkillsMatrixRow 
                key={skill.title} 
                skill={skill}
                showCompanySkill={false}
                isRoleBenchmark={true}
              />
            ))}
          </TableBody>
        </Table>
      </div>

      {visibleItems < filteredSkills.length && (
        <div 
          ref={observerTarget} 
          className="h-10 flex items-center justify-center"
        >
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
        </div>
      )}
    </>
  );
};