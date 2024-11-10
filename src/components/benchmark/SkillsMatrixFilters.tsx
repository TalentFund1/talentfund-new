import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

interface SkillsMatrixFiltersProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export const SkillsMatrixFilters = ({
  selectedCategory,
  onCategoryChange
}: SkillsMatrixFiltersProps) => {
  return (
    <div className="flex gap-4 mb-6 items-center justify-between">
      <div className="flex gap-2 flex-1">
        <Select 
          value={selectedCategory} 
          onValueChange={onCategoryChange}
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
      <Button>Add Skill</Button>
    </div>
  );
};