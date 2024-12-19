import { Table, TableBody } from "@/components/ui/table";
import { SkillsMatrixRow } from "../SkillsMatrixRow";
import { SkillsMatrixTableHeader } from "../SkillsMatrixTableHeader";
import { BenchmarkMatrixFilters } from "./BenchmarkMatrixFilters";
import { useRef } from "react";

interface SkillsMatrixContentProps {
  filteredSkills: any[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedLevel: string;
  setSelectedLevel: (level: string) => void;
  selectedInterest: string;
  setSelectedInterest: (interest: string) => void;
  selectedSkillLevel: string;
  setSelectedSkillLevel: (level: string) => void;
  selectedSearchSkills: string[];
  setSelectedSearchSkills: (skills: string[]) => void;
  visibleItems: number;
  observerTarget: React.RefObject<HTMLDivElement>;
}

export const SkillsMatrixContent = ({
  filteredSkills,
  searchTerm,
  setSearchTerm,
  selectedLevel,
  setSelectedLevel,
  selectedInterest,
  setSelectedInterest,
  selectedSkillLevel,
  setSelectedSkillLevel,
  selectedSearchSkills,
  setSelectedSearchSkills,
  visibleItems,
  observerTarget
}: SkillsMatrixContentProps) => {
  console.log('Rendering SkillsMatrixContent with skills:', filteredSkills);

  const removeSearchSkill = (skill: string) => {
    setSelectedSearchSkills(selectedSearchSkills.filter(s => s !== skill));
  };

  return (
    <>
      <BenchmarkMatrixFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedLevel={selectedLevel}
        setSelectedLevel={setSelectedLevel}
        selectedInterest={selectedInterest}
        setSelectedInterest={setSelectedInterest}
        selectedSkillLevel={selectedSkillLevel}
        setSelectedSkillLevel={setSelectedSkillLevel}
        selectedSearchSkills={selectedSearchSkills}
        removeSearchSkill={removeSearchSkill}
        clearSearch={() => setSearchTerm("")}
      />

      <div className="border border-[#CCDBFF] rounded-lg overflow-hidden bg-white">
        <Table>
          <SkillsMatrixTableHeader 
            isRoleBenchmark={true}
          />
          <TableBody>
            {filteredSkills.slice(0, visibleItems).map((skill) => (
              <SkillsMatrixRow 
                key={skill.title} 
                skill={skill}
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