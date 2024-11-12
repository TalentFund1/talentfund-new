import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { SearchFilter } from "@/components/market/SearchFilter";
import { technicalSkills, softSkills } from '@/components/skillsData';

interface SkillsMatrixFiltersProps {
  selectedCategory: string;
  setSelectedCategory: (value: string) => void;
  selectedSkills: string[];
  setSelectedSkills: (skills: string[]) => void;
  isRoleBenchmarkTab: boolean;
}

export const SkillsMatrixFilters = ({
  selectedCategory,
  setSelectedCategory,
  selectedSkills,
  setSelectedSkills,
  isRoleBenchmarkTab,
}: SkillsMatrixFiltersProps) => {
  const allSkills = [...technicalSkills, ...softSkills];

  return (
    <div className="space-y-4 mb-4">
      <div className="w-full">
        <SearchFilter
          label=""
          placeholder="Search skills..."
          items={allSkills}
          selectedItems={selectedSkills}
          onItemsChange={setSelectedSkills}
          singleSelect={false}
        />
      </div>

      <div className="flex justify-between items-start gap-4">
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-[180px] bg-white">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="specialized">Specialized Skills</SelectItem>
            <SelectItem value="common">Common Skills</SelectItem>
            <SelectItem value="certification">Certifications</SelectItem>
          </SelectContent>
        </Select>
        
        <Button>Add Skill</Button>
      </div>
    </div>
  );
};