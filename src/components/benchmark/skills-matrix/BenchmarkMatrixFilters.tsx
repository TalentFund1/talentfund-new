import { SearchFilter } from "@/components/market/SearchFilter";
import { technicalSkills, softSkills } from '@/components/skillsData';
import { SkillLevelFilter } from "./SkillLevelFilter";

interface BenchmarkMatrixFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedLevel: string;
  setSelectedLevel: (level: string) => void;
  selectedInterest: string;
  setSelectedInterest: (interest: string) => void;
  selectedSearchSkills: string[];
  setSelectedSearchSkills: (skills: string[]) => void;
}

export const BenchmarkMatrixFilters = ({
  searchTerm,
  setSearchTerm,
  selectedLevel,
  setSelectedLevel,
  selectedInterest,
  setSelectedInterest,
  selectedSearchSkills,
  setSelectedSearchSkills,
}: BenchmarkMatrixFiltersProps) => {
  const allSkills = [...technicalSkills, ...softSkills];

  return (
    <div className="space-y-6">
      <div className="flex gap-4 mb-4">
        <SkillLevelFilter 
          selectedLevel={selectedLevel}
          onLevelChange={setSelectedLevel}
        />
        <Select value={selectedInterest} onValueChange={setSelectedInterest}>
          <SelectTrigger className="w-[180px] bg-white">
            <SelectValue placeholder="All Interests" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Interests</SelectItem>
            <SelectItem value="required">Skill Goal</SelectItem>
            <SelectItem value="not-interested">Not Interested</SelectItem>
            <SelectItem value="unknown">Unknown</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="relative">
        <SearchFilter
          label=""
          placeholder="Search skills..."
          items={allSkills}
          selectedItems={selectedSearchSkills}
          onItemsChange={setSelectedSearchSkills}
        />
      </div>
    </div>
  );
};