import { Table, TableBody } from "@/components/ui/table";
import { SkillsMatrixRow } from "../SkillsMatrixRow";
import { SkillsMatrixTableHeader } from "../SkillsMatrixTableHeader";

interface SkillsMatrixContentProps {
  filteredSkills: any[];
  observerTarget: React.RefObject<HTMLDivElement>;
  visibleItems: number;
  totalItems: number;
}

export const SkillsMatrixContent = ({ 
  filteredSkills,
  observerTarget,
  visibleItems,
  totalItems
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
            {filteredSkills.map((skill) => (
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

      {visibleItems < totalItems && (
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