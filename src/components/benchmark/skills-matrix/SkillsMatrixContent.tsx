import { Table, TableBody } from "@/components/ui/table";
import { SkillsMatrixRow } from "../SkillsMatrixRow";
import { SkillsMatrixTableHeader } from "../SkillsMatrixTableHeader";
import { BenchmarkMatrixFilters } from "./BenchmarkMatrixFilters";
import { useRef } from "react";

interface SkillsMatrixContentProps {
  filteredSkills: any[];
  selectedLevel: string;
  setSelectedLevel: (level: string) => void;
  selectedInterest: string;
  setSelectedInterest: (interest: string) => void;
  visibleItems: number;
  observerTarget: React.RefObject<HTMLDivElement>;
}

export const SkillsMatrixContent = ({
  filteredSkills,
  selectedLevel,
  setSelectedLevel,
  selectedInterest,
  setSelectedInterest,
  visibleItems,
  observerTarget
}: SkillsMatrixContentProps) => {
  return (
    <>
      <BenchmarkMatrixFilters
        selectedLevel={selectedLevel}
        setSelectedLevel={setSelectedLevel}
        selectedInterest={selectedInterest}
        setSelectedInterest={setSelectedInterest}
      />

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