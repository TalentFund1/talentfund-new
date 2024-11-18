import { useRef } from "react";
import { BenchmarkMatrixFilters } from "./BenchmarkMatrixFilters";
import { SkillsMatrixTable } from "./SkillsMatrixTable";

interface BenchmarkMatrixContentProps {
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

export const BenchmarkMatrixContent = ({
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
}: BenchmarkMatrixContentProps) => {
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

      <SkillsMatrixTable 
        filteredSkills={filteredSkills.slice(0, visibleItems)}
        showCompanySkill={false}
        isRoleBenchmark={true}
      />

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