import { SkillLevelFilter } from "./SkillLevelFilter";
import { SearchFilter } from "@/components/market/SearchFilter";
import { technicalSkills, softSkills } from '@/components/skillsData';

interface SkillsMatrixFilteringProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedLevel: string;
  setSelectedLevel: (level: string) => void;
  selectedSearchSkills: string[];
  setSelectedSearchSkills: (skills: string[]) => void;
}

export const SkillsMatrixFiltering = ({
  searchTerm,
  setSearchTerm,
  selectedLevel,
  setSelectedLevel,
  selectedSearchSkills,
  setSelectedSearchSkills,
}: SkillsMatrixFilteringProps) => {
  const allSkills = [...technicalSkills, ...softSkills];

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <SkillLevelFilter
          selectedLevel={selectedLevel}
          setSelectedLevel={setSelectedLevel}
        />
      </div>

      <SearchFilter
        label=""
        placeholder="Search skills..."
        items={allSkills}
        selectedItems={selectedSearchSkills}
        onItemsChange={setSelectedSearchSkills}
        singleSelect={false}
      />
    </div>
  );
};