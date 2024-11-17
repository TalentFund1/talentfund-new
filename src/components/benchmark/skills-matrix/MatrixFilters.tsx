import { BenchmarkMatrixFilters } from "./BenchmarkMatrixFilters";
import { SkillLevelFilter } from "./SkillLevelFilter";

interface MatrixFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedLevel: string;
  setSelectedLevel: (level: string) => void;
  selectedInterest: string;
  setSelectedInterest: (interest: string) => void;
  selectedSearchSkills: string[];
  setSelectedSearchSkills: (skills: string[]) => void;
  selectedSkillLevel: string;
  onSkillLevelChange: (level: string) => void;
}

export const MatrixFilters = ({
  searchTerm,
  setSearchTerm,
  selectedLevel,
  setSelectedLevel,
  selectedInterest,
  setSelectedInterest,
  selectedSearchSkills,
  setSelectedSearchSkills,
  selectedSkillLevel,
  onSkillLevelChange,
}: MatrixFiltersProps) => {
  const removeSearchSkill = (skill: string) => {
    setSelectedSearchSkills(selectedSearchSkills.filter(s => s !== skill));
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-4">
        <SkillLevelFilter
          selectedLevel={selectedSkillLevel}
          onLevelChange={onSkillLevelChange}
        />
        <BenchmarkMatrixFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedLevel={selectedLevel}
          setSelectedLevel={setSelectedLevel}
          selectedInterest={selectedInterest}
          setSelectedInterest={setSelectedInterest}
          selectedSearchSkills={selectedSearchSkills}
          removeSearchSkill={removeSearchSkill}
          clearSearch={() => setSearchTerm("")}
        />
      </div>
    </div>
  );
};