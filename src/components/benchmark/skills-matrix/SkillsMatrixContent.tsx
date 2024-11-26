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
  filteredSkills = [], // Provide default empty array
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
  console.log('Rendering SkillsMatrixContent with skills:', {
    filteredSkillsCount: filteredSkills.length,
    visibleItems
  });

  const removeSearchSkill = (skill: string) => {
    setSelectedSearchSkills(selectedSearchSkills.filter(s => s !== skill));
  };

  // Ensure we have an array before slicing
  const visibleSkills = Array.isArray(filteredSkills) 
    ? filteredSkills.slice(0, visibleItems)
    : [];

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
            showCompanySkill={false}
            isRoleBenchmark={true}
          />
          <TableBody>
            {visibleSkills.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-4 text-muted-foreground">
                  No skills found
                </td>
              </tr>
            ) : (
              visibleSkills.map((skill) => (
                <SkillsMatrixRow 
                  key={skill.title} 
                  skill={skill}
                  showCompanySkill={false}
                  isRoleBenchmark={true}
                />
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {visibleItems < (filteredSkills?.length || 0) && (
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