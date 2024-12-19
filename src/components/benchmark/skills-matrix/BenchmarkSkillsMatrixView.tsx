import { BenchmarkMatrixFilters } from "./BenchmarkMatrixFilters";
import { SkillsMatrixTable } from "./SkillsMatrixTable";
import { ToggledSkillsDisplay } from "../../skills/ToggledSkillsDisplay";

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
  selectedSearchSkills: string[];
  setSelectedSearchSkills: (skills: string[]) => void;
  visibleItems: number;
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
  selectedSearchSkills,
  setSelectedSearchSkills,
  visibleItems
}: BenchmarkSkillsMatrixViewProps) => {
  console.log('Rendering BenchmarkSkillsMatrixView with:', {
    roleId,
    employeeId,
    filteredSkillsCount: filteredSkills.length,
    selectedSearchSkills
  });

  return (
    <div className="space-y-6">
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
        removeSearchSkill={(skill: string) => {
          setSelectedSearchSkills(selectedSearchSkills.filter(s => s !== skill));
        }}
        clearSearch={() => setSearchTerm("")}
      />

      <ToggledSkillsDisplay />

      <SkillsMatrixTable
        filteredSkills={filteredSkills.slice(0, visibleItems)}
        showCompanySkill={false}
        isRoleBenchmark={true}
      />
    </div>
  );
};