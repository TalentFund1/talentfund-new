import { Card } from "@/components/ui/card";
import { BenchmarkMatrixFilters } from "./BenchmarkMatrixFilters";
import { BenchmarkSkillsMatrixTable } from "./BenchmarkSkillsMatrixTable";

interface BenchmarkSkillsMatrixViewProps {
  roleId: string;
  employeeId: string;
  roleLevel: string;
  filteredSkills: any[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedLevel: string;
  setSelectedLevel: (level: string) => void;
  selectedInterest: string;
  setSelectedInterest: (interest: string) => void;
  selectedSkillLevel: string;
  setSelectedSkillLevel: (level: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  selectedSearchSkills: string[];
  setSelectedSearchSkills: (skills: string[]) => void;
  visibleItems: number;
  observerTarget: React.RefObject<HTMLDivElement>;
}

export const BenchmarkSkillsMatrixView = ({
  roleId,
  employeeId,
  roleLevel,
  filteredSkills,
  searchTerm,
  setSearchTerm,
  selectedLevel,
  setSelectedLevel,
  selectedInterest,
  setSelectedInterest,
  selectedSkillLevel,
  setSelectedSkillLevel,
  selectedCategory,
  setSelectedCategory,
  selectedSearchSkills,
  setSelectedSearchSkills,
  visibleItems,
  observerTarget
}: BenchmarkSkillsMatrixViewProps) => {
  const removeSearchSkill = (skill: string) => {
    setSelectedSearchSkills(selectedSearchSkills.filter(s => s !== skill));
  };

  const clearSearch = () => {
    setSearchTerm("");
    setSelectedSearchSkills([]);
  };

  console.log('BenchmarkSkillsMatrixView - Rendering with:', {
    roleId,
    employeeId,
    selectedCategory,
    filteredSkillsCount: filteredSkills.length
  });

  return (
    <Card className="p-6 space-y-6 animate-fade-in bg-white">
      <BenchmarkMatrixFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedLevel={selectedLevel}
        setSelectedLevel={setSelectedLevel}
        selectedInterest={selectedInterest}
        setSelectedInterest={setSelectedInterest}
        selectedSkillLevel={selectedSkillLevel}
        setSelectedSkillLevel={setSelectedSkillLevel}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedSearchSkills={selectedSearchSkills}
        removeSearchSkill={removeSearchSkill}
        clearSearch={clearSearch}
      />

      <BenchmarkSkillsMatrixTable 
        filteredSkills={filteredSkills}
      />
      
      {visibleItems < filteredSkills.length && (
        <div 
          ref={observerTarget} 
          className="h-10 flex items-center justify-center"
        >
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
        </div>
      )}
    </Card>
  );
};