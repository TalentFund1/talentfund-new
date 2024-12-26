import { BenchmarkMatrixFilters } from "./BenchmarkMatrixFilters";
import { BenchmarkSkillsMatrixTable } from "./BenchmarkSkillsMatrixTable";
import { SkillsMatrixTable } from "./SkillsMatrixTable";

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
  isRoleBenchmark?: boolean;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  selectedWeight: string;
  setSelectedWeight: (weight: string) => void;
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
  observerTarget,
  isRoleBenchmark = false,
  selectedCategory,
  setSelectedCategory,
  selectedWeight,
  setSelectedWeight
}: SkillsMatrixContentProps) => {
  console.log('SkillsMatrixContent rendering:', {
    skillsCount: filteredSkills.length,
    isRoleBenchmark,
    selectedCategory,
    selectedWeight
  });

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
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedWeight={selectedWeight}
        setSelectedWeight={setSelectedWeight}
      />

      {isRoleBenchmark ? (
        <BenchmarkSkillsMatrixTable 
          filteredSkills={filteredSkills.slice(0, visibleItems)}
        />
      ) : (
        <SkillsMatrixTable 
          filteredSkills={filteredSkills.slice(0, visibleItems)}
          isRoleBenchmark={false}
        />
      )}

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