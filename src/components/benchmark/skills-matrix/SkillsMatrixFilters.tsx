import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SearchFilter } from "@/components/market/SearchFilter";

interface SkillsMatrixFiltersProps {
  selectedCategory: string;
  setSelectedCategory: (value: string) => void;
  allSkillTitles: string[];
  selectedSkills: string[];
  handleSkillsChange: (skills: string[]) => void;
}

export const SkillsMatrixFilters = ({
  selectedCategory,
  setSelectedCategory,
  allSkillTitles,
  selectedSkills,
  handleSkillsChange,
}: SkillsMatrixFiltersProps) => {
  return (
    <div className="flex justify-between items-start gap-4 mb-4">
      <div className="flex gap-4 flex-1">
        <div className="-mt-1">
          <Select 
            value={selectedCategory} 
            onValueChange={setSelectedCategory}
          >
            <SelectTrigger className="w-[180px] bg-white">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="specialized">Specialized Skills</SelectItem>
              <SelectItem value="common">Common Skills</SelectItem>
              <SelectItem value="certification">Certification</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex-1 -mt-1">
          <SearchFilter
            label=""
            placeholder="Search skills..."
            items={allSkillTitles}
            selectedItems={selectedSkills}
            onItemsChange={handleSkillsChange}
            singleSelect={false}
          />
        </div>
      </div>
      
      <div className="-mt-1">
        <Button>Add Skill</Button>
      </div>
    </div>
  );
};