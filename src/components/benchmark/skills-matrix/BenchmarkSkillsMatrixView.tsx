import { BenchmarkMatrixFilters } from "./BenchmarkMatrixFilters";
import { SkillsMatrixTable } from "./SkillsMatrixTable";
import { ToggledSkillsDisplay } from "../../../components/skills/ToggledSkillsDisplay";

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
}) => {
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
        removeSearchSkill={(skill) => {
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