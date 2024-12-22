import { SkillsMatrixFilters } from "./SkillsMatrixFilters";
import { SkillsMatrixTable } from "./SkillsMatrixTable";
import { useSkillsMatrixSearch } from "../../skills/context/SkillsMatrixSearchContext";

interface SkillsMatrixViewProps {
  selectedLevel: string;
  setSelectedLevel: (level: string) => void;
  selectedInterest: string;
  setSelectedInterest: (interest: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  filteredSkills: any[];
  visibleItems: number;
  observerTarget: React.RefObject<HTMLDivElement>;
  hasChanges: boolean;
  isRoleBenchmark: boolean;
}

export const SkillsMatrixView = ({
  selectedLevel,
  setSelectedLevel,
  selectedInterest,
  setSelectedInterest,
  selectedCategory,
  setSelectedCategory,
  filteredSkills,
  visibleItems,
  observerTarget,
  hasChanges,
  isRoleBenchmark
}: SkillsMatrixViewProps) => {
  const { matrixSearchSkills, setMatrixSearchSkills } = useSkillsMatrixSearch();
  const [searchTerm, setSearchTerm] = useState("");

  const removeSearchSkill = (skill: string) => {
    setMatrixSearchSkills(matrixSearchSkills.filter(s => s !== skill));
  };

  return (
    <>
      <SkillsMatrixFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedLevel={selectedLevel}
        setSelectedLevel={setSelectedLevel}
        selectedInterest={selectedInterest}
        setSelectedInterest={setSelectedInterest}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedSearchSkills={matrixSearchSkills}
        removeSearchSkill={removeSearchSkill}
        clearSearch={() => {
          setSearchTerm("");
          setMatrixSearchSkills([]);
        }}
      />

      <SkillsMatrixTable 
        filteredSkills={filteredSkills.slice(0, visibleItems)}
        isRoleBenchmark={isRoleBenchmark}
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